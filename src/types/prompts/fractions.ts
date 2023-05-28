import { QuestionLevel } from "@/types/types";
import { ChatCompletionRequestMessage } from "openai";
import { template } from "./math";

export function generateFractionsPrompt(
  level: QuestionLevel
): ChatCompletionRequestMessage[] {
  const lowOperations = ['addition', 'subtraction'];
  const highOperations = ['multiplication', 'division'];

  const randomIndex = Math.floor(Math.random() * 2);
  const random = Math.random();

  let prompt = '';
  switch (level) {
    case QuestionLevel.Year1:
    case QuestionLevel.Year2:
    case QuestionLevel.Year3:
      prompt = generalFractionsPrompt(lowOperations[randomIndex]);
      break;
    case QuestionLevel.Year4:
      if (random < 0.3) {
        prompt = generalFractionsPrompt(
          lowOperations[randomIndex], 10, -10, 1
        );
      } else if (random < 0.5) {
        prompt = lowFractionsPrompt();
      } else {
        prompt = generalFractionsPrompt(
          highOperations[randomIndex], 10, 0, 1
        );
      }
      break;
    case QuestionLevel.Year5:
      if (random < 0.1) {
        prompt = generalFractionsPrompt(
          lowOperations[randomIndex], 10, -10, 1
        );
      } else if (random < 0.7) {
        prompt = lowFractionsPrompt();
      } else if (random < 0.8) {
        prompt = middleFractionsPrompt();
      } else {
        prompt = generalFractionsPrompt(
          highOperations[randomIndex], 10, 0, 1
        );
      }
      break;
    case QuestionLevel.Year6:
      if (random < 0.1) {
        prompt = generalFractionsPrompt(
          lowOperations[randomIndex], 10, -10, 1
        );
      } else if (random < 0.3) {
        prompt = lowFractionsPrompt();
      } else if (random < 0.5) {
        prompt = middleFractionsPrompt();
      } else if (random < 0.8) {
        prompt = highFractionsPrompt();
      } else {
        prompt = generalFractionsPrompt(
          highOperations[randomIndex], 10, 0, 1
        );
      }
      break;
    default:
      if (random < 0.2) {
        prompt = lowFractionsPrompt();
      } else if (random < 0.5) {
        prompt = middleFractionsPrompt();
      } else {
        prompt = highFractionsPrompt();
      }
  }

  console.log(prompt)

  return [
    { role: 'system', content: 'You are a math teacher.' },
    { role: 'user', content: prompt }
  ]
}

function generalFractionsPrompt(
  operation: string = 'addition',
  upper: number = 10,
  lower: number = 0,
  workoutNumber: number = 1
) {
  return `
  Give a ${operation} math multi-choice question with the following conditions.
  1. The operands should be fractions with denominator less than ${upper} and greater than ${lower}.
  2. There should be 4 options including the answer.
  3. Work out the question with at least ${workoutNumber} method.
  4. ${template}
  `
}

function lowFractionsPrompt() {
  return `
  Give a low level difficulty math multiplication multi-choice question with the following conditions.
  1. Choose two positive fractions with denominator less than 10.
  2. Make a short story with these numbers, such as "A recipe for a cake calls for 3/4 cup of sugar. If you want to make half the recipe, how much sugar do you need?"
  3. There should be 4 options including the correct answer.
  4. Work out the question with at least 1 method.
  5. ${template}
  `
}

function middleFractionsPrompt() {
  return `
  Give a middle level difficulty math multiplication multi-choice question with the following conditions.
  1. Choose two positive fractions with denominator less than 10.
  2. Make a short story with these numbers, such as "John can paint a room in 6 hours, and Tom can paint the same room in 4 hours. How long will it take for them to paint the room working together?"
  3. There should be 4 options including the correct answer.
  4. Work out the question with at least 2 methods.
  5. ${template}
  `
}

function highFractionsPrompt() {
  return `
  Give a high level difficulty math multiplication multi-choice question with the following conditions.
  1. Choose two fractions with denominator less than 10.
  2. Make a short story with these numbers, such as "A water tank can be filled by two pipes. Pipe A can fill the tank in 6 hours, and pipe B can fill the tank in 4 hours. However, there is a hole in the tank that allows water to leak out, which can empty the full tank in 9 hours. If the tank is empty to start, how long will it take for both pipes A and B to fill the tank if the hole is fixed?"
  3. There should be 4 options including the correct answer.
  4. Work out the question with at least 2 methods.
  5. ${template}
  `
}