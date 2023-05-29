import { QuestionLevel } from "@/types/types";
import { ChatCompletionRequestMessage } from "openai";
import { template } from "./math";


export function generateRatioPrompt(
  level: QuestionLevel
): ChatCompletionRequestMessage[] {
  const random = Math.random();

  let prompt = '';
  switch (level) {
    case QuestionLevel.Year1:
    case QuestionLevel.Year2:
    case QuestionLevel.Year3:
    case QuestionLevel.Year4:
      prompt = lowRatioPrompt();
      break;
    case QuestionLevel.Year5:
      if (random < 0.4) {
        prompt = lowRatioPrompt();
      } else {
        prompt = middleRatioPrompt();
      } 
      break;
    case QuestionLevel.Year6:
      if (random < 0.2) {
        prompt = lowRatioPrompt();
      } else if (random < 0.8) {
        prompt = middleRatioPrompt();
      } else {
        prompt = highRatioPrompt();
      }
      break;
    default:
      prompt = highRatioPrompt();
      break;
  }

  console.log(prompt)

  return [
    { role: 'system', content: 'You are a math teacher.' },
    { role: 'user', content: prompt }
  ]
}

function lowRatioPrompt() {
  const random = Math.random();
  if (random < 0.33) {
    return `
${workoutProcess}
Then give a low level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Example: "The ratio of boys to girls in a classroom is 3:2. If there are 15 girls in the class, how many boys are there?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  } else if (random < 0.66) {
    return `
${workoutProcess}
Then give a low level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Example: "The ratio of the ages of a grandfather and his grandson is 7:2. If the grandson is 8 years old, what is the age of the grandfather?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  } else {
    return `
${workoutProcess}
Then give a low level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Need two or three steps to workout the question. Example: "The ratio of the length to the width of a rectangle is 3:2. If the width is 6 cm, what is the length of the rectangle?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  }
}

function middleRatioPrompt() {
  const random = Math.random();
  if (random < 0.33) {
    return `
${workoutProcess}
Then give a middle level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Example: "The ratio of the prices of two products is 4:5. If the price of the first product is increased by 20% and the price of the second product is decreased by 20%, what is the new ratio of their prices?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  } else if (random < 0.66) {
    return `
${workoutProcess}
Then give a middle level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Example: "In a triangle ABC, the ratio of the lengths of the sides AB to BC to AC is 3:4:5. If the perimeter of the triangle is 24 units, what is the length of side AC?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  } else {
    return `
${workoutProcess}
Then give a middle level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Need two or three steps to workout the question. Example: "The ratio of the salaries of two employees is 3:4. If the difference between their salaries is $2000, what is the salary of the employee who earns more?"
3. Work out the question with calculator.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  }
}


function highRatioPrompt() {
  const random = Math.random();
  if (random < 0.33) {
    return `
${example}
Then give a high level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Example: "In a mixture of two liquids A and B, the ratio of A to B is 4:3. If 12 liters of liquid A is added to the mixture, the ratio of A to B becomes 8:5. How many liters of liquid B were in the mixture originally?"
3. Work out the question with calculator. Double check the answer.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  } else if (random < 0.66) {
    return `
${example}
Then give a high level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Example: "In a bag of candies, the ratio of the number of red candies to the number of green candies is 5:7. If 16 red candies are added to the bag, the ratio becomes 7:9. How many candies were in the bag originally?"
3. Work out the question with calculator. Double check the answer.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  } else {
    return `
${example}
Then give a high level difficulty math ratio multi-choice question with the following conditions.
1. Ratio should be in the question or answer.
2. Need two or three steps to workout the question. Example: "In a school, the ratio of the number of students who take Spanish to the number of students who take French to the number of students who take German is 2:3:4. If there are 120 students who take French, how many students are there in the school?"
3. Work out the question with calculator. Double check the answer.
4. There should be 4 options including the answer.
5. Make sure the correct answer is in the options.
6. ${template}
`
  }
}

const workoutProcess = `
The general process to solve a ratio question is as follows:
1. Identify the quantities or variables that are being compared in the ratio. For example, if the ratio is "3:5", then we know that there are two quantities or variables being compared.
2. Determine the relationship between the quantities or variables. For example, if the ratio is "3:5", then we know that for every 3 of the first quantity, there are 5 of the second quantity.
3. Use algebra to set up an equation that represents the relationship between the quantities or variables. For example, if we know that the ratio of boys to girls is 3:5, and we know that there are 24 girls, we can set up the equation:
3/5 = x/24
where x is the number of boys.
4. Solve the equation for the unknown variable. In the example above, we would cross-multiply and solve for x.
5. Check your answer to make sure it makes sense. In the example above, we found that there are 14 boys. We should check that this makes sense in the context of the problem, and that it satisfies any other given conditions.
`
const example = `
Here is an example question and workout:
###
In a mixture of two liquids A and B, the ratio of A to B is 3:5. If 30 liters of liquid A is added to the mixture, the ratio of A to B becomes 2:3. How many liters of liquid B were in the mixture originally?
Let's say there were 3x liters of liquid A and 5x liters of liquid B in the original mixture.
So, the total amount of liquid in the mixture was 3x + 5x = 8x liters.
After adding 30 liters of liquid A, the total amount of liquid A became 3x + 30 liters.
The new ratio of A to B is 2:3. This means that the amount of liquid A is 2/5 times the amount of liquid B.
We can write an equation to solve for x:
(3x + 30) / (5x) = 2/3
Cross-multiplying, we get:
9x + 90 = 10x
x = 90
So, the original mixture had 3x = 3 * 90 = 270 liters of liquid A and 5x = 5 * 90 = 450 liters of liquid B.
###
`