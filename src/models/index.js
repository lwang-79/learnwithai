// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationType = {
  "MONTHLY": "Monthly",
  "WEEKLY": "Weekly",
  "DAILY": "Daily",
  "INSTANT": "Instant"
};

const RankingType = {
  "MATH_CORRECT_NUMBER_BY_DAY": "MathCorrectNumberByDay",
  "MATH_CORRECT_NUMBER_BY_MONTH": "MathCorrectNumberByMonth",
  "WRITING_NUMBER_BY_DAY": "WritingNumberByDay",
  "WRITING_NUMBER_BY_MONTH": "WritingNumberByMonth"
};

const { User, QuestionSet, BadQuestionSet, Test, Essay, RankingItem, Badge, SystemMessage, ShoppingItem, Membership, Subscriptions, Quota, Statistic, GameData, Notification, OptionStates, LocalQuestionSet, LambdaResponse } = initSchema(schema);

export {
  User,
  QuestionSet,
  BadQuestionSet,
  Test,
  Essay,
  RankingItem,
  Badge,
  SystemMessage,
  ShoppingItem,
  NotificationType,
  RankingType,
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