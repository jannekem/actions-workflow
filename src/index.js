import inquirer from "inquirer";
import { questions, getJobQuestions } from "./questions.js";
import { buildYaml } from "./workflow.js";


inquirer
  .prompt(questions)
  .then((baseAnswers) => {
    inquirer.prompt(getJobQuestions(baseAnswers)).then((jobAnswers) => {
      buildYaml(baseAnswers, jobAnswers);
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
