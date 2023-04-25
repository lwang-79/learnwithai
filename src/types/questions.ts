import { QuestionSet, Test, User } from "@/models";
import { DataStore } from "aws-amplify";
import { 
  AQuAQuestion, 
  CompetitionQuestion, 
  GSM8KQuestion, 
  MathQAQuestion, 
  QuestionCategory, 
  QuestionLevel, 
  QuestionSet as LocalQuestionSet,
  QuestionType 
} from "./types";

export const saveTest = async (
  userId: string,
  duration: number,
  questionSets: LocalQuestionSet[]
) => {
  const user = await DataStore.query(User, userId);

  if (!user) throw new Error('User is not found');

  let correct = 0;
  let wrong = 0;

  for (const qs of questionSets) {
    const correctCount = qs.answer === qs.selected ? 1 : 0;
    const wrongCount = qs.answer === qs.selected ? 0 : 1;

    correct += correctCount;
    wrong += wrongCount;
  }

  const test = new Test({
    category: QuestionCategory.Math,
    dateTime: (new Date()).toISOString(),
    duration: duration,
    total: correct + wrong,
    wrong: wrong,
    correct: correct,
    questionSets: questionSets
  });

  await DataStore.save(test);

}

export const addNewMathQuestions = async (
  userId: string,
  isTest: boolean,
  questionSets: LocalQuestionSet[]
) => {

  const user = await DataStore.query(User, userId);

  if (!user) throw new Error('User is not found');

  let correct = 0;
  let wrong = 0;

  for (const qs of questionSets) {
    const correctCount = qs.answer === qs.selected ? 1 : 0;
    const wrongCount = qs.answer === qs.selected ? 0 : 1;

    const questionSet = new QuestionSet({
      question: qs.question,
      options: qs.options,
      answer: qs.answer,
      workout: qs.workout,
      type: qs.type,
      category: qs.category,
      level: qs.level,
      concept: qs.concept,
      correctCount: correctCount,
      wrongCount: wrongCount,
      badCount: qs.isBad ? 1 : 0
    });

    correct += correctCount;
    wrong += wrongCount;

    await DataStore.save(questionSet);

  }

  if (isTest) {
    const test = new Test({
      category: QuestionCategory.Math,
      dateTime: (new Date()).toISOString(),
      total: correct + wrong,
      wrong: wrong,
      correct: correct,
      questionSets: questionSets
    });

    await DataStore.save(test);
  }

}

export const getQuestionsFromDataset = async (dataset: QuestionLevel, num: number): Promise<LocalQuestionSet[]> => {
  const response = await fetch(`/api/math/${dataset.toLowerCase()}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: num,
    }),
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw data.error || new Error(`Request failed with status ${response.status}`);
  }

  let questionSets: LocalQuestionSet[] = [];

  if (dataset === QuestionLevel.AQuA) {
    const questions = data.result as AQuAQuestion[];

    for (const q of questions) {
      const options = [];
  
      for (const option of q.options) {
        options.push(option.split(')')[1].trim());
      }
  
      questionSets.push({
        type: QuestionType.MultiChoice,
        category: QuestionCategory.Math,
        level: QuestionLevel.AQuA,
        concept: '',
        question: q.question,
        options: options,
        answer: q.correct,
        selected: '',
        workout: q.rationale,
        isBad: false,
        isTarget: false
      })
    }
  } else if (dataset === QuestionLevel.MathQA) {
    const questions = data.result as MathQAQuestion[];

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
        level: QuestionLevel.MathQA,
        concept: q.category,
        question: q.Problem,
        options: options,
        answer: q.correct.trim().toUpperCase(),
        selected: '',
        workout: q.Rationale,
        isBad: false,
        isTarget: false
      })
    } 
  } else if (dataset === QuestionLevel.GSM8K) {
    const questions = data.result as GSM8KQuestion[];

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
  
      // for (let i = 0; i < 5; i++) {
      //   if (i === randomIndex) {
      //     options.push(answer);
      //   } else {
      //     const a = Number(answer);
      //     let answerValue = 0;
      //     if (a < 10) {
      //       do {
      //         const random = Math.random() * 2 * a - a;
      //         if (a < 2) {
      //           answerValue = Number((a + random).toFixed(2));
      //         } {
      //           const l = getDecimalDigitLength(a);
      //           answerValue = Number((a + random).toFixed(l));
      //         }
      //       } while (answerValue === a)
      //     } else {
      //       do {
      //         const random = Math.floor(Math.random() * 2 * a) - a;
      //         answerValue = a + random;
      //       } while (answerValue === a)          
      //     }
          
      //     options.push(answerValue.toString());
      //   }
      // }

      questionSets.push({
        type: QuestionType.MultiChoice,
        category: QuestionCategory.Math,
        level: QuestionLevel.GSM8K,
        concept: '',
        question: q.question,
        options: options,
        answer: answerIndex,
        selected: '',
        workout: q.answer,
        isBad: false,
        isTarget: false
      })
    }
  }

  return questionSets;
}

export const getQuestionsFromCompetition = async (num: number, level: QuestionLevel) => {
  const response = await fetch(`/api/math/competition`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: num,
      level: level
    }),
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw data.error || new Error(`Request failed with status ${response.status}`);
  }

  let questionSets: LocalQuestionSet[] = [];
  const questions = data.result as CompetitionQuestion[];

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
      isTarget: false
    })
  }

  return questionSets;
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