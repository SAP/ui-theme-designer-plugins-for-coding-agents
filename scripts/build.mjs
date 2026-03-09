#!/usr/bin/env node
import { execFile } from "node:child_process";
import { glob, writeFile, readFile, rm } from "node:fs/promises";
import { promisify } from "node:util";
import { relative, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const AI_CORE_SERVICE_INSTANCE = 'theming-ai-core';
const SERVICE_KEY = 'build-sap-theming-skill-index';
const MODEL = 'gpt-4o-mini';
const MAX_CONTEXT_LENGTH = 128_000;

const execFileP = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  console.log(`[EXEC] cf service ${AI_CORE_SERVICE_INSTANCE} --guid`);
  await execFileP('cf', ['service', AI_CORE_SERVICE_INSTANCE, '--guid']);
} catch (err) {
  console.error(`Error finding ${AI_CORE_SERVICE_INSTANCE} service. Make sure you are logged in to the correct Cloud Foundry org and space, and that the service exists.`);
  process.exit(1);
}

try {
  console.log(`[EXEC] cf create-service-key ${AI_CORE_SERVICE_INSTANCE} ${SERVICE_KEY} --wait`);
  await execFileP('cf', ['create-service-key', AI_CORE_SERVICE_INSTANCE, SERVICE_KEY, '--wait']);
} catch (error) {
  console.error(`Error creating service key ${SERVICE_KEY} for ${AI_CORE_SERVICE_INSTANCE}.`);
}

/** @type {{credentials: {appname: string, clientid: string, clientsecret: string, 'credential-type': 'binding-secret', identityzone: string, identityzoneid: string, serviceurls: {AI_API_URL: string}, url: string}}} */
let serviceKey;
try {
  console.log(`[EXEC] cf service-key ${AI_CORE_SERVICE_INSTANCE} ${SERVICE_KEY}`);
  const { stdout } = await execFileP('cf', ['service-key', AI_CORE_SERVICE_INSTANCE, SERVICE_KEY]);
  serviceKey = JSON.parse(stdout.split('\n\n')[1]);
} catch (error) {
  console.error(`Error retrieving service key ${SERVICE_KEY} for ${AI_CORE_SERVICE_INSTANCE}.`);
}

let accessToken;
if (serviceKey) {
  try {
    console.log(`[EXEC] curl -X POST ${serviceKey.credentials.url}/oauth/token ...`);
    const res = await fetch(`${serviceKey.credentials.url}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: serviceKey.credentials.clientid,
        client_secret: serviceKey.credentials.clientsecret,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OAuth token request failed with status ${res.status}: ${text}`);
    }
    const json = await res.json();
    accessToken = json.access_token;
  } catch (error) {
    console.error(`Error obtaining OAuth token for ${SERVICE_KEY}.`);
  }
}

let deploymentUrl;
if (accessToken) {
  try {
    console.log(`[EXEC] curl ${serviceKey.credentials.serviceurls.AI_API_URL}/v2/lm/deployments`);
    const res = await fetch(`${serviceKey.credentials.serviceurls.AI_API_URL}/v2/lm/deployments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'AI-Resource-Group': 'default'
      }
    });
    const json = await res.json();
    deploymentUrl = json.resources.find(({configurationName}) => configurationName === 'defaultOrchestrationConfig').deploymentUrl;
  } catch (error) {
    console.error(`Error fetching deployments from AI API.`);
  }
}

if (deploymentUrl) {
  const indexPath = resolve(__dirname, '../skills/sap-theming/references/btp-ui-theme-designer.md');
  console.log(`[EXEC] git submodule update --remote skills/sap-theming/references/btp-ui-theme-designer`);
  await execFileP("git", ["submodule", "update", "--remote", "skills/sap-theming/references/btp-ui-theme-designer"], {
    cwd: resolve(__dirname, '..'),
  });

  console.log(`[EXEC] rm ${indexPath}`);
  await rm(indexPath, { force: true });
  
  const mdFiles = [];
  const mdGlob = resolve(__dirname, '../skills/sap-theming/references/btp-ui-theme-designer/docs/cf/**/*.md');
  for await (const mdPath of glob(mdGlob)) {
    mdFiles.push(mdPath);
  }
  console.log(`[EXEC] ls ${relative(resolve(__dirname, '..'), mdGlob)}: ${mdFiles.length} files`);
  
  let summaries;
  try {
    summaries = await Promise.all(mdFiles.map(async mdFile => {
      const path = relative(resolve(__dirname, '../skills/sap-theming/references/btp-ui-theme-designer/docs/cf'), mdFile);
      const cwd = dirname(path);
      const group = cwd === '.' ? 'Root' : cwd.split('/')[0].replace(/-/g, ' ');

      const page = await readFile(mdFile, 'utf-8');
    
      const res = await fetch(`${deploymentUrl}/v2/completion`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'AI-Resource-Group': 'default',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: {
            modules: {
              prompt_templating: {
                prompt: {
                  template: [{role: 'user', content: `Summarize in 1 sentence. Output ONLY the summary, nothing else.\n\n{{?page}}`}],
                  defaults: {}
                },
                model: {name: MODEL}
              }
            }
          },
          placeholder_values: {page: page.slice(0, MAX_CONTEXT_LENGTH)}
        })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(`Completion request failed for ${mdFile} with status ${res.status}: ${JSON.stringify(json, null, '  ')}`);
      }
      const summary = json.final_result.choices[0].message.content.trim().replace(/\n/g, ' ');
        
      return {path, group, summary};
    }));
  } catch (error) {
    console.error(`Error generating summaries for documentation pages:`, error);
  }

  if (summaries) {
    const index = [`# BTP UI Theme Designer Documentation Index

Index of files in \`btp-ui-theme-designer/docs/cf/\`. This is the official SAP Help Portal documentation for UI Theme Designer on Cloud Foundry.`];

    const summaryMap = Map.groupBy(summaries, ({group}) => group);
    for (const [group, entries] of summaryMap) {
      index.push('\n');
      index.push(`## ${group}`);
      for (const {path, summary} of entries) {
        index.push(`- **\`${path}\`**: ${summary}`);
      }
    }

    const indexContent = index.join("\n");
    console.log(`[EXEC] echo [${indexContent.length} bytes] > ${relative(resolve(__dirname, '..'), indexPath)}`);
    await writeFile(indexPath, indexContent, 'utf-8');
  }
}

try {
  console.log(`[EXEC] cf delete-service-key ${AI_CORE_SERVICE_INSTANCE} ${SERVICE_KEY} --wait`);
  await execFileP('cf', ['delete-service-key', AI_CORE_SERVICE_INSTANCE, SERVICE_KEY, '-f', '--wait']);
} catch {
  console.error(`Error deleting service key ${SERVICE_KEY} for ${AI_CORE_SERVICE_INSTANCE}. Please check the Cloud Foundry dashboard to ensure the key was deleted.`);
}
