import inquirer from "inquirer";
import { questions, getJobQuestions } from "./questions.js";

console.log(questions)
const jobQuestions = getJobQuestions({jobIds: ["build"]})
console.log(jobQuestions)

//**
 
inquirer
  .prompt(questions)
  .then((answers) => {
    inquirer.prompt(getJobQuestions(answers)).then((jobAnswers) => {
      console.log(JSON.stringify(answers, null, "  "));
      console.log(JSON.stringify(jobAnswers, null, "  "));
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
//*/