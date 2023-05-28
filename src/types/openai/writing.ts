import { ChatCompletionRequestMessage } from "openai";
import { generateNarrativePrompt } from "../prompts/narrative";
import { APIResponse, EssayType } from "../types";
import { chatCompletion } from "./chat";

export const generateWritingPrompt = async (
  type: any,
  topic: any,
  level: any
):  Promise<APIResponse> => {
  if (
    type.trim().length === 0 ||
    topic.trim().length === 0 ||
    level.trim().length === 0
  ) {
    return {
      statusCode: 400,
      error: 'Please enter a valid value'
    }
  }

  let prompt = '';
  if (type == EssayType.Narrative) {
    prompt = generateNarrativePrompt(level);
  } else {
    prompt = `
    Give a famous word or story or some facts less than 100 words about ${topic}, 
    and then give a ${level} level ${type} essay prompt based on the material. 
    The student should be able to write an essay to this prompt with 400 words.
    `
  }

  prompt += `
  Desired format:
  Text: <>
  Prompt: <>
  `;

  const message: ChatCompletionRequestMessage[] = [
    { role: 'system', content: 'You are an English writing teacher.' },
    { role: 'user', content: prompt }
  ]
  return await chatCompletion(message);
}

export const generateWritingMark = async (
  level: any,
  type: any,
  prompt: any,
  essay: any,
): Promise<APIResponse> => {
  if (
    prompt.trim().length === 0 ||
    essay.trim().length === 0 ||
    level.trim().length === 0 ||
    type.trim().length === 0
  ) {
    return {
      statusCode: 400,
      error: 'Please enter a valid value'
    }
  }

  const content = `
  Evaluate a student's ${type} based on the student's level which is ${level}.
  1. Make sure to carefully read the prompt and student's writing in full before evaluating.
  2. The student must write an original narrative and cannot copy the prompt directly. Otherwise the score should be 0 and stop evaluating.
  3. Consider the following facts "Knowledge, understanding and control", "Response to prompt(copy prompt is not acceptable)", "Use of evidence", "Structure of response" and "Spelling and Punctuation".
  4. Give a score from 0 to 100 according to your evaluation.
  5. Mark the good sentences which increased the score and not good sentences which decreased the score.
  6. Give comments on the thing doing well and things that need to improve.
  
  ${type} prompt:
  [${prompt}]
  Student's ${type}:
  [${essay}]
  `;

  const message: ChatCompletionRequestMessage[] = [
    { role: 'system', content: 'You are an English writing teacher.' },
    { role: 'user', content: content }
  ];

  return await chatCompletion(message);
}

// const generatePrompt = (
//   type: EssayType,
//   topic: EssayTopic, 
//   level: QuestionLevel,
// ) => {

//   let prompt = '';
//   if (type == EssayType.Narrative) {
//     prompt = generateNarrativePrompt(level);
//   } else {
//     prompt = `
//     Give a famous word or story or some facts less than 100 words about ${topic}, 
//     and then give a ${level} level ${type} essay prompt based on the material. 
//     The student should be able to write an essay to this prompt with 400 words.
//     `
//   }

//   prompt += `
//   Desired format:
//   Text: <>
//   Prompt: <>
//   `;

//   console.log(prompt);
//   return prompt;
// }