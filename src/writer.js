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
  fs.writeFileSync(`.github/workflows/${filename}`, content);
}

function checkIfWorkflowExists(filename) {
  return fs.existsSync(`.github/workflows/${filename}`);
}

export { checkGitDirectory, checkIfWorkflowExists, writeWorkflow };
