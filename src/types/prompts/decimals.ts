import { QuestionLevel } from "@/types/types";
import { ChatCompletionRequestMessage } from "openai";
import { template } from "./math";


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
        prompt = lowDecimalsPrompt();
      }
      break;
    case QuestionLevel.Year4:
      if (random < 0.3) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'decimals', 1, 0, 2, 1
        );
      } else if (random < 0.5) {
        prompt = middleDecimalsPrompt();
      } else {
        prompt = lowDecimalsMultiplicationPrompt();
      }
      break;
      
    case QuestionLevel.Year5:
      if (random < 0.2) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'decimals', 1, 0, 2, 1
        );
      } else if (random < 0.4) {
        prompt = lowDecimalsMultiplicationPrompt();
      } else if (random < 0.7) {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'decimals', 1, 0, 1, 1
        );
      } else {
        prompt = middleDecimalsPrompt();
      }
      break;
    case QuestionLevel.Year6:
      if (random < 0.1) {
        prompt = generalArithmeticPrompt(
          lowOperations[randomIndex], 'decimals', 10, -10, 2, 1
        );
      } else if (random < 0.2) {
        prompt = lowDecimalsMultiplicationPrompt();
      } else if (random < 0.4) {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'decimals', 10, -10, 1, 1
        );
      } else {
        prompt = middleDecimalsPrompt();
      }
      break;
    default:
      if (random < 0.4) {
        prompt = generalArithmeticPrompt(
          highOperations[randomIndex], 'decimals', 20, -20, 1, 1
        );
      } else {
        prompt = middleDecimalsPrompt();
      }
      break;
  }

  console.log(prompt)

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
Give a ${operation} math multi-choice question with the following conditions.
1. The operands should be ${operandType} less than ${upper} and greater than ${lower} with ${digitNumber} digits.
2. Work out the question with calculator.
3. There should be 4 options including the answer.
4. Make sure the correct answer is in the options.
5. ${template}
`
}

function lowDecimalsPrompt() {
  return `
Give an addition or subtraction math multi-choice question with the following conditions.
1. The operands should be decimals less than 1 and greater than 0 with 1 digits.
2. Make a short story with these numbers, such as "Tom's height is 1.5m, Jack is 0.2m higher than Tom. What's Jack's heigh?"
3. There should be 4 options including the correct answer.
4. Work out the question with at least 3 methods.
5. ${template}
`
}

function lowDecimalsMultiplicationPrompt() {
  return `
Give an multiplication math multi-choice question with the following conditions.
1. One operand should be a decimal less than 10 and greater than 0 with 1 digit.
2. Another operand should be an integer less than 10 and greater than 0.
3. There should be 4 options including the answer.
4. Work out the question with at least 1 method.
5. Make sure the correct answer is in the options.
6. ${template}
`
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
  return `
Give a middle level difficulty decimals multi-choice question with the following conditions.
1. One operand should be a decimal 1 digit.
2. Make a reasonable short story with these numbers, such as "A grocery store sells 0.4 kg of apples for $1.60. If a customer buys 2.4 kg of apples, how much will they have to pay?"
3. Work out the question with at least 3 methods.
4. Choose the answer which is more frequent.
5. There should be 4 options including the correct answer.
6. The answer section must point to the correct answer.
7. ${template}
`
}
