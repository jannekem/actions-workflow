import chalk from "chalk";
import fs from "fs";

function checkGitDirectory() {
  try {
    fs.statSync(".git");
  } catch {
    console.log("Must be run at the root of a Git project!");
    process.exit(1);
  }
}

function writeWorkflow(filename, content) {
  fs.mkdirSync(".github/workflows", { recursive: true});
  const fullName = `.github/workflows/${filename}`
  fs.writeFileSync(fullName, content);
  console.log(`${chalk.blue("!")} Workflow file saved as: ${fullName}`)
}

function checkIfWorkflowExists(filename) {
  return fs.existsSync(`.github/workflows/${filename}`);
}

export { checkGitDirectory, checkIfWorkflowExists, writeWorkflow };
