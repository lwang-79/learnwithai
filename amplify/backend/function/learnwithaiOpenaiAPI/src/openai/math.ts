import mathqa from '../models/mathqa.json';
import gsm8k from '../models/gsm8k.json';
import hendrycks from '../models/hendrycks.json';
import competition from '../models/competition.json';
import { 
  APIResponse, 
  CompetitionQuestion, 
  GSM8KQuestion, 
  HendrycksQuestion, 
  MathQAQuestion, 
  QuestionCategory, 
  QuestionLevel, 
  QuestionSet, 
  QuestionSource, 
  QuestionType 
} from '../types';
import { chatCompletion } from './chat';
import { ChatCompletionFunctions, ChatCompletionRequestMessage } from 'openai';
import { generateChatMessages } from '../prompts/math';

export const getDatasetQuestions = async (
  dataset: any,
  questionCount: string,
  level: any,
  concept: any,
): Promise<APIResponse> => {
  const count = Number(questionCount);
  const ds = dataset === QuestionSource.MathQA ? 
    QuestionSource.MathQA : 
    dataset === QuestionSource.GSM8K ? 
    QuestionSource.GSM8K : 
    dataset === QuestionSource.Competition ?
    QuestionSource.Competition : 
    dataset === QuestionSource.Hendrycks ?
    QuestionSource.Hendrycks :'';

  if (isNaN(count) || count <= 0 || ds.length === 0) {
    return {
      statusCode: 400,
      error: 'Please enter a valid value'
    }
  }

  if (
    ds === QuestionSource.Competition &&
    Object.values(QuestionLevel).slice(12, 17).indexOf(level) === -1
  ) {
    return {
      statusCode: 400,
      error: 'Please enter a valid value'
    }
  }

  const questions = ds === QuestionSource.MathQA ? 
    mathqa as MathQAQuestion[] :
    ds === QuestionSource.GSM8K ?
    gsm8k as GSM8KQuestion[] :
    ds === QuestionSource.Competition ?
    (competition as CompetitionQuestion[]).filter(question => question.level === level):
    ds === QuestionSource.Hendrycks ?
    (hendrycks as HendrycksQuestion[]).filter(
      question => 
      question.level === level && 
      concept === question.type
    ) : [];

  const randomIndex = Math.floor(Math.random() * (questions.length - count));

  if (ds === QuestionSource.Hendrycks) {
    const questionSets = await generateHendrycksQuestionSets(
      questions.slice(randomIndex, randomIndex + count) as HendrycksQuestion[]
    );

    if (questionSets.length === 0) {
      return {
        statusCode: 500,
        error: 'Failed to generate question sets.'
      }
    }

    return {
      statusCode: 200,
      data: questionSets
    }
  }

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

  const functions: ChatCompletionFunctions[] = [{
    name: 'generateMultiChoiceMathQuestion',
    parameters: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: 'The generated math question.'
        },
        options: {
          type: 'array',
          items: { 
            type: 'string',
            description: 'raw option without indicator (A, B, C, D)'
          },
          description: 'The generated four options including the answer.',
        },
        answer: {
          type: 'string',
          description: `The correct answer's indicator. If the answer is the first option, indicator is A, last is D.`,
          enum: ['A', 'B', 'C', 'D']
        },
        workout: {
          type: 'string',
          description: 'The workout of the correct answer.'
        }
      },
      required: ['question', 'options', 'answer', 'workout']
    }
  }];

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

const generateMathOptions = async (
  question: string,
  solution: string
): Promise<APIResponse> => {
  const prompt = `
  Based on the given mathematical question and solution, please generate multiple-choice answer options. Randomly place the correct answer, which is the value or expression enclosed within the LaTeX notation "\\boxed{}", among the four options. Assign capital letters followed by a colon to each option. Don't use "\\boxed{}" notation or other indicator for the answer in the options. Finally, indicate the correct answer's letter in the "Answer" section.

  Question: "${question}"
  Solution: "${solution}"
  
  Desired template:
  A: <>
  B: <>
  C: <>
  D: <>
  Answer: <>
`;

  const messages: ChatCompletionRequestMessage[] = [
    { role: 'system', content: 'You are a math teacher.' },
    { role: 'user', content: prompt }
  ];

  return chatCompletion(messages);
}

const generateHendrycksQuestionSets = async (
  questions: HendrycksQuestion[]
): Promise<QuestionSet[]> => {
  let questionSets: QuestionSet[] = [];

  for (const question of questions) {
    let count = 0;
    let done = false;
    while (count < 3 && !done) {
      try {
        const response = await generateMathOptions(question.problem, question.solution);
        if (response.statusCode !== 200) {
          console.error(`Failed to generate options`);
          count ++;
          continue;
        }
  
        const optionsString = response.data.split('Answer:')[0].trim();
        const answer = response.data.split('Answer:')[1].trim();
  
        const options: string[] = optionsString.split('\n').map(line => line.split(':')[1].trim());
        if (options.length !== 4 || answer.length !== 1) {
          console.error(`Can't parse the options or answer`);
          count ++;
          continue;
        }
  
        questionSets.push({
          type: QuestionType.MultiChoice,
          category: QuestionCategory.Math,
          level: question.level,
          concept: question.type,
          question: question.problem,
          options: options,
          answer: answer,
          selected: '',
          workout: question.solution,
          isBad: false,
          isTarget: false,
          isMarked: false
        });
  
        done = true;
  
      } catch (error) {
        console.error(error);
        count ++;
        continue;        
      }
    }
  }

  return questionSets;
}