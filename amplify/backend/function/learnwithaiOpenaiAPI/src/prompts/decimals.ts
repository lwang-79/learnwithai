import { QuestionLevel } from "../types";
import { ChatCompletionRequestMessage } from "openai";
import { mathTemplate, template } from "./math";


export function generateDecimalsPrompt(
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
      if (random < 0.5) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'decimals', 1, 0, 1, 1
        );
      } else {
        return lowDecimalsPrompt();
      }
      break;
    case QuestionLevel.Year4:
      if (random < 0.2) {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'decimals', 1, 0, 1, 1
        );
      } else if (random < 0.5) {
        return middleDecimalsPrompt();
      } else if (random < 0.6) {
        return highDecimalsPrompt();
      } else {
        return lowDecimalsMultiplicationPrompt();
      }
      break;
      
    case QuestionLevel.Year5:
      if (random < 0.2) {
        return highDecimalsPrompt();
      } else if (random < 0.4) {
        return lowDecimalsMultiplicationPrompt();
      } else if (random < 0.7) {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'decimals', 1, 0, 1, 1
        );
      } else {
        return middleDecimalsPrompt();
      }
      break;
    case QuestionLevel.Year6:
      if (random < 0.1) {
        return lowDecimalsMultiplicationPrompt();
      } else if (random < 0.2) {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'decimals', 10, -10, 1, 1
        );
      } else if (random < 0.7) {
        return highDecimalsPrompt();
      } else {
        return middleDecimalsPrompt();
      }
      break;
    default:
      if (random < 0.8) {
        return highDecimalsPrompt();
      } else {
        return middleDecimalsPrompt();
      }
  }

  return [
    { role: 'system', content: 'You are a math teacher.' },
    { role: 'user', content: prompt }
  ]
}

function generalArithmeticPrompt(
  operation: string = 'addition',
  operandType: string = 'decimals',
  upper: number = 10,
  lower: number = 0,
  digitNumber: number = 1,
  workoutNumber: number = 1
) {
  return `
Generate a ${operation} math multi-choice question with the following conditions.
1. The question should involve ${operandType} operations with operands ranging from ${lower} to ${upper} with ${digitNumber} digits.
2. Work out the question with calculator.
3. Ensure there are 4 options provided, including the correct answer.
4. ${template}
`
}

function lowDecimalsPrompt() {
  const condition = `
  1. Choose two decimal numbers, each less than 1 and greater than 0, with 1 digit after the decimal point.
  2. Craft a short story using these numbers to create a context for the question.
  3. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.
  `;

  const question = `
  Tom and Jack are measuring their heights. Tom's height is 1.5 meters, and Jack is 0.2 meters taller than Tom. What is Jack's height?
  `;

  const answer = `1.7`;

  const workout = `
  1.5 meters (Tom's height) + 0.2 meters (additional height) = 1.7 meters (Jack's height)
  `;

  const options = `
  A: 1.5 meters
  B: 1.6 meters
  C: 1.7 meters
  D: 1.8 meters
  `

  return mathTemplate('low-level', 'decimals addition or subtraction', condition, question, answer, workout, options);
//   return `
// Give an addition or subtraction math multi-choice question with the following conditions.
// 1. The operands should be decimals less than 1 and greater than 0 with 1 digits.
// 2. Make a short story with these numbers, such as "Tom's height is 1.5m, Jack is 0.2m higher than Tom. What's Jack's heigh?"
// 3. There should be 4 options including the correct answer.
// 4. Work out the question with at least 3 methods.
// 5. ${template}
// `
}

function lowDecimalsMultiplicationPrompt() {
  const condition = `
  1. Choose one decimal number, less than 10 and greater than 0, with 1 digit after the decimal point.
  2. Choose another integer, less than 10 and greater than 0, as the second operand.
  3. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.
  `;

  const question = `
  What is the product of 3.6 and 7?
  `;

  const answer = `25.2`;

  const workout = `
  3.6 x 7 = 25.2
  `;

  const options = `
  A: 21.2
  B: 24.2
  C: 25.2
  D: 25.4
  `

  return mathTemplate('low-level', 'decimals multiplication or division', condition, question, answer, workout, options);
//   return `
// Give an multiplication math multi-choice question with the following conditions.
// 1. One operand should be a decimal less than 10 and greater than 0 with 1 digit.
// 2. Another operand should be an integer less than 10 and greater than 0.
// 3. There should be 4 options including the answer.
// 4. Work out the question with at least 1 method.
// 5. Make sure the correct answer is in the options.
// 6. ${template}
// `
}

// function middleDecimalsPrompt() {
//   return `
//   Give a middle level difficulty decimals multi-choice question with the following conditions.
//   1. One operand should be a decimal 1 digit.
//   2. Make a reasonable short story with these numbers, such as "An ice cream shop has 5 flavours ice creams. The shop makes 40 litres of each of the flavours every day. If every litres cost 1.5 dollars, how much these ice creams cost every day?"
//   3. Work out the question with at least 3 methods.
//   4. If at least two workout have the same value, it's the correct answer.
//   5. There should be 4 options including the correct answer.
//   6. The answer section must point to the correct answer.
//   7. ${template}
//   `
// }

function middleDecimalsPrompt() {
  const condition = `
  1. Choose two decimal numbers, with 1 digit after the decimal point.
  2. Craft a short story or scenario using these numbers to create a context for the question.
  3. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.
  `;

  const question = `
  A grocery store sells 0.4 kg of apples for $1.60. If a customer buys 2.4 kg of apples, how much will they have to pay?
  `;

  const answer = `9.6`;

  const workout = `
  We can start by using a proportion to solve for the cost of 1 kg of apples: 

  0.4 kg apples = $1.60 
  
  1 kg apples = $1.60 ÷ 0.4 = $4 
  
  So 2.4 kg of apples will cost: 
  
  2.4 kg apples = 2.4 × $4 = $9.60 
  
  Therefore, the customer will have to pay $9.60 for 2.4 kg of apples.
  `;

  const options = `
  A: $8.60
  B: $9.20
  C: $9.60
  D: $7.80
  `

  return mathTemplate('middle-level', 'decimals', condition, question, answer, workout, options);
//   return `
// Give a middle level difficulty decimals multi-choice question with the following conditions.
// 1. One operand should be a decimal 1 digit.
// 2. Make a reasonable short story with these numbers, such as "A grocery store sells 0.4 kg of apples for $1.60. If a customer buys 2.4 kg of apples, how much will they have to pay?"
// 3. Work out the question with at least 3 methods.
// 4. Choose the answer which is more frequent.
// 5. There should be 4 options including the correct answer.
// 6. The answer section must point to the correct answer.
// 7. ${template}
// `
}

function highDecimalsPrompt() {
  const condition = `
  1. Craft a complex manufacturing scenario or story using the digital numbers to frame the question. Ensure that it involves multiple variables.
  2. Use a story or context that requires 3 to 5 steps or calculations to reach the final answer.
  3. Include at least two mathematical operations (e.g., addition, subtraction, multiplication, division) in the question.
  4. Choose numbers and units that are appropriate for the context of the story, making sure they are challenging to work with.  `;

  const question = `
  A worker produces 2.5 units of a product every 4 hours. If the manufacture plant has 12 workers and operates for 8 hours per day, how many days will it take to produce a total of 1000 units?
  `;

  const answer = `17`;

  const workout = `
  One worker produces 2.5 units/4 hours = 0.625 units/hour.
  So, 12 workers produce 12 x 0.625 units/hour = 7.5 units/hour.
  In 8 hours of operation, 12 workers produce 7.5 units/hour x 8 hours = 60 units.
  To produce 1000 units, it would take 1000 units / 60 units per day = 16.67 days, which rounds up to 17 days. 

  Therefore, it would take 17 days to produce a total of 1000 units.
  `;

  const options = `
  A: 15 days
  B: 16 days
  C: 17 days
  D: 20 days
  `

  return mathTemplate('middle-level', 'decimals', condition, question, answer, workout, options);
}

// 1. Choose a few decimal numbers with 1 digit after the decimal point.
// 2. Craft a short story or scenario using these numbers to create a complex context for the question.
// 3. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.
