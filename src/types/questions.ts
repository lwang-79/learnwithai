import { QuestionSet, Test, User } from "@/models";
import { DataStore } from "aws-amplify";
import { 
  APIName,
  APIOperation,
  AQuAQuestion,
  CompetitionQuestion, 
  GSM8KQuestion, 
  HendrycksConcept, 
  MathConcept, 
  MathQAQuestion, 
  QuestionCategory, 
  QuestionLevel, 
  QuestionSet as LocalQuestionSet,
  QuestionSource,
  QuestionType, 
  StemConcept,
  StemQuestion
} from "./types";
import { APIPost } from "./utils";

export const saveTest = async (
  test: Test,
  duration: number,
  questionSets: LocalQuestionSet[],
  user: User
) => {
  // if test exists grab the latest version
  // if new test verify the quota
  const latestTest = await DataStore.query(Test, test.id);
  if (!latestTest) {
    const totalTestCount = (await DataStore.query(Test)).length;
    if (totalTestCount >= user.quota!.savedTests) {
      return `You have reached the maximum SavedTests quota ${user.quota!.savedTests}. This test is not saved, please delete some tests or upgrade your plan.`
    }
  }

  const origin = latestTest?? test;
  
  let correct = 0;
  let wrong = 0;

  for (const qs of questionSets) {
    const correctCount = qs.answer === qs.selected ? 1 : 0;
    const wrongCount = qs.answer === qs.selected ? 0 : 1;

    correct += correctCount;
    wrong += wrongCount;
  }

  const updatedTest = Test.copyOf(origin, updated => {
    updated.duration = duration;
    updated.total = correct + wrong;
    updated.wrong = wrong;
    updated.correct = correct;
    updated.questionSets = questionSets;
  });

  await DataStore.save(updatedTest);

}

export const addMyMathQuestion = async (
  user: User,
  questionSet: LocalQuestionSet,
  testId?: string,
  indexInTest?: number,
) => {
  const savedQuestionCount = (await DataStore.query(QuestionSet)).length;

  if (savedQuestionCount >= user.quota!.savedQuestions) {
    return `You have reached the maximum SavedQuestions quota ${user.quota!.savedQuestions}. This question is not added, please remove some questions or upgrade your plan.`
  }

  if (testId && indexInTest) {
    const questionSets = await DataStore.query(QuestionSet);

    if (
      questionSets.length > 0 &&
      questionSets.filter(q => q.testId === testId && q.indexInTest === indexInTest).length > 0
    ) {
      throw new Error('You have already saved this question.')
    }
  }


  const newQuestionSet = new QuestionSet({
    question: questionSet.question,
    options: questionSet.options,
    answer: questionSet.answer,
    workout: questionSet.workout,
    type: questionSet.type,
    category: questionSet.category,
    level: questionSet.level,
    concept: questionSet.concept,
    testId: testId,
    indexInTest: indexInTest
  });

  await DataStore.save(newQuestionSet);

}

export const getQuestionsFromDataset = async (
  apiName: APIName,
  dataset: QuestionSource, 
  num: number,
  level: QuestionLevel,
  concept?: MathConcept|HendrycksConcept,
): Promise<LocalQuestionSet[]> => {
  const request = {
    body: {
      operation: APIOperation.MathDataset,
      dataset: dataset,
      questionCount: num,
      level: level,
      concept: concept
    }
  };

  const body = await APIPost(apiName, '/', request);

  if (!body.data) {
    return [];
  }

  if (dataset === QuestionSource.MathQA) {
    return parseMathQAQuestions(body.data as MathQAQuestion[]);
  } else if (dataset === QuestionSource.GSM8K) {
    return parseGSM8KQuestions(body.data as GSM8KQuestion[]);
  } else if (dataset === QuestionSource.Competition) {
    return parseCompetitionQuestions(body.data as CompetitionQuestion[], level);
  } else if (dataset === QuestionSource.Hendrycks) {
    return body.data as LocalQuestionSet[];
  }

  return [];
}

