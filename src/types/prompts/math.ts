import { MathConcept, QuestionLevel } from "../types";
import { generateArithmeticPrompt } from "./arithmetic";
import { generateDecimalsPrompt } from "./decimals";

export function generateChatMessages(
  level: QuestionLevel,
  concept: MathConcept
) {

  switch (concept) {
    case MathConcept.Arithmetic:
      return generateArithmeticPrompt(level);
    case MathConcept.Decimals:
      return generateDecimalsPrompt(level);
    default:
      return [{role: 'system', content: 'You are a math teacher.'},]
  }
}

export const template = `
  Desired template:
  Question: <>
  Workout:
  Method1: <>
  Options:
  A: <option>
  B: <option>
  C: <option>
  D: <option>
  Answer: <A, B, C or D>
  `
