import { ChatCompletionRequestMessage } from "openai";
import { MathConcept, QuestionLevel } from "../types";
import { generateArithmeticPrompt } from "./arithmetic";
import { generateDecimalsPrompt } from "./decimals";
import { generateFractionsPrompt } from "./fractions";
import { generatePercentagePrompt } from "./percentage";
import { generateRatioPrompt } from "./ratio";
import { generateTimeJourneyPrompt } from "./time_journey";

export function generateChatMessages(
  level: QuestionLevel,
  concept: MathConcept
):ChatCompletionRequestMessage[] {

  switch (concept) {
    case MathConcept.Arithmetic:
      return generateArithmeticPrompt(level);
    case MathConcept.Decimals:
      return generateDecimalsPrompt(level);
    case MathConcept.Percentage:
      return generatePercentagePrompt(level);
    case MathConcept.Ratio:
      return generateRatioPrompt(level);
    case MathConcept.Fractions:
      return generateFractionsPrompt(level);
    case MathConcept.TimeJourney:
      return generateTimeJourneyPrompt(level);
    default:
      return [{role: 'system', content: 'You are a math teacher.'},]
  }
}

export const template = 
`
Use the desired template:
Question: [Insert question text here]
Workout: [Detailed steps to solve the question]
Options:
A: [Option A]
B: [Option B]
C: [Option C]
D: [Option D]
Answer: [A, B, C, or D]
`
// `
// Desired template:
// Question: <>
// Workout:
// Method1: <>
// Options:
// A: <option>
// B: <option>
// C: <option>
// D: <option>
// Answer: <A, B, C or D>
//   `

export const mathTemplate = (
  level: string,
  concept: string,
  condition: string,
  question: string,
  answer: string,
  workout: string,
  options: string,
): ChatCompletionRequestMessage[] => {
  return [
    { role: 'system', content: 'You are a math teacher.' },
    { role: 'user', content: `
Generate a ${level} difficulty math ${concept} question with the following conditions:

${condition}
` 
    },
    { role: 'assistant', content: `Question: ${question}` },
    { role: 'user', content: 'Solve the above question.' },
    { role: 'assistant', content: `
Answer: ${answer}
Workout: 
${workout}
` 
    },
    { role: 'user', content: `Use the above question, answer and workout to form a multi-choice question. Use the desired template:

Question: [Insert question text here]
Workout: [Explain the method to solve the question]
Options:
A: [Option A]
B: [Option B]
C: [Option C]
D: [Option D]
Answer: [A, B, C, or D]
`
    },
    { role: 'assistant', content: `Question: ${question}

Workout: ${workout}

Options:
${options}

Answer: C
`
    },
    { role: 'user', content: `Follow the above process to generate another ${concept} multi-choice math question with the same condition.` },
  ]
}
