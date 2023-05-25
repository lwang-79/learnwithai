import gsm8k from '@/gsm8k.json'
import { GSM8KQuestion } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';

const questions = gsm8k as GSM8KQuestion[];

export default async function gsm8kHandler(req: NextApiRequest, res: NextApiResponse) {

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
