import inquirer from "inquirer";
import { questions } from "./questions.js";

inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
        console.log(error)
      // Something else went wrong
    }
  });