export const generateQuestionSet = async (
  apiName: APIName,
  concept: MathConcept,
  category: QuestionCategory,
  type: QuestionType,
  level: QuestionLevel
): Promise<LocalQuestionSet | undefined> => {
  // let c = concepts[Math.floor(Math.random() * concepts.length)];
  const request = {
    body: {
      operation: APIOperation.MathQuestion,
      category: category,
      type: type,
      level: level,
      concept: concept
    }
  };

  const body = await APIPost(apiName, '/', request);

  if (!body.data) {
    return undefined;
  }

  const questionString = body.data as string;
  if (
    !questionString.includes('Question:') ||
    !questionString.includes('Workout:') ||
    !questionString.includes('Options:') ||
    !questionString.includes('Answer:')
  ) throw new Error('Bad return.');

  // get question
  const question = questionString.split('Workout:')[0].replace('Question:','').trim();

  // get workout
  let regex = /(?<=Workout:).*?(?=Options:)/s;
  let matches = questionString.match(regex);

  if (!matches) throw new Error('No workout.');
  const workout = matches[0];

  // get answer
  const answer = questionString.split("Answer:")[1].trim()[0].toUpperCase();
  if (!['A', 'B', 'C', 'D'].includes(answer)) throw new Error('Answer in wrong format');

  // get options
  regex = /^[A-D]:\s(.+)$/gm;
  matches = questionString.match(regex);

  if (!matches) throw new Error('No options.');

  const options = matches.map(match => match.slice(3));

  const questionSet: LocalQuestionSet = {
    type: QuestionType.MultiChoice,
    category: QuestionCategory.Math,
    level: level,
    concept: concept,
    question: question,
    options: options,
    answer: answer,
    selected: '',
    workout: workout,
    isBad: false,
    isTarget: false,
    isMarked: false
  };

  return questionSet;
}

export const getQuestionAnswer = async (
  apiName: APIName,
  question: string
): Promise<string> => {
  const request = {
    body: {
      operation: APIOperation.MathAnswer,
      question: question
    }
  };

  const body =await APIPost(apiName, '/', request);

  if (!body.data) {
    return '';
  }

  return body.data as string;
}

const getThresholdValue = (num: number) => {
  let threshold = 10;
  while (threshold <= num) {
    threshold *= 10;
  }
  return threshold;
}

const getDecimalDigitLength = (num: number) => {
  const str = num.toString();
  const decimalIndex = str.indexOf('.');
  if (decimalIndex === -1) {
    return 0; // Number has no decimal point
  }
  if (decimalIndex === str.length - 1) {
    return 0; // Number ends with decimal point
  }
  return str.split('.')[1].length;
}

const replaceDigitsWithRandomOneByOne = (str: string) => {
  return str
    .split('')
    .map((char) => (/\d/.test(char) ? Math.floor(Math.random() * 9) + 1 : char))
    .join('');
}

export const getStemQuestionsFromDataset = async (
  apiName: APIName,
  concepts: StemConcept[],
  level: 'High School' | 'College', 
  num: number
): Promise<LocalQuestionSet[]> => {
  const request = {
    body: {
      operation: APIOperation.StemQuestion,
      concepts: concepts,
      level: level,
      questionCount: num,
    }
  };

  const body = await APIPost(apiName, '/', request);

  if (!body.data) {
    return [];
  }

  const questions = body.data as StemQuestion[];

  let questionSets: LocalQuestionSet[] = [];

  for (const q of questions) {
    const questionSet: LocalQuestionSet = {
      ...q,
      type: QuestionType.MultiChoice,
      category: QuestionCategory.Stem,
      level: level,
      selected: '',
      workout: '',
      isBad: false,
      isTarget: false,
      isMarked: false
    }
    questionSets.push(questionSet);
  }

  return questionSets;
}

