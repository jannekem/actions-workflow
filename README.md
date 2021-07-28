# Actions Workflow

Actions Workflow is a command line application that you can use to bootstrap GitHub Actions workflow files in your repositories. It uses [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) to create a conversational UI where you answer questions about the desired outcome. It creates the YAML file for you and saves it in the correct location.

https://user-images.githubusercontent.com/2357691/127365665-8c8822ac-8fb1-4c18-8c97-ea5aa4a67d48.mov

## Usage

This app requires [Node.js](https://nodejs.org/en/) to run. You can use `npx`:

```bash
npx actions-workflow
```

The utility creates a file that can act as a starting point for your workflow. First you choose the basic settings such as workflow name, trigger rules and job names. Then for each job you define the required configurations such as runner environment(s), whether you want to checkout the repository, and which language runtimes you want to setup.

When you choose more than one operating system they are automatically configured as a matrix build. Similarly, if you have many jobs you can choose if the later ones should depend on the previous jobs.
