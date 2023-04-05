import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

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

  const question = req.body.question as string;
  if (!question) {
    res.status(400).json({
      error: {
        message: "Please send valid question.",
      }
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'You are a math teacher.' },
        { role: 'user', content: question }
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
  questions: string[], 
) {
  let prompt = `Please answer the following ${questions.length} questions one by one 
    only using character "A" to "D" from each questions' "Options", 
    the example answer: Q1: A, Q2: C ... """
    `;

  for (const question of questions) {
    prompt += `question`;
  }

  console.log(prompt);

  return prompt;
}
