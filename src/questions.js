import { events, activityTypes } from "./events.js";

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
  message: "Give a friendly name for your workflow:",
});
questions.push({
  type: "checkbox",
  name: "events",
  message: "Choose the events that you want to respond to",
  choices: events,
  validate(answer) {
    if (answer.length < 1) {
      return "Choose at least one event!";
    }
    return true;
  },
});

for (const [event, types] of Object.entries(activityTypes)) {
  questions.push({
    type: "checkbox",
    name: `${event}.activityTypes`,
    message: `Choose activity types for ${event} or hit Enter to use defaults`,
    choices: types,
    when(answers) {
        return answers.events.includes(event)
    }
  });
}

export { questions };
