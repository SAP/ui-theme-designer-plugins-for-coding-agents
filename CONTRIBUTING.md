# Contributing to UI Theme Designer Plugins for Coding Agents

## Content

1. [📝 **Reporting Issues**](#-reporting-issues)
2. [🤩 **Feature Requests**](#-feature-requests)
3. [🔍 **Analyzing Issues**](#-analyzing-issues)
4. [💻 **Contributing Code**](#-contributing-code)

### ⚡️ Quick Links for Maintainers

- [All Open Pull Requests](https://github.com/SAP/theming-plugins-coding-agents/pulls)
- [All Open Issues](https://github.com/SAP/theming-plugins-coding-agents/issues)

## 📝 Reporting Issues

### Seeking Help / Not a Bug

If you need help setting anything up, or if you have questions regarding the UI theme designer plugins for coding agents, please use [GitHub Discussions](https://github.com/SAP/theming-plugins-coding-agents/discussions) instead of opening an issue.

### How to Report an Issue

1. **Only issues related to UI theme designer plugins for coding agents**
    * Please do not report:
        * Issues caused by dependencies.
        * Issues caused by the use of non-public/internal methods. Only the public methods listed in the API documentation may be used.
        * Something you do not get to work properly, see [Not a Bug / Questions](#seeking-help--not-a-bug).
2. **No duplicate**: You've searched the [issue tracker](https://github.com/SAP/theming-plugins-coding-agents/issues?q=is%3Aissue) to make sure the bug hasn't already been reported.
3. **Good summary**: The summary should be specific to the issue.
4. **Current bug**: The bug can be reproduced in the current version of the relevant plugin(s).
5. **Reproducible bug**: There are step-by-step instructions provided on how to reproduce the issue.
6. **Well-documented**:
    * Precisely state the expected and the actual behavior.
    * Give information about the environment in which the issue occurs (OS/Platform, coding agent + version, etc.).
    * Generally, give as much additional information as possible.
7. **Only one bug per report**: Open additional tickets for additional issues.
8. **Please report bugs in English.**

We encourage you to follow the issue template that will be presented to you when creating a new issue.

When you're ready, report your issue here: https://github.com/SAP/theming-plugins-coding-agents/issues/new

### Reporting Security Issues

If you find any bug that might be a security problem, please follow the instructions given in the [Security Policy](https://github.com/SAP/theming-plugins-coding-agents/security/policy) on how to report it. Please do not create GitHub issues for security-related concerns or problems.

### Use of Labels

GitHub offers labels to categorize issues. The labels can only be set and modified by committers.

#### General issue types:

- **`Bug`**: This issue is a bug in the code.
- **`Feature`**: This is not a bug report, but a feature request.

#### Specific Issue Categories:

- **`documentation`**: This issue is documentation-related.
- **`needs triage`**: This issue needs to be investigated and confirmed as a valid issue that is not a duplicate.

##### Status of an open issue:

- **`information required`**: The author is required to provide more information.
- **`good first issue`**: A newcomer may work on this.
- **`help wanted`**: Additional help in analyzing this issue is required.

##### Status/resolution of a closed issue:

- **`duplicate`**: The issue has already been reported elsewhere.
- **`invalid`**: This issue report will not be handled further. Possible reasons are lack of information or an issue that does not arise anymore.
- **`wontfix`**: While we acknowledge the issue, a fix cannot or will not be provided.

### Issue Reporting Disclaimer

You can help us improve the quality of the UI theme designer plugins for coding agents by submitting detailed bug reports. Our capacity is limited, so we can't answer general questions or handle consulting requests. Including all relevant details helps us process your report efficiently.

We prioritize bug reports that are clearly documented and easy to reproduce. This approach helps us resolve issues more effectively. We may close reports that contain insufficient information.

This project is open-source software and comes without a warranty. While we review all well-documented issues, a resolution is not guaranteed.

Bug report analysis support is always very welcome! See [Analyze Issues](#-analyzing-issues).

## 🤩 Feature Requests

You can request features by creating an issue in this repository: https://github.com/SAP/theming-plugins-coding-agents/issues/new

For bigger features, please open an issue first to discuss the proposed feature with the project contributors before investing significant time into an implementation.

## 🔍 Analyzing Issues

Analyzing issue reports can be a lot of effort. Any help is welcome! 👍

You may be able to add additional or missing information, such as a step-by-step guide on how to reproduce an issue or an analysis of the root cause. In case of the latter, you might even be able to [contribute](#-contributing-code) a bugfix. 🙌

## 💻 Contributing Code

### General Remarks

You're welcome to contribute code to fix bugs or to implement new features.

There are three important things to know:

1. You must be aware of the Apache License (which describes contributions) and **agree to the Developer Certificate of Origin (DCO)**. This is common practice in major open source projects. To make this process as simple as possible, we use [CLA assistant](https://cla-assistant.io/) for individual contributions. CLA assistant is an open source tool that integrates with GitHub very well and enables a one-click experience for accepting the DCO.
2. Follow our **[Development Conventions and Guidelines](docs/Guidelines.md)**.
3. **Not all proposed contributions can be accepted**. The code must match the overall direction of the project. For most bug fixes this is a given, but a major feature implementation should be discussed with one of the committers first — ideally by opening an enhancement issue. This avoids disappointment.

### Developer Certificate of Origin (DCO)

For legal reasons, contributors will be asked to accept a DCO before they submit the first pull request to this project. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).
This happens in an automated fashion during the submission process: the CLA assistant tool will add a comment to the pull request. Click it to check the DCO, then accept it on the following screen. CLA assistant will remember your decision for upcoming contributions.

### How to Contribute

1. Make sure the change is welcome (see [General Remarks](#general-remarks)).
1. Create a branch by forking the repository and apply your change.
1. Commit and push your change to that branch.
    - 👉 **Please follow our [Development Conventions and Guidelines](docs/Guidelines.md).**
1. Create a pull request.
1. Follow the link posted by CLA assistant to your pull request and accept it as described above.
1. Wait for our code review and approval and enhance your change if requested to do so.
1. Once the change has been approved and merged, we will inform you in a comment.
1. Celebrate! 🎉

### Contributing with AI-generated code

As artificial intelligence evolves, AI-generated code is becoming valuable for many software projects, including open-source initiatives. While we recognize the potential benefits of incorporating AI-generated content into our open-source projects, there are certain requirements that need to be reflected and adhered to when making contributions.

Please see our [guideline for AI-generated code contributions to SAP Open Source Software Projects](https://github.com/SAP/.github/blob/main/CONTRIBUTING_USING_GENAI.md) for these requirements.
