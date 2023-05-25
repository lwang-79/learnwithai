import mathqa from '@/mathqa.json'
import { MathQAQuestion } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';

const questions = mathqa as MathQAQuestion[];

export default async function mathqaHandler(req: NextApiRequest, res: NextApiResponse) {

  const num = req.body.number as number;
  if (!num) {
    res.status(400).json({
      error: {
        message: "Please enter a valid value",
      }
    });
    return;
  }

  const randomIndex = Math.floor(Math.random() * (questions.length - num));

  res.status(200).json({ result: questions.slice(randomIndex, randomIndex + num) });
}
