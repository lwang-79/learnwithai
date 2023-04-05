import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'
import { EssayTopic, EssayType } from "@/types/types";

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
  const prompt = req.body.prompt || '';
  const essay = req.body.essay || '';
  if (
    prompt.trim().length === 0 ||
    essay.trim().length === 0
  ) {
    res.status(400).json({
      error: {
        message: "Please enter a valid value",
      }
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are an English writing teacher.' },
        { role: 'user', 
          content: generatePrompt(
            type == EssayType.Persuasive ? 'essay' : 'creative writing',
            prompt, 
            essay
          ) 
        }
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
  type: string,
  prompt: string,
  essay: string, 
) {

  const p = `
  Evaluate a student's ${type}
  1. Consider the following facts "Knowledge, understanding and control", "Response to prompt", "Use of evidence", "Structure of response" and "Spelling and Punctuation".
  2. Give a score from 0 to 100 according to your evaluation.
  3. Mark some good sentences and bad sentences.
  4. Give comments on the thing doing well and things that need to improve.
  
  Essay prompt:
  [${prompt}]
  Student's Essay:
  [${essay}]
  `;

  console.log(p);
  return p;
}
