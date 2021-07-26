import chalk from "chalk";
import { events, branchEvents, activityTypes } from "./events.js";
import {
  languageEnvironmentConf,
  languageEnvironments,
} from "./language-environments.js";
import { runnerEnvironments } from "./runner-environments.js";

const questions = [];

questions.push({
  type: "input",
  name: "filename",
  message: "What filename would you like to use?",
  default: "main.yml",
});

questions.push({
  type: "input",
  name: "name",
  message: "What's the name of your workflow?",
  validate(answer){
      if (!answer) {
          return "You must give your workflow a name!"
      }
      return true
  }
});

questions.push({
  type: "checkbox",
  name: "events",
  message: "Choose events:",
  choices: events,
  validate(answer) {
    if (answer.length < 1) {
      return "Choose at least one event!";
    }
    return true;
  },
});

for (const event of branchEvents) {
  questions.push({
    type: "input",
    name: `on.${event}.branches`,
    message: `List branches for ${event} (optional)`,
    when(answers) {
      if (answers.events.includes(event)) {
        console.log(
          `${chalk.blue(
            "!"
          )} Branch and tag events support glob patterns *, **, +, ?, !`
        );
        return true;
      }
      return false;
    },
    filter(answer) {
      if (!answer) {
        return undefined;
      }
      return answer.split(/[ ,]+/).filter(Boolean);
    },
    transformer(answer) {
      if (!answer) {
        return "";
      }
      return answer;
    },
  });
  questions.push({
    type: "input",
    name: `on.${event}.branches-ignore`,
    message: `Ignore branches for ${event} (optional)`,
    when(answers) {
      return answers.events.includes(event);
    },
    filter(answer) {
      if (!answer) {
        return undefined;
      }
      return answer.split(/[ ,]+/).filter(Boolean);
    },
    transformer(answer) {
        if (!answer) {
          return "";
        }
      return answer;
    },
  });
  questions.push({
    type: "input",
    name: `on.${event}.tags`,
    message: `List tags for ${event} (optional)`,
    when(answers) {
      return answers.events.includes(event);
    },
    filter(answer) {
      if (!answer) {
        return undefined;
      }
      return answer.split(/[ ,]+/).filter(Boolean);
    },
    transformer(answer) {
        if (!answer) {
          return "";
        }
      return answer;
    },
  });
  questions.push({
    type: "input",
    name: `on.${event}.tags-ignore`,
    message: `Ignore tags for ${event} (optional)`,
    when(answers) {
      return answers.events.includes(event);
    },
    filter(answer) {
      if (!answer) {
        return undefined;
      }
      return answer.split(/[ ,]+/).filter(Boolean);
    },
    transformer(answer) {
        if (!answer) {
          return "";
        }
      return answer;
    },
  });
}

for (const [event, types] of Object.entries(activityTypes)) {
  questions.push({
    type: "checkbox",
    name: `on.${event}.types`,
    message: `Choose activity types for ${event} or hit Enter to use defaults`,
    choices: types,
    when(answers) {
      return answers.events.includes(event);
    },
    filter(answer) {
      if (!answer) {
        return undefined;
      }
      return answer;
    },
  });
}

questions.push({
  type: "input",
  name: "jobIds",
  message: "List all job_id's you want to create (e.g. build, deploy):",
  filter(answer) {
    return answer.split(/[ ,]+/).filter(Boolean);
  },
  validate(answer) {
    if (answer.length < 1) {
      return "Define at least one job!";
    }
    return true;
  },
});

function getJobQuestions(initialAnswers) {
  const jobIds = initialAnswers.jobIds;
  const jobQuestions = [];
  const previousJobs = [];

  for (let i = 0; i < jobIds.length; i++) {
    const job = jobIds[i];

    // job name
    jobQuestions.push({
      type: "input",
      name: `jobs.${job}.name`,
      message: `Give a name for job '${job}' (optional)`,
      filter(answer) {
        if (!answer) {
          return undefined;
        }
        return answer;
      },
    });

    // needed jobs
    if (i > 0) {
      jobQuestions.push({
        type: "checkbox",
        name: `jobs.${job}.needs`,
        message: `Choose the needed jobs for '${job}' (optional)`,
        choices: [...previousJobs],
      });
    }

    // runner type
    jobQuestions.push({
      type: "checkbox",
      name: `jobs.${job}.runs-on`,
      message: `Choose runner environment(s) for '${job}'`,
      choices: runnerEnvironments,
      validate(answer) {
        if (answer.os.length < 1) {
          return "Choose at least one environment!";
        }
        return true;
      },
      filter(answer) {
        return {
          matrix: answer.length > 1,
          os: answer,
        };
      },
    });
    jobQuestions.push({
      type: "input",
      name: `jobs.${job}.runs-on.os`,
      message: "Specify labels for the self-hosted runner (optional)",
      when(answers) {
        const runs_on = answers.jobs[job]["runs-on"];
        return !runs_on.matrix && runs_on.os.includes("self-hosted");
      },
      filter(answer) {
        return ["self-hosted", ...answer.split(/[ ,]+/).filter(Boolean)];
      },
    });

    // checkout repo
    jobQuestions.push({
      type: "list",
      name: `job-options.${job}.checkout`,
      message: `Do you want to checkout the repository for this job?`,
      choices: ["yes", "no"],
      filter(answer) {
        return answer === "yes";
      },
    });

    // programming language environments
    jobQuestions.push({
      type: "checkbox",
      name: `job-options.${job}.language-environments`,
      message: "Choose language environments",
      choices: languageEnvironments,
    });

    // add selected languages to the same steps list one by one (created at repo checkout question)
    for (const language of languageEnvironments) {
      if (language in languageEnvironmentConf) {
        const languageConf = languageEnvironmentConf[language];
        for (const option of languageConf.with) {
          const question = {
            type: option.type,
            name: `job-options.${job}.${language}.with.${option.name}`,
            message: option.message,
            choices: option.choices,
            validate(answer) {
              if (option.required && !answer) {
                return false;
              }
              return true;
            },
            when(answers) {
              return answers["job-options"][job][
                "language-environments"
              ].includes(language);
            },
            filter(answer) {
              if (!answer || answer === option.skip_option) {
                return undefined;
              }
              return answer;
            },
          };
          jobQuestions.push(question);
        }
      }
    }
    previousJobs.push(job);
  }
  return jobQuestions;
}

export { questions, getJobQuestions };
