import { QuestionLevel } from "../types";
import { ChatCompletionRequestMessage } from "openai";
import { mathTemplate, template } from "./math";


export function generateArithmeticPrompt(
  level: QuestionLevel
): ChatCompletionRequestMessage[] {
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
        return lowMultiplicationPrompt();
      }
      break;
    case QuestionLevel.Year4:
      if (random < 0.2) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'integer', 1000, 100, 2
        );
      } else if (random < 0.5) {
        return middleMultiplicationPrompt();
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
      } else if (random < 0.7) {
        return middleMultiplicationPrompt();
      } else if (random < 0.8) {
        return highArithmeticPrompt();
      } else {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'integer', 100, 0, 2
        );
      }
      break;
    case QuestionLevel.Year6:
      if (random < 0.1) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'integer', 1000, 100, 2
        );
      } else if (random < 0.5) {
        return middleMultiplicationPrompt();
      } else if (random < 0.8) {
        return highArithmeticPrompt();
      } else {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'integer', 100, 0, 2
        );
      }
      break;
    default:
      if (random < 0.3) {
        return middleMultiplicationPrompt();
      } else if (random < 0.9) {
        return highArithmeticPrompt();
      } else {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'integer', 100, 0, 2
        );
      }
  }

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
  Generate a ${operation} math multi-choice question with the following conditions.
  1. The question should involve ${operandType} operations with operands ranging from ${lower} to ${upper}.
  2. Ensure there are 4 options provided, including the correct answer.
  3. Work out the question with at least ${workoutNumber} method.
  4. ${template}
  `
}

function lowMultiplicationPrompt() {
  const condition = `
  1. Choose two positive integers, a and b, such that a and b are both less than 11 and their product is less than 21.
  2. Create a short story or scenario using these numbers to frame the question.
  3. The question should explicitly ask for the product of a and b.
  `;

  const question = `
  Emily went to the store to buy some snacks for her friends. She picked up 4 packs of cookies, each pack containing 5 chocolate chip cookies. How many cookies did Emily buy in total?
  `;

  const answer = `20`;

  const workout = `
  To find the total number of cookies Emily bought, we can multiply the number of packs of cookies she bought by the number of cookies in each pack:

  Total number of cookies = 4 packs × 5 cookies/pack
  Total number of cookies = 20 cookies 

  Therefore, Emily bought a total of 20 cookies for her friends.
  `;

  const options = `
  A: 15 cookies
  B: 18 cookies
  C: 20 cookies
  D: 23 cookies
  `

  return mathTemplate('low-level', 'multiplication', condition, question, answer, workout, options);
  // return `
  // Generate a low level difficulty math multiplication multi-choice question with the following conditions.
  // 1. Choose two positive integers less than 10. The product of these two numbers is less than 20.
  // 2. Make a short story with these numbers, such as "Dad gives 3 dollars to Jack every day, how much does Jack have after 2 days?"
  // 3. There should be 4 options including the correct answer.
  // 4. Work out the question with at least 1 method.
  // 5. ${template}
  // `
}

function middleMultiplicationPrompt() {
  const condition = `
  1. Create a short story or scenario using 3 to 5 numbers to frame the question.
  2. Solving the question should involve 3 or 4 calculation steps.
  3. Choose numbers and units that are appropriate for the context of the story.
  `;

  const question = `
  An ice cream shop is testing some new flavours of ice cream. They invent 30 new flavours for customers to try and discard the 15 least popular new flavours. The shop makes 40 litres of each of the remaining flavours. How many litres of ice cream did the shop make?
  `;

  const answer = `600`;

  const workout = `
  The shop had 30 new flavours, and they discarded 15, leaving 30 – 15 = 15 remaining flavours.
  They made 40 litres of each of the 15 remaining flavours, so they made a total of 15 x 40 = 600 litres of ice cream. Answer: 600.
  `;

  const options = `
  A: 650 litres
  B: 700 litres
  C: 600 litres
  D: 1000 litres
  `

  return mathTemplate('middle-level', 'multiplication', condition, question, answer, workout, options);
  // return `
  // Give a middle level difficulty math multiplication multi-choice question with the following conditions.
  // 1. Make a short story with these numbers, such as "An ice cream shop is testing some new flavours of ice cream. They invent 30 new flavours for customers to try and discard the 15 least popular new flavours. The shop makes 40 litres of each of the remaining flavours. How many litres of ice cream did the shop make?"
  // 2. There should be 4 options including the correct answer.
  // 3. Work out the question with at least 2 methods.
  // 4. ${template}
  // `
}

function highArithmeticPrompt() {
  const condition = `
  1. Craft a complex scenario or story using the given numbers to frame the question. Ensure that it involves multiple variables.
  2. Solving the question should involve 3 or 4 calculation steps including multiplication or division operations.
  3. The question should require a deeper understanding of the mathematical concepts involved, incorporating higher-level problem-solving skills.
  4. Choose numbers and units that are appropriate for the context of the story, making sure they are challenging to work with.
  `;

  const question = `
  Bianca's mum just took roast lamb out of the oven and set it aside to rest. The core temperature right now is 170 Fahrenheit and will drop 10 Fahrenheit every 5 minutes. If it rests for 20 minutes, what will the final core temperature be?
  `;

  const answer = `130`;

  const workout = `
  To solve the problem, we can start by calculating how many 5-minute intervals there are in 20 minutes:

  20 ÷ 5 = 4

  So the temperature will drop 10 degrees for each of the 4 intervals, giving us a total temperature drop of:

  10 x 4 = 40

  Subtracting this from the initial temperature of 170 Fahrenheit gives us the final core temperature:

  170 - 40 = 130

  Therefore, the final core temperature of the roast lamb after resting for 20 minutes will be 130 Fahrenheit.
  `;

  const options = `
  A: 120 Fahrenheit
  B: 125 Fahrenheit
  C: 130 Fahrenheit
  D: 135 Fahrenheit
  `

  return mathTemplate('high-level', 'multiplication or division', condition, question, answer, workout, options);
  // return `
  // Give a high level difficulty math multiplication multi-choice question with the following conditions.
  // 1. Make a short story with these numbers, such as "Bianca's mum just took roast lamb out of the oven and set it aside to rest. The core temperature right now is 170 Fahrenheit and will drop 10 Fahrenheit every 5 minutes. If it rests for 20 minutes, what will the final core temperature be?"
  // 2. There should be 4 options including the correct answer.
  // 3. Work out the question with at least 2 methods.
  // 4. ${template}
  // `
}

