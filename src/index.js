#!/usr/bin/env node
import inquirer from "inquirer";
import { questions, getJobQuestions } from "./questions.js";
import { buildYaml } from "./workflow.js";
import { checkGitDirectory, writeWorkflow } from "./writer.js";

checkGitDirectory()

inquirer
  .prompt(questions)
  .then((baseAnswers) => {
    inquirer.prompt(getJobQuestions(baseAnswers)).then((jobAnswers) => {
      const workflow = buildYaml(baseAnswers, jobAnswers);
      writeWorkflow(baseAnswers.filename, workflow);
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log(error);
      // Something else went wrong
    }
  });