const parseMathQAQuestions = (questions: MathQAQuestion[]): LocalQuestionSet[] => {
  let questionSets: LocalQuestionSet[] = [];

  for (const q of questions) {

    let qOptions: string[] = [];
    if (q.options[0]==='[') {
      qOptions = JSON.parse(q.options.replace(/'/g, "\"")) as string[];
    } else {
      const regex = /[a-e]\s\)(.+?)(?=[a-e]\s\)|$)/gm;
      const matches = q.options.match(regex);
      if (!matches) throw Error(`Failed to parse the options: ${q.options}`)
      qOptions = matches;// qOptions = q.options.split(',');
    }

    const options = [];

    for (const option of qOptions) {
      options.push(option.split(')')[1].replace(',','').trim());
    }

    questionSets.push({
      type: QuestionType.MultiChoice,
      category: QuestionCategory.Math,
      level: QuestionSource.MathQA,
      concept: q.category,
      question: q.Problem,
      options: options,
      answer: q.correct.trim().toUpperCase(),
      selected: '',
      workout: q.Rationale,
      isBad: false,
      isTarget: false,
      isMarked: false
    });
  } 

  return questionSets;
}

const parseGSM8KQuestions = (questions: GSM8KQuestion[]): LocalQuestionSet[] => {
  let questionSets: LocalQuestionSet[] = [];

  for (const q of questions) {
    const answer = q.answer.split('####')[1].trim()
    const randomIndex = Math.floor(Math.random() * 5);
    const answerIndex = String.fromCharCode(randomIndex + 65);
    let options: string[] = [];

    for (let i = 0; i < 5; i++) {
      if (i === randomIndex) {
        options.push(answer);
      } else {
        let option = '';
        
        if (/\d/.test(answer)) {
          do {
            option = replaceDigitsWithRandomOneByOne(answer);
          } while(options.includes(option));
        }
  
        options.push(option);
      }
    }

    questionSets.push({
      type: QuestionType.MultiChoice,
      category: QuestionCategory.Math,
      level: QuestionSource.GSM8K,
      concept: '',
      question: q.question,
      options: options,
      answer: answerIndex,
      selected: '',
      workout: q.answer,
      isBad: false,
      isTarget: false,
      isMarked: false
    });
  }

  return questionSets;
}

const parseAQuAQuestions = (questions: AQuAQuestion[]): LocalQuestionSet[] => {
  let questionSets: LocalQuestionSet[] = [];

  for (const q of questions) {
    const options = [];

    for (const option of q.options) {
      options.push(option.split(')')[1].trim());
    }

    questionSets.push({
      type: QuestionType.MultiChoice,
      category: QuestionCategory.Math,
      level: '', //QuestionSource.AQuA,
      concept: '',
      question: q.question,
      options: options,
      answer: q.correct,
      selected: '',
      workout: q.rationale,
      isBad: false,
      isTarget: false,
      isMarked: false
    })
  }

  return questionSets;
}


const parseCompetitionQuestions = (questions: CompetitionQuestion[], level: string): LocalQuestionSet[] => {
  let questionSets: LocalQuestionSet[] = [];

  for (const q of questions) {
    let regex = /boxed\{((?:[^{}]+|{(?:[^{}]+|{[^{}]*})*})*)\}/;
    let match = q.solution.match(regex);

    if (!match) throw Error(`Failed to parse the solution: ${q.solution}`);

    const answer = `$${match[1]}$`;

    const randomIndex = Math.floor(Math.random() * 4);
    const answerIndex = String.fromCharCode(randomIndex + 65);
    let options: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (i === randomIndex) {
        options.push(answer);
      } else {
        let option = '';

        if (/\d/.test(answer)) {
          do {
            option = replaceDigitsWithRandomOneByOne(answer);
          } while(options.includes(option));
        }

        options.push(option);
      }
    }


    questionSets.push({
      type: QuestionType.MultiChoice,
      category: QuestionCategory.Math,
      level: level,
      concept: q.type,
      question: q.problem,
      options: options,
      answer: answerIndex,
      selected: '',
      workout: q.solution,
      isBad: false,
      isTarget: false,
      isMarked: false
    });
  }

  return questionSets;
}