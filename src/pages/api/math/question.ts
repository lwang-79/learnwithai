import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'
import { MathConcept, QuestionCategory, QuestionLevel, QuestionType } from "@/types/types";
import { getMessageByConcept } from "@/types/prompt";

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

  const category = req.body.category || '';
  const type = req.body.type || '';
  const level = req.body.level || '';
  const concept = req.body.concept || '';
  if (
    category.trim().length === 0 ||
    type.trim().length === 0 ||
    level.trim().length === 0 ||
    concept.trim().length === 0
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
        { role: 'system', content: 'You are a math teacher.' },
        { role: 'user', content: generatePrompt(category, type, level, concept) }
      ],
      temperature: 1,
      max_tokens:600
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
  category: QuestionCategory, 
  type: QuestionType,
  level: QuestionLevel,
  concept: MathConcept
) {
  const prompt = getMessageByConcept(concept, level, category);

  console.log(prompt);
  return prompt;
}

const mockData = `
Question: A cyclist travels a distance of 200 km at an average speed of 20 km/h. After taking a 2-hour break, the cyclist rides another 300 km at an average speed of 25 km/h. What is the total time taken for the entire trip in hours?
Workout: Total time taken for the entire trip = (time taken for first part of trip) + (time taken for second part of trip) + (break time)
= (200 km ÷ 20 km/h) + (300 km ÷ 25 km/h) + 2 hours
= 10 hours + 12 hours + 2 hours
= 24 hours
Options:
A: 20 hours
B: 24 hours
C: 22 hours
D: 26 hours
Answer: B
`