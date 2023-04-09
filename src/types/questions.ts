import { LocalQuestionSet, QuestionSet, Test, User } from "@/models";
import { DataStore } from "aws-amplify";
import { QuestionCategory } from "./types";

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

    // await DataStore.save(questionSet);

  }

  if (isTest) {
    const test = new Test({
      category: QuestionCategory.Math,
      DateTime: (new Date()).toISOString(),
      total: correct + wrong,
      wrong: wrong,
      correct: correct,
      questionSets: questionSets
    });

    await DataStore.save(test);
  }

}