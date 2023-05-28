import mathqa from '@/mathqa.json'
import { APIResponse, MathQAQuestion } from '@/types/types';

export const getDataSetQuestions = (
  questionCount: string
): APIResponse => {
  const count = Number(questionCount);
  if (isNaN(count)) {
    return {
      statusCode: 400,
      error: 'Please enter a valid value'
    }
  }

  const questions = mathqa as MathQAQuestion[];

  const randomIndex = Math.floor(Math.random() * (questions.length - count));

  return {
    statusCode: 200,
    data: questions.slice(randomIndex, randomIndex + count)
  }
}
