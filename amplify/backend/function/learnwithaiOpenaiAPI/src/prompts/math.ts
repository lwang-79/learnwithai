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
