import mathqa from '../models/mathqa.json';
import gsm8k from '../models/gsm8k.json';
import competition from '../models/competition.json';
import { APIResponse, CompetitionQuestion, GSM8KQuestion, MathQAQuestion, QuestionLevel } from '../types';
import { chatCompletion } from './chat';
import { ChatCompletionRequestMessage } from 'openai';
import { generateChatMessages } from '../prompts/math';

export const getDatasetQuestions = (
  dataset: any,
  questionCount: string
): APIResponse => {
  const count = Number(questionCount);
  const ds = dataset === QuestionLevel.MathQA ? 
    QuestionLevel.MathQA : 
    dataset === QuestionLevel.GSM8K ? 
    QuestionLevel.GSM8K : 
    Object.values(QuestionLevel).indexOf(dataset) > -1 ?
    dataset as QuestionLevel : '';

  if (isNaN(count) || count <= 0 || ds.length === 0) {
    return {
      statusCode: 400,
      error: 'Please enter a valid value'
    }
  }

  const questions = ds === QuestionLevel.MathQA ? 
    mathqa as MathQAQuestion[] :
    ds === QuestionLevel.GSM8K ?
    gsm8k as GSM8KQuestion[] :
    (competition as CompetitionQuestion[]).filter(question => question.level === ds);

  const randomIndex = Math.floor(Math.random() * (questions.length - count));

  return {
    statusCode: 200,
    data: questions.slice(randomIndex, randomIndex + count)
  }
}

export const generateMathQuestion = async (
  category: any,
  type: any,
  level: any,
  concept: any,
): Promise<APIResponse> => {
  if (
    category.trim().length === 0 ||
    type.trim().length === 0 ||
    level.trim().length === 0 ||
    concept.trim().length === 0
  ) {
    return {
      statusCode: 400,
      error: 'Please enter a valid value'
    }
  }

  const messages = generateChatMessages(level, concept);

  return chatCompletion(messages);
}

export const generateMathAnswer = async (
  question: string,
): Promise<APIResponse> => {
  if (question.trim().length === 0) {
    return {
      statusCode: 400,
      error: 'Please enter a valid question'
    }
  }

  const messages: ChatCompletionRequestMessage[] = [
    { role: 'system', content: 'You are a math teacher.' },
    { role: 'user', content: question }
  ];

  return chatCompletion(messages);
}

