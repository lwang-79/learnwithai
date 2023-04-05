import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'
import { EssayTopic, EssayType, QuestionLevel } from "@/types/types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const type = req.body.type || '';
  const topic = req.body.topic || '';
  const level = req.body.level || '';
  if (
    type.trim().length === 0 ||
    topic.trim().length === 0 ||
    level.trim().length === 0
  ) {
    res.status(400).json({
      error: {
        message: "Please enter a valid value",
      }
    });
    return;
  }

  // res.status(200).json({ result: mockData });
  // return;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are an English writing teacher.' },
        { role: 'user', content: generatePrompt(type, topic, level) }
      ],
      temperature: 1,
      max_tokens:1000
    });
    res.status(200).json({ result: completion.data.choices[0].message?.content });
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(
  type: EssayType,
  topic: EssayTopic, 
  level: QuestionLevel,
) {

  let prompt = '';
  if (
    type == EssayType.Narrative
    // &&
    // [QuestionLevel.Year1, QuestionLevel.Year2, QuestionLevel.Year3].includes(level)
  ) {
    prompt = `
    Give a creative writing prompt for a ${level} level student.
    `;
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

  console.log(prompt);
  return prompt;
}

const mockData = `
Text: "The Art of Persuasion" by Jay Heinrichs is a book that teaches readers the principles of persuasive communication. The author emphasizes the importance of understanding your audience and tailoring your message to their needs and interests. He also stresses the power of storytelling and using vivid imagery to make your message more memorable. Heinrichs provides practical tips for structuring your argument and anticipating counterarguments. He also warns against using logical fallacies and manipulative tactics in your persuasion efforts. Overall, "The Art of Persuasion" is a valuable resource for anyone looking to improve their communication skills and become more effective in convincing others.

Prompt: In what ways can persuasive communication skills be beneficial for individuals in society? Provide examples of how persuasive communication has been used to bring about positive change in history. Additionally, discuss the ethical considerations that should be taken into account when using persuasive techniques.
`