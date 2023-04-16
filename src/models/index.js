// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, QuestionSet, Test, Essay, Membership, Subscriptions, Quota, Statistic, GameData, LocalQuestionSet, LambdaResponse } = initSchema(schema);

export {
  User,
  QuestionSet,
  Test,
  Essay,
  Membership,
  Subscriptions,
  Quota,
  Statistic,
  GameData,
  LocalQuestionSet,
  LambdaResponse
};