import { QuestionLevel } from "@/types/types";
import { template } from "./math";


export function generateArithmeticPrompt(level: QuestionLevel) {
  const lowOperations = ['addition', 'subtraction'];
  const highOperations = ['multiplication', 'division'];

  const randomIndex = Math.floor(Math.random() * 2);
  const random = Math.random();

  let prompt = '';
  switch (level) {
    case QuestionLevel.Year1:
      prompt = generalArithmeticPrompt(lowOperations[randomIndex]);
      break;
    case QuestionLevel.Year2:
      prompt = generalArithmeticPrompt(
        lowOperations[randomIndex], 'integer', 100, 0
      );
      break;
    case QuestionLevel.Year3:
      if (random < 0.7) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'integer', 100, 0
        );
      } else {
        prompt = lowMultiplicationPrompt();
      }
      break;
    case QuestionLevel.Year4:
      if (random < 0.2) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'integer', 1000, 100, 2
        );
      } else if (random >= 0.2 && random < 0.5) {
        prompt = middleMultiplicationPrompt();
      } else {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'integer', 100, 0, 2
        );
      }
      break;
    case QuestionLevel.Year5:
      if (random < 0.1) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'integer', 1000, 100, 2
        );
      } else if (random >= 0.2 && random < 0.7) {
        prompt = middleMultiplicationPrompt();
      } else if (random >= 0.7 && random < 0.8) {
        prompt = highArithmeticPrompt();
      } else {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'integer', 100, 0, 2
        );
      }
      break;
    case QuestionLevel.Year5:
      if (random < 0.1) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'integer', 1000, 100, 2
        );
      } else if (random >= 0.2 && random < 0.5) {
        prompt = middleMultiplicationPrompt();
      } else if (random >= 0.7 && random < 0.8) {
        prompt = highArithmeticPrompt();
      } else {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'integer', 100, 0, 2
        );
      }
      break;
    default:
      if (random < 0.3) {
        prompt = middleMultiplicationPrompt();
      } else if (random >= 0.7 && random < 0.9) {
        prompt = highArithmeticPrompt();
      } else {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'integer', 100, 0, 2
        );
      }
  }

  console.log(prompt)

  return [
    { role: 'system', content: 'You are a math teacher.' },
    { role: 'user', content: prompt }
  ]
}

function generalArithmeticPrompt(
  operation: string = 'addition',
  operandType: string = 'integer',
  upper: number = 10,
  lower: number = 0,
  workoutNumber: number = 1
) {
  return `
  Give a ${operation} math multi-choice question with the following conditions.
  1. The operands should be ${operandType} less than ${upper} and greater than ${lower}.
  2. There should be 4 options including the answer.
  3. Work out the question with at least ${workoutNumber} method.
  4. ${template}
  `
}

function lowMultiplicationPrompt() {
  return `
  Give a low level difficulty math multiplication multi-choice question with the following conditions.
  1. Choose two positive integers less than 10. The product of these two numbers is less than 20.
  2. Make a short story with these numbers, such as "Dad gives 3 dollars to Jack every day, how much does Jack have after 2 days?"
  3. There should be 4 options including the correct answer.
  4. Work out the question with at least 1 method.
  5. ${template}
  `
}

function middleMultiplicationPrompt() {
  return `
  Give a middle level difficulty math multiplication multi-choice question with the following conditions.
  1. Make a short story with these numbers, such as "An ice cream shop is testing some new flavours of ice cream. They invent 30 new flavours for customers to try and discard the 15 least popular new flavours. The shop makes 40 litres of each of the remaining flavours. How many litres of ice cream did the shop make?"
  2. There should be 4 options including the correct answer.
  3. Work out the question with at least 2 methods.
  4. ${template}
  `
}

function highArithmeticPrompt() {
  return `
  Give a high level difficulty math multiplication multi-choice question with the following conditions.
  1. Make a short story with these numbers, such as "Bianca's mum just took roast lamb out of the oven and set it aside to rest. The core temperature right now is 170 Fahrenheit and will drop 10 Fahrenheit every 5 minutes. If it rests for 20 minutes, what will the final core temperature be?"
  2. There should be 4 options including the correct answer.
  3. Work out the question with at least 2 methods.
  4. ${template}
  `
}

