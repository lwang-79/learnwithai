// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationType = {
  "MONTHLY": "Monthly",
  "WEEKLY": "Weekly",
  "DAILY": "Daily",
  "INSTANT": "Instant"
};

const { User, QuestionSet, Test, Essay, Membership, Subscriptions, Quota, Statistic, GameData, Notification, OptionStates, LocalQuestionSet, LambdaResponse } = initSchema(schema);

export {
  User,
  QuestionSet,
  Test,
  Essay,
  NotificationType,
  Membership,
  Subscriptions,
  Quota,
  Statistic,
  GameData,
  Notification,
  OptionStates,
  LocalQuestionSet,
  LambdaResponse
};