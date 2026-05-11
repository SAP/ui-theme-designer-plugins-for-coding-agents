---
name: authentication
description: How to authenticate against the ABAP WebDAV theme repository (env vars, Basic/Bearer auth, CSRF tokens)
---

## Environment variables

The skill requires three environment variables:

| Variable | Example | Purpose |
|----------|---------|---------|
| `SAP_ABAP_HOST` | `https://ldciu1y.wdf.sap.corp:44355` | Base URL of the ABAP system (protocol + host + port) |
| `SAP_ABAP_CLIENT` | `120` | SAP client number |
| `SAP_ABAP_AUTH` | `Basic dXNlcjpwYXNzd29yZA==` | Value for the `Authorization` HTTP header |

## Supported authentication methods

`SAP_ABAP_AUTH` holds the complete value that goes into the `Authorization` header. The format depends on how the ABAP system is configured:

### Basic Auth (development systems, technical users)

Most common for development. The value is `Basic ` followed by base64-encoded `user:password`:

```bash
export SAP_ABAP_AUTH="Basic $(echo -n 'USERNAME:PASSWORD' | base64)"
```

### Bearer Token (OAuth 2.0 / SAML2)

For systems behind an Identity Provider (IDP) that support OAuth:

```bash
export SAP_ABAP_AUTH="Bearer <token>"
```

To obtain a bearer token, the user typically:
1. Has an OAuth client configured in the ABAP system (transaction `SOAUTH2`)
2. Requests a token from the system's token endpoint, e.g.:
   ```
   https://<host>/sap/bc/sec/oauth2/token
   ```
3. Or uses SAML2 Bearer assertion flow if the system is configured for it

### Setup assistance

If `SAP_ABAP_AUTH` is not set, help the user create it:

1. Ask which authentication method their system uses:
   - **Basic Auth** — most development systems. Guide them:
     ```bash
     export SAP_ABAP_AUTH="Basic $(echo -n 'USERNAME:PASSWORD' | base64)"
     ```
     They should run this in a separate terminal so the password is never shared in the conversation.
   - **SSO / Bearer token** — corporate systems with IDP. Guide them to obtain a token from their system's OAuth endpoint or via their IDP, then:
     ```bash
     export SAP_ABAP_AUTH="Bearer <their-token>"
     ```

2. **NEVER** ask the user to paste their raw password into the conversation. Always instruct them to construct the value themselves and only set it as an env var.

3. Suggest they add the exports to their shell profile or a `.env` file (excluded from version control) for persistence. Note that Bearer tokens typically expire and need periodic refresh.

## CSRF token flow

All write operations (PUT, MKCOL, DELETE, COPY) require a CSRF token. The flow:

1. Make a GET or HEAD request to the repository root with header `X-CSRF-Token: Fetch`, saving cookies to a host-specific file:
   ```bash
   COOKIE_FILE="/tmp/abap_cookies_$(echo $SAP_ABAP_HOST | sed 's/[^a-zA-Z0-9]/_/g').txt"
   curl -s -D - -o /dev/null -c "$COOKIE_FILE" \
     -H "Authorization: $SAP_ABAP_AUTH" \
     -H "X-Requested-With: XMLHttpRequest" \
     -H "X-CSRF-Token: Fetch" \
     -H "sap-client: $SAP_ABAP_CLIENT" \
     "$SAP_ABAP_HOST/sap/bc/theming/themes/~client-$SAP_ABAP_CLIENT/"
   ```
2. Extract the `xsrfid` header value from the response. **This is NOT a typo** — SAP's theming WebDAV endpoint uses the non-standard header name `xsrfid` (lowercase, no hyphens) for both the response and subsequent requests. This differs from the standard `x-csrf-token` header used by other SAP endpoints (OData, BSP, etc.).
3. Include the token in the `xsrfid` header on all subsequent write requests, and pass the saved cookies with `-b "$COOKIE_FILE"`
4. If a write returns 403, refetch the token and retry once
