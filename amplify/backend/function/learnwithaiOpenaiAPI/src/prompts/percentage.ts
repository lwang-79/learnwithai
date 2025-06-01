import { QuestionLevel } from "../types";
import { ChatCompletionRequestMessage } from "openai";
import { template } from "./math";

export function generatePercentagePrompt(
  level: QuestionLevel,
): ChatCompletionRequestMessage[] {
  const random = Math.random();

  let prompt = "";
  switch (level) {
    case QuestionLevel.Year1:
    case QuestionLevel.Year2:
    case QuestionLevel.Year3:
      prompt = lowPercentagePrompt();
      break;
    case QuestionLevel.Year4:
      if (random < 0.5) {
        prompt = middlePercentagePrompt();
      } else {
        prompt = lowPercentagePrompt();
      }
      break;
    case QuestionLevel.Year5:
      if (random < 0.2) {
        prompt = lowPercentagePrompt();
      } else if (random < 0.7) {
        prompt = middlePercentagePrompt();
      } else {
        prompt = highPercentagePrompt();
      }
      break;
    case QuestionLevel.Year6:
      if (random < 0.4) {
        prompt = middlePercentagePrompt();
      } else {
        prompt = highPercentagePrompt();
      }
      break;
    default:
      prompt = highPercentagePrompt();
      break;
  }

  return [
    { role: "system", content: "You are a math teacher." },
    { role: "user", content: prompt },
  ];
}

function lowPercentagePrompt() {
  return `
Give low level difficulty math percentage multi-choice question with the following conditions.
1. The percentage should be multiplier of 10% such as 20%, 50%... example question "Tom has 50 candies, he gave 10% of his candies to Jack. How many candies does Jack have?"
2. Work out the question.
3. There should be 4 options including the answer.
4. Make sure the correct answer is in the options.
5. ${template}
`;
}

function middlePercentagePrompt() {
  const random = Math.random();
  if (random < 0.33) {
    return `
Give an middle level difficulty math percentage multi-choice question with the following conditions.
1. Percentage should be in the question or answer.
2. Need two or three steps to workout the question. Example: "A store sells 50 cans of soda per day. Each can costs 0.75 dollars. If the store gives a discount of 10%, what is the total cost of 10 days of selling?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`;
  } else if (random < 0.66) {
    return `
Give an middle level difficulty math percentage multi-choice question with the following conditions.
1. Percentage should be in the question or answer.
2. Need two or three steps to workout the question. Example: "The cost of a laptop is $800. If the price is increased to $900, what is the percentage increase in price?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`;
  } else {
    return `
Give an middle level difficulty math percentage multi-choice question with the following conditions.
1. Percentage should be in the question or answer.
2. Need two or three steps to workout the question. Example: "A school has 500 students, and 60% of them are boys. How many girls are there in the school?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`;
  }
}

function highPercentagePrompt() {
  const random = Math.random();

  if (random < 0.33) {
    return `
Give a middle level difficulty math percentage multi-choice question with the following conditions.
1. Percentage should be in the question or answer.
2. Require three or more steps to workout the question. Example: "A company's revenue increased by 20% in the first year and decreased by 25% in the second year. If the company's revenue at the end of the second year was $500,000, what was the company's revenue at the beginning of the first year?"
3. Work out the question with calculator and formula.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`;
  } else if (random < 0.66) {
    return `
Give an middle level difficulty math percentage multi-choice question with the following conditions.
1. Percentage should be in the question or answer.
2. Need two or three steps to workout the question. Example: "A department store offers a 20% discount on all items for a sale. A customer buys a shirt that is on sale for $48 after the discount. If the customer paid $7.68 in sales tax, what was the original price of the shirt before the sale?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`;
  } else {
    return `
Give an middle level difficulty math percentage multi-choice question with the following conditions.
1. Percentage should be in the question or answer.
2. Need two or three steps to workout the question. Example: "A company has a profit margin of 25%. If the company's revenue is $800,000, what is the company's net profit after taxes if the tax rate is 30%?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`;
  }
}
