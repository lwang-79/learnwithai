import { QuestionLevel } from "@/types/types";
import { template } from "./math";

export function generateTimeJourneyPrompt(level: QuestionLevel) {
  const random = Math.random();

  let prompt:{role: string, content: string}[] = [];

  switch (level) {
    case QuestionLevel.Year1:
    case QuestionLevel.Year2:
    case QuestionLevel.Year3:
      prompt = lowTimePrompt();
      break;
    case QuestionLevel.Year4:
      if (random < 0.5) {
        prompt = lowTimePrompt();
      } else {
        prompt = middleTimePrompt();
      }
      break;
    case QuestionLevel.Year5:
      // if (random < 0.5) {
        prompt = middleTimePrompt();
      // } else if (random < 0.8) {
        // prompt = lowJourneyPrompt();
      // } else {
        // prompt = middleJourneyPrompt();
      // }
      break;
    case QuestionLevel.Year6:
      if (random < 0.2) {
        prompt = middleTimePrompt();
      } else if (random < 0.5) {
        prompt = middleJourneyPrompt();
      } else if (random < 0.7) {
        prompt = highJourneyPrompt();
      } else {
        prompt = towJourneyPrompt();
      }
      break;
    default:
      if (random < 0.2) {
        prompt = middleJourneyPrompt();
      } else if (random < 0.5) {
        prompt = towJourneyPrompt();
      } else {
        prompt = highJourneyPrompt();
      }
  }

  console.log(prompt)

  return [
    { role: 'system', content: 'You are a math teacher.' },
    ...prompt
    // { role: 'user', content: prompt }
  ]
}

function lowTimePrompt() {
  return [{role: 'user', content: `
  Give a low level difficulty math multi-choice question related to time with the following conditions.
  1. Example question: "If it is currently 2:30 PM and a meeting is scheduled to start in 1 hour and 45 minutes, what time will the meeting start?".
  2. There should be 4 options including the answer.
  3. Work out the question with at least 1 method.
  4. ${template}
  `}]
}

function middleTimePrompt() {
  return [
  //   {role: 'user', content: `
  // Give a middle level difficulty math multi-choice question related to time with the following conditions.
  // 1. Need at least two steps to solve the question, may need multiplication, division and subtraction methods. For example:  "If a person starts work at 8:30 AM and works for 6 hours and 45 minutes, and then takes a break for 30 minutes, what time will they finish their break?".
  // 2. Work out the question with calculator 3 times.
  // 3. There should be 4 options including the answer.
  // 4. Make sure the correct answer is in the options.
  // 5. ${template}
  // `}
    {role: 'user', content: `If a person starts work at 8:30 AM and works for 6 hours and 45 minutes, and then takes a break for 30 minutes, what time will they finish their break? Please work it out before give the answer.`},
    {role: 'assistant', content: `
To find the time the person will finish their break, we need to add the duration of their work with the duration of their break and then add it to their start time.

Start Time: 8:30 AM
Duration of Work: 6 hours and 45 minutes
Duration of Break: 30 minutes

First, we need to convert the duration of work and break into hours. 

6 hours and 45 minutes = 6.75 hours
30 minutes = 0.5 hours

Next, we add the duration of work and break:

6.75 hours + 0.5 hours = 7.25 hours

Finally, we add the duration to the start time:

8:30 AM + 7.25 hours = 3:45 PM

Therefore, the person will finish their break at 3:45 PM.    
    `},
    {
      role: 'user', content: `Use the above question, workout and answer to create a multi-choice question.
Desired template:
Question: <>
Workout: <>
Options:
A: <option>
B: <option>
C: <option>
D: <option>
Answer: <A, B, C or D>`
    },
    {
      role: 'assistant', content: `Question: If a person starts work at 8:30 AM and works for 6 hours and 45 minutes, and then takes a break for 30 minutes, what time will they finish their break?
Workout: 8:30 AM + 6.75 hours + 0.5 hours = 3:45 PM
Options:
A: 1:30 PM
B: 2:15 PM
C: 3:45 PM
D: 4:30 PM
Answer: C`
    },
    {
      role: 'user', content: `Follow the above process create a similar difficulty level math multi-choice question related to time in the same template. Involve at least 3 times.`
    }
  ]
}

function lowJourneyPrompt() {
  return [{role: 'user', content: `
  Give a low level difficulty math journey multi-choice question with the following conditions.
  1. To solve the question should use the formula "time = distance / speed" for example: "If a person drives 60 km in 1 hour and 45 minutes, what is their average speed in km per hour?".
  2. There should be 4 options including the answer.
  3. Work out the question with at least 2 method.
  4. ${template}
  `}]
}

function middleJourneyPrompt() {
  return [{role: 'user', content: `
  Give a middle level difficulty math journey multi-choice question with the following conditions.
  1. To solve the question should use the formula "time = distance / speed" for example: "A train leaves station A traveling at a speed of 60 km per hour towards station B. Two hours later, a second train leaves station B traveling at 70 km per hour towards station A. If the distance between the two stations is 420 km, at what time will the two trains meet?".
  2. There should be 4 options including the answer.
  3. Work out the question with at least 2 method.
  4. ${template}
  `}]
}

function towJourneyPrompt() {
  return [{role: 'user', content: `
  Give a high level difficulty math tow-part journey multi-choice question with the following conditions.
  1. To solve the question should use the formula "time = distance / speed" for example: "A person drives from City A to City B at an average speed of 60 km/h. After staying in City B for 5 hours, he returns to City A at an average speed of 96 km/h. If the round trip took a total of 12 hours, what is the distance between City A and City B?".
  2. There should be 4 options including the answer.
  3. Work out the question with at least 2 method.
  4. ${template}
  `}]
}

function highJourneyPrompt() {
  return [{role: 'user', content: `
  Give a high level difficulty math journey multi-choice question with the following conditions.
  1. Involve the flow speed, example: "A person swims across a river that flows at 2 km/h. If the person can swim at 3 km/h in still water and the river is 5 km wide, at what angle to the river flow should they swim to reach the opposite bank in the shortest time?".
  2. There should be 4 options including the answer.
  3. Work out the question with at least 2 method.
  4. ${template}
  `}]
}
