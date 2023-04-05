// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, QuestionSet, QuestionRun, Test, Essay, Membership, Subscriptions, Quota, Statistic, LocalQuestionSet } = initSchema(schema);

export {
  User,
  QuestionSet,
  QuestionRun,
  Test,
  Essay,
  Membership,
  Subscriptions,
  Quota,
  Statistic,
  LocalQuestionSet
};