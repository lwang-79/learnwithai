import competition from '@/competition.json'
import { CompetitionQuestion } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';

const questions = competition as CompetitionQuestion[];

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const num = req.body.number as number;
  const level = req.body.level as string;

  if (!num || !level) {
    res.status(400).json({
      error: {
        message: "Please enter a valid value",
      }
    });
    return;
  }

  const filteredQuestions = questions.filter(question => question.level === level);
  const randomIndex = Math.floor(Math.random() * (filteredQuestions.length - num));

  res.status(200).json({ result: filteredQuestions.slice(randomIndex, randomIndex + num) });
}
