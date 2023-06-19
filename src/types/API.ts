/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type LambdaResponse = {
  __typename: "LambdaResponse",
  statusCode: number,
  body: string,
};

export type CreateUserInput = {
  id?: string | null,
  sub: string,
  username: string,
  email: string,
  picture: string,
  quota?: QuotaInput | null,
  membership?: MembershipInput | null,
  payerId?: string | null,
  markedQuestions?: Array< string > | null,
  daily?: Array< StatisticInput > | null,
  monthly?: Array< StatisticInput > | null,
  yearly?: Array< StatisticInput > | null,
  gameData?: GameDataInput | null,
  notification?: NotificationInput | null,
  optionStates?: OptionStatesInput | null,
  owner?: string | null,
  _version?: number | null,
};

export type QuotaInput = {
  mathPerDay: number,
  readingPerDay: number,
  writingPerDay: number,
  savedQuestions: number,
  savedTests: number,
  savedEssays: number,
};

export type MembershipInput = {
  current: number,
  previous: number,
  paypalSubscriptions: SubscriptionsInput,
};

export type SubscriptionsInput = {
  personal: Array< string | null >,
  professional: Array< string | null >,
  enterprise: Array< string | null >,
};

export type StatisticInput = {
  date: string,
  mathCorrect: number,
  mathWrong: number,
  mathExam: number,
  mathRequest: number,
  readingCorrect: number,
  readingWrong: number,
  readingRequest: number,
  writing: number,
  writingRequest: number,
};

export type GameDataInput = {
  startDate: string,
  level: number,
  score: number,
  seed: string,
  collections: string,
};

export type NotificationInput = {
  emails: Array< string | null >,
  types: Array< NotificationType | null >,
};

export enum NotificationType {
  Monthly = "Monthly",
  Weekly = "Weekly",
  Daily = "Daily",
  Instant = "Instant",
}


export type OptionStatesInput = {
  mathMode?: string | null,
  mathNumber?: number | null,
  mathSource?: string | null,
  mathLevel?: string | null,
  mathConcepts?: Array< string | null > | null,
  writingType?: string | null,
  writingTopic?: string | null,
  writingLevel?: string | null,
  stemMode?: string | null,
  stemNumber?: number | null,
  stemLevel?: string | null,
  stemConcepts?: Array< string | null > | null,
};

export type ModelUserConditionInput = {
  sub?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  picture?: ModelStringInput | null,
  payerId?: ModelStringInput | null,
  markedQuestions?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  sub: string,
  username: string,
  email: string,
  picture: string,
  quota?: Quota | null,
  membership?: Membership | null,
  payerId?: string | null,
  markedQuestions?: Array< string > | null,
  daily?:  Array<Statistic > | null,
  monthly?:  Array<Statistic > | null,
  yearly?:  Array<Statistic > | null,
  gameData?: GameData | null,
  notification?: Notification | null,
  optionStates?: OptionStates | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type Quota = {
  __typename: "Quota",
  mathPerDay: number,
  readingPerDay: number,
  writingPerDay: number,
  savedQuestions: number,
  savedTests: number,
  savedEssays: number,
};

export type Membership = {
  __typename: "Membership",
  current: number,
  previous: number,
  paypalSubscriptions: Subscriptions,
};

export type Subscriptions = {
  __typename: "Subscriptions",
  personal: Array< string | null >,
  professional: Array< string | null >,
  enterprise: Array< string | null >,
};

export type Statistic = {
  __typename: "Statistic",
  date: string,
  mathCorrect: number,
  mathWrong: number,
  mathExam: number,
  mathRequest: number,
  readingCorrect: number,
  readingWrong: number,
  readingRequest: number,
  writing: number,
  writingRequest: number,
};

export type GameData = {
  __typename: "GameData",
  startDate: string,
  level: number,
  score: number,
  seed: string,
  collections: string,
};

export type Notification = {
  __typename: "Notification",
  emails: Array< string | null >,
  types: Array< NotificationType | null >,
};

export type OptionStates = {
  __typename: "OptionStates",
  mathMode?: string | null,
  mathNumber?: number | null,
  mathSource?: string | null,
  mathLevel?: string | null,
  mathConcepts?: Array< string | null > | null,
  writingType?: string | null,
  writingTopic?: string | null,
  writingLevel?: string | null,
  stemMode?: string | null,
  stemNumber?: number | null,
  stemLevel?: string | null,
  stemConcepts?: Array< string | null > | null,
};

export type UpdateUserInput = {
  id: string,
  sub?: string | null,
  username?: string | null,
  email?: string | null,
  picture?: string | null,
  quota?: QuotaInput | null,
  membership?: MembershipInput | null,
  payerId?: string | null,
  markedQuestions?: Array< string > | null,
  daily?: Array< StatisticInput > | null,
  monthly?: Array< StatisticInput > | null,
  yearly?: Array< StatisticInput > | null,
  gameData?: GameDataInput | null,
  notification?: NotificationInput | null,
  optionStates?: OptionStatesInput | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateQuestionSetInput = {
  id?: string | null,
  question: string,
  options?: Array< string > | null,
  answer: string,
  workout?: string | null,
  type: string,
  category: string,
  level: string,
  concept: string,
  testId?: string | null,
  indexInTest?: number | null,
  owner?: string | null,
  _version?: number | null,
};

export type ModelQuestionSetConditionInput = {
  question?: ModelStringInput | null,
  options?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  workout?: ModelStringInput | null,
  type?: ModelStringInput | null,
  category?: ModelStringInput | null,
  level?: ModelStringInput | null,
  concept?: ModelStringInput | null,
  testId?: ModelIDInput | null,
  indexInTest?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelQuestionSetConditionInput | null > | null,
  or?: Array< ModelQuestionSetConditionInput | null > | null,
  not?: ModelQuestionSetConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type QuestionSet = {
  __typename: "QuestionSet",
  id: string,
  question: string,
  options?: Array< string > | null,
  answer: string,
  workout?: string | null,
  type: string,
  category: string,
  level: string,
  concept: string,
  testId?: string | null,
  indexInTest?: number | null,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateQuestionSetInput = {
  id: string,
  question?: string | null,
  options?: Array< string > | null,
  answer?: string | null,
  workout?: string | null,
  type?: string | null,
  category?: string | null,
  level?: string | null,
  concept?: string | null,
  testId?: string | null,
  indexInTest?: number | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteQuestionSetInput = {
  id: string,
  _version?: number | null,
};

export type CreateBadQuestionSetInput = {
  id?: string | null,
  source: string,
  question: string,
  options?: Array< string > | null,
  answer: string,
  workout?: string | null,
  type: string,
  category: string,
  level: string,
  concept: string,
  _version?: number | null,
};

export type ModelBadQuestionSetConditionInput = {
  source?: ModelStringInput | null,
  question?: ModelStringInput | null,
  options?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  workout?: ModelStringInput | null,
  type?: ModelStringInput | null,
  category?: ModelStringInput | null,
  level?: ModelStringInput | null,
  concept?: ModelStringInput | null,
  and?: Array< ModelBadQuestionSetConditionInput | null > | null,
  or?: Array< ModelBadQuestionSetConditionInput | null > | null,
  not?: ModelBadQuestionSetConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type BadQuestionSet = {
  __typename: "BadQuestionSet",
  id: string,
  source: string,
  question: string,
  options?: Array< string > | null,
  answer: string,
  workout?: string | null,
  type: string,
  category: string,
  level: string,
  concept: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateBadQuestionSetInput = {
  id: string,
  source?: string | null,
  question?: string | null,
  options?: Array< string > | null,
  answer?: string | null,
  workout?: string | null,
  type?: string | null,
  category?: string | null,
  level?: string | null,
  concept?: string | null,
  _version?: number | null,
};

export type DeleteBadQuestionSetInput = {
  id: string,
  _version?: number | null,
};

export type CreateTestInput = {
  id?: string | null,
  category: string,
  dateTime: string,
  duration?: number | null,
  total: number,
  wrong: number,
  correct: number,
  source?: string | null,
  questionSets: Array< LocalQuestionSetInput >,
  owner?: string | null,
  _version?: number | null,
};

export type LocalQuestionSetInput = {
  type: string,
  category: string,
  level: string,
  concept: string,
  question: string,
  options: Array< string >,
  answer: string,
  selected: string,
  workout: string,
  isBad: boolean,
  isTarget: boolean,
  isMarked?: boolean | null,
};

export type ModelTestConditionInput = {
  category?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  total?: ModelIntInput | null,
  wrong?: ModelIntInput | null,
  correct?: ModelIntInput | null,
  source?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelTestConditionInput | null > | null,
  or?: Array< ModelTestConditionInput | null > | null,
  not?: ModelTestConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type Test = {
  __typename: "Test",
  id: string,
  category: string,
  dateTime: string,
  duration?: number | null,
  total: number,
  wrong: number,
  correct: number,
  source?: string | null,
  questionSets:  Array<LocalQuestionSet >,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type LocalQuestionSet = {
  __typename: "LocalQuestionSet",
  type: string,
  category: string,
  level: string,
  concept: string,
  question: string,
  options: Array< string >,
  answer: string,
  selected: string,
  workout: string,
  isBad: boolean,
  isTarget: boolean,
  isMarked?: boolean | null,
};

export type UpdateTestInput = {
  id: string,
  category?: string | null,
  dateTime?: string | null,
  duration?: number | null,
  total?: number | null,
  wrong?: number | null,
  correct?: number | null,
  source?: string | null,
  questionSets?: Array< LocalQuestionSetInput > | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteTestInput = {
  id: string,
  _version?: number | null,
};

export type CreateEssayInput = {
  id?: string | null,
  type: string,
  level: string,
  topic: string,
  prompt: string,
  text: string,
  DateTime: string,
  owner?: string | null,
  _version?: number | null,
};

export type ModelEssayConditionInput = {
  type?: ModelStringInput | null,
  level?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  prompt?: ModelStringInput | null,
  text?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelEssayConditionInput | null > | null,
  or?: Array< ModelEssayConditionInput | null > | null,
  not?: ModelEssayConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type Essay = {
  __typename: "Essay",
  id: string,
  type: string,
  level: string,
  topic: string,
  prompt: string,
  text: string,
  DateTime: string,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateEssayInput = {
  id: string,
  type?: string | null,
  level?: string | null,
  topic?: string | null,
  prompt?: string | null,
  text?: string | null,
  DateTime?: string | null,
  owner?: string | null,
  _version?: number | null,
};

export type DeleteEssayInput = {
  id: string,
  _version?: number | null,
};

export type CreateRankingItemInput = {
  id?: string | null,
  date: string,
  type: RankingType,
  names: Array< string >,
  values: Array< string >,
  _version?: number | null,
};

export enum RankingType {
  MathCorrectNumberByDay = "MathCorrectNumberByDay",
  MathCorrectNumberByMonth = "MathCorrectNumberByMonth",
  WritingNumberByDay = "WritingNumberByDay",
  WritingNumberByMonth = "WritingNumberByMonth",
}


export type ModelRankingItemConditionInput = {
  date?: ModelStringInput | null,
  type?: ModelRankingTypeInput | null,
  names?: ModelStringInput | null,
  values?: ModelStringInput | null,
  and?: Array< ModelRankingItemConditionInput | null > | null,
  or?: Array< ModelRankingItemConditionInput | null > | null,
  not?: ModelRankingItemConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelRankingTypeInput = {
  eq?: RankingType | null,
  ne?: RankingType | null,
};

export type RankingItem = {
  __typename: "RankingItem",
  id: string,
  date: string,
  type: RankingType,
  names: Array< string >,
  values: Array< string >,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateRankingItemInput = {
  id: string,
  date?: string | null,
  type?: RankingType | null,
  names?: Array< string > | null,
  values?: Array< string > | null,
  _version?: number | null,
};

export type DeleteRankingItemInput = {
  id: string,
  _version?: number | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  sub?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  picture?: ModelStringInput | null,
  payerId?: ModelStringInput | null,
  markedQuestions?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelQuestionSetFilterInput = {
  id?: ModelIDInput | null,
  question?: ModelStringInput | null,
  options?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  workout?: ModelStringInput | null,
  type?: ModelStringInput | null,
  category?: ModelStringInput | null,
  level?: ModelStringInput | null,
  concept?: ModelStringInput | null,
  testId?: ModelIDInput | null,
  indexInTest?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelQuestionSetFilterInput | null > | null,
  or?: Array< ModelQuestionSetFilterInput | null > | null,
  not?: ModelQuestionSetFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelQuestionSetConnection = {
  __typename: "ModelQuestionSetConnection",
  items:  Array<QuestionSet | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelBadQuestionSetFilterInput = {
  id?: ModelIDInput | null,
  source?: ModelStringInput | null,
  question?: ModelStringInput | null,
  options?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  workout?: ModelStringInput | null,
  type?: ModelStringInput | null,
  category?: ModelStringInput | null,
  level?: ModelStringInput | null,
  concept?: ModelStringInput | null,
  and?: Array< ModelBadQuestionSetFilterInput | null > | null,
  or?: Array< ModelBadQuestionSetFilterInput | null > | null,
  not?: ModelBadQuestionSetFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelBadQuestionSetConnection = {
  __typename: "ModelBadQuestionSetConnection",
  items:  Array<BadQuestionSet | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelTestFilterInput = {
  id?: ModelIDInput | null,
  category?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  total?: ModelIntInput | null,
  wrong?: ModelIntInput | null,
  correct?: ModelIntInput | null,
  source?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelTestFilterInput | null > | null,
  or?: Array< ModelTestFilterInput | null > | null,
  not?: ModelTestFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelTestConnection = {
  __typename: "ModelTestConnection",
  items:  Array<Test | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelEssayFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  level?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  prompt?: ModelStringInput | null,
  text?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelEssayFilterInput | null > | null,
  or?: Array< ModelEssayFilterInput | null > | null,
  not?: ModelEssayFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelEssayConnection = {
  __typename: "ModelEssayConnection",
  items:  Array<Essay | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelRankingItemFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  type?: ModelRankingTypeInput | null,
  names?: ModelStringInput | null,
  values?: ModelStringInput | null,
  and?: Array< ModelRankingItemFilterInput | null > | null,
  or?: Array< ModelRankingItemFilterInput | null > | null,
  not?: ModelRankingItemFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelRankingItemConnection = {
  __typename: "ModelRankingItemConnection",
  items:  Array<RankingItem | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  sub?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  picture?: ModelSubscriptionStringInput | null,
  payerId?: ModelSubscriptionStringInput | null,
  markedQuestions?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionQuestionSetFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  question?: ModelSubscriptionStringInput | null,
  options?: ModelSubscriptionStringInput | null,
  answer?: ModelSubscriptionStringInput | null,
  workout?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  level?: ModelSubscriptionStringInput | null,
  concept?: ModelSubscriptionStringInput | null,
  testId?: ModelSubscriptionIDInput | null,
  indexInTest?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionQuestionSetFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestionSetFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBadQuestionSetFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  source?: ModelSubscriptionStringInput | null,
  question?: ModelSubscriptionStringInput | null,
  options?: ModelSubscriptionStringInput | null,
  answer?: ModelSubscriptionStringInput | null,
  workout?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  level?: ModelSubscriptionStringInput | null,
  concept?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBadQuestionSetFilterInput | null > | null,
  or?: Array< ModelSubscriptionBadQuestionSetFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionTestFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  category?: ModelSubscriptionStringInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  duration?: ModelSubscriptionIntInput | null,
  total?: ModelSubscriptionIntInput | null,
  wrong?: ModelSubscriptionIntInput | null,
  correct?: ModelSubscriptionIntInput | null,
  source?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTestFilterInput | null > | null,
  or?: Array< ModelSubscriptionTestFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionEssayFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  level?: ModelSubscriptionStringInput | null,
  topic?: ModelSubscriptionStringInput | null,
  prompt?: ModelSubscriptionStringInput | null,
  text?: ModelSubscriptionStringInput | null,
  DateTime?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEssayFilterInput | null > | null,
  or?: Array< ModelSubscriptionEssayFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionRankingItemFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  date?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  names?: ModelSubscriptionStringInput | null,
  values?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRankingItemFilterInput | null > | null,
  or?: Array< ModelSubscriptionRankingItemFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type LearnwithaiSubscribeMutationVariables = {
  operation: string,
  userId: string,
  subscriptionId: string,
};

export type LearnwithaiSubscribeMutation = {
  learnwithaiSubscribe?:  {
    __typename: "LambdaResponse",
    statusCode: number,
    body: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    sub: string,
    username: string,
    email: string,
    picture: string,
    quota?:  {
      __typename: "Quota",
      mathPerDay: number,
      readingPerDay: number,
      writingPerDay: number,
      savedQuestions: number,
      savedTests: number,
      savedEssays: number,
    } | null,
    membership?:  {
      __typename: "Membership",
      current: number,
      previous: number,
      paypalSubscriptions:  {
        __typename: "Subscriptions",
        personal: Array< string | null >,
        professional: Array< string | null >,
        enterprise: Array< string | null >,
      },
    } | null,
    payerId?: string | null,
    markedQuestions?: Array< string > | null,
    daily?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    monthly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    yearly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    gameData?:  {
      __typename: "GameData",
      startDate: string,
      level: number,
      score: number,
      seed: string,
      collections: string,
    } | null,
    notification?:  {
      __typename: "Notification",
      emails: Array< string | null >,
      types: Array< NotificationType | null >,
    } | null,
    optionStates?:  {
      __typename: "OptionStates",
      mathMode?: string | null,
      mathNumber?: number | null,
      mathSource?: string | null,
      mathLevel?: string | null,
      mathConcepts?: Array< string | null > | null,
      writingType?: string | null,
      writingTopic?: string | null,
      writingLevel?: string | null,
      stemMode?: string | null,
      stemNumber?: number | null,
      stemLevel?: string | null,
      stemConcepts?: Array< string | null > | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    sub: string,
    username: string,
    email: string,
    picture: string,
    quota?:  {
      __typename: "Quota",
      mathPerDay: number,
      readingPerDay: number,
      writingPerDay: number,
      savedQuestions: number,
      savedTests: number,
      savedEssays: number,
    } | null,
    membership?:  {
      __typename: "Membership",
      current: number,
      previous: number,
      paypalSubscriptions:  {
        __typename: "Subscriptions",
        personal: Array< string | null >,
        professional: Array< string | null >,
        enterprise: Array< string | null >,
      },
    } | null,
    payerId?: string | null,
    markedQuestions?: Array< string > | null,
    daily?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    monthly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    yearly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    gameData?:  {
      __typename: "GameData",
      startDate: string,
      level: number,
      score: number,
      seed: string,
      collections: string,
    } | null,
    notification?:  {
      __typename: "Notification",
      emails: Array< string | null >,
      types: Array< NotificationType | null >,
    } | null,
    optionStates?:  {
      __typename: "OptionStates",
      mathMode?: string | null,
      mathNumber?: number | null,
      mathSource?: string | null,
      mathLevel?: string | null,
      mathConcepts?: Array< string | null > | null,
      writingType?: string | null,
      writingTopic?: string | null,
      writingLevel?: string | null,
      stemMode?: string | null,
      stemNumber?: number | null,
      stemLevel?: string | null,
      stemConcepts?: Array< string | null > | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    sub: string,
    username: string,
    email: string,
    picture: string,
    quota?:  {
      __typename: "Quota",
      mathPerDay: number,
      readingPerDay: number,
      writingPerDay: number,
      savedQuestions: number,
      savedTests: number,
      savedEssays: number,
    } | null,
    membership?:  {
      __typename: "Membership",
      current: number,
      previous: number,
      paypalSubscriptions:  {
        __typename: "Subscriptions",
        personal: Array< string | null >,
        professional: Array< string | null >,
        enterprise: Array< string | null >,
      },
    } | null,
    payerId?: string | null,
    markedQuestions?: Array< string > | null,
    daily?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    monthly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    yearly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    gameData?:  {
      __typename: "GameData",
      startDate: string,
      level: number,
      score: number,
      seed: string,
      collections: string,
    } | null,
    notification?:  {
      __typename: "Notification",
      emails: Array< string | null >,
      types: Array< NotificationType | null >,
    } | null,
    optionStates?:  {
      __typename: "OptionStates",
      mathMode?: string | null,
      mathNumber?: number | null,
      mathSource?: string | null,
      mathLevel?: string | null,
      mathConcepts?: Array< string | null > | null,
      writingType?: string | null,
      writingTopic?: string | null,
      writingLevel?: string | null,
      stemMode?: string | null,
      stemNumber?: number | null,
      stemLevel?: string | null,
      stemConcepts?: Array< string | null > | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateQuestionSetMutationVariables = {
  input: CreateQuestionSetInput,
  condition?: ModelQuestionSetConditionInput | null,
};

export type CreateQuestionSetMutation = {
  createQuestionSet?:  {
    __typename: "QuestionSet",
    id: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    testId?: string | null,
    indexInTest?: number | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateQuestionSetMutationVariables = {
  input: UpdateQuestionSetInput,
  condition?: ModelQuestionSetConditionInput | null,
};

export type UpdateQuestionSetMutation = {
  updateQuestionSet?:  {
    __typename: "QuestionSet",
    id: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    testId?: string | null,
    indexInTest?: number | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteQuestionSetMutationVariables = {
  input: DeleteQuestionSetInput,
  condition?: ModelQuestionSetConditionInput | null,
};

export type DeleteQuestionSetMutation = {
  deleteQuestionSet?:  {
    __typename: "QuestionSet",
    id: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    testId?: string | null,
    indexInTest?: number | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateBadQuestionSetMutationVariables = {
  input: CreateBadQuestionSetInput,
  condition?: ModelBadQuestionSetConditionInput | null,
};

export type CreateBadQuestionSetMutation = {
  createBadQuestionSet?:  {
    __typename: "BadQuestionSet",
    id: string,
    source: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateBadQuestionSetMutationVariables = {
  input: UpdateBadQuestionSetInput,
  condition?: ModelBadQuestionSetConditionInput | null,
};

export type UpdateBadQuestionSetMutation = {
  updateBadQuestionSet?:  {
    __typename: "BadQuestionSet",
    id: string,
    source: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteBadQuestionSetMutationVariables = {
  input: DeleteBadQuestionSetInput,
  condition?: ModelBadQuestionSetConditionInput | null,
};

export type DeleteBadQuestionSetMutation = {
  deleteBadQuestionSet?:  {
    __typename: "BadQuestionSet",
    id: string,
    source: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateTestMutationVariables = {
  input: CreateTestInput,
  condition?: ModelTestConditionInput | null,
};

export type CreateTestMutation = {
  createTest?:  {
    __typename: "Test",
    id: string,
    category: string,
    dateTime: string,
    duration?: number | null,
    total: number,
    wrong: number,
    correct: number,
    source?: string | null,
    questionSets:  Array< {
      __typename: "LocalQuestionSet",
      type: string,
      category: string,
      level: string,
      concept: string,
      question: string,
      options: Array< string >,
      answer: string,
      selected: string,
      workout: string,
      isBad: boolean,
      isTarget: boolean,
      isMarked?: boolean | null,
    } >,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateTestMutationVariables = {
  input: UpdateTestInput,
  condition?: ModelTestConditionInput | null,
};

export type UpdateTestMutation = {
  updateTest?:  {
    __typename: "Test",
    id: string,
    category: string,
    dateTime: string,
    duration?: number | null,
    total: number,
    wrong: number,
    correct: number,
    source?: string | null,
    questionSets:  Array< {
      __typename: "LocalQuestionSet",
      type: string,
      category: string,
      level: string,
      concept: string,
      question: string,
      options: Array< string >,
      answer: string,
      selected: string,
      workout: string,
      isBad: boolean,
      isTarget: boolean,
      isMarked?: boolean | null,
    } >,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteTestMutationVariables = {
  input: DeleteTestInput,
  condition?: ModelTestConditionInput | null,
};

export type DeleteTestMutation = {
  deleteTest?:  {
    __typename: "Test",
    id: string,
    category: string,
    dateTime: string,
    duration?: number | null,
    total: number,
    wrong: number,
    correct: number,
    source?: string | null,
    questionSets:  Array< {
      __typename: "LocalQuestionSet",
      type: string,
      category: string,
      level: string,
      concept: string,
      question: string,
      options: Array< string >,
      answer: string,
      selected: string,
      workout: string,
      isBad: boolean,
      isTarget: boolean,
      isMarked?: boolean | null,
    } >,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateEssayMutationVariables = {
  input: CreateEssayInput,
  condition?: ModelEssayConditionInput | null,
};

export type CreateEssayMutation = {
  createEssay?:  {
    __typename: "Essay",
    id: string,
    type: string,
    level: string,
    topic: string,
    prompt: string,
    text: string,
    DateTime: string,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateEssayMutationVariables = {
  input: UpdateEssayInput,
  condition?: ModelEssayConditionInput | null,
};

export type UpdateEssayMutation = {
  updateEssay?:  {
    __typename: "Essay",
    id: string,
    type: string,
    level: string,
    topic: string,
    prompt: string,
    text: string,
    DateTime: string,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteEssayMutationVariables = {
  input: DeleteEssayInput,
  condition?: ModelEssayConditionInput | null,
};

export type DeleteEssayMutation = {
  deleteEssay?:  {
    __typename: "Essay",
    id: string,
    type: string,
    level: string,
    topic: string,
    prompt: string,
    text: string,
    DateTime: string,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateRankingItemMutationVariables = {
  input: CreateRankingItemInput,
  condition?: ModelRankingItemConditionInput | null,
};

export type CreateRankingItemMutation = {
  createRankingItem?:  {
    __typename: "RankingItem",
    id: string,
    date: string,
    type: RankingType,
    names: Array< string >,
    values: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateRankingItemMutationVariables = {
  input: UpdateRankingItemInput,
  condition?: ModelRankingItemConditionInput | null,
};

export type UpdateRankingItemMutation = {
  updateRankingItem?:  {
    __typename: "RankingItem",
    id: string,
    date: string,
    type: RankingType,
    names: Array< string >,
    values: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteRankingItemMutationVariables = {
  input: DeleteRankingItemInput,
  condition?: ModelRankingItemConditionInput | null,
};

export type DeleteRankingItemMutation = {
  deleteRankingItem?:  {
    __typename: "RankingItem",
    id: string,
    date: string,
    type: RankingType,
    names: Array< string >,
    values: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    sub: string,
    username: string,
    email: string,
    picture: string,
    quota?:  {
      __typename: "Quota",
      mathPerDay: number,
      readingPerDay: number,
      writingPerDay: number,
      savedQuestions: number,
      savedTests: number,
      savedEssays: number,
    } | null,
    membership?:  {
      __typename: "Membership",
      current: number,
      previous: number,
      paypalSubscriptions:  {
        __typename: "Subscriptions",
        personal: Array< string | null >,
        professional: Array< string | null >,
        enterprise: Array< string | null >,
      },
    } | null,
    payerId?: string | null,
    markedQuestions?: Array< string > | null,
    daily?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    monthly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    yearly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    gameData?:  {
      __typename: "GameData",
      startDate: string,
      level: number,
      score: number,
      seed: string,
      collections: string,
    } | null,
    notification?:  {
      __typename: "Notification",
      emails: Array< string | null >,
      types: Array< NotificationType | null >,
    } | null,
    optionStates?:  {
      __typename: "OptionStates",
      mathMode?: string | null,
      mathNumber?: number | null,
      mathSource?: string | null,
      mathLevel?: string | null,
      mathConcepts?: Array< string | null > | null,
      writingType?: string | null,
      writingTopic?: string | null,
      writingLevel?: string | null,
      stemMode?: string | null,
      stemNumber?: number | null,
      stemLevel?: string | null,
      stemConcepts?: Array< string | null > | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      sub: string,
      username: string,
      email: string,
      picture: string,
      quota?:  {
        __typename: "Quota",
        mathPerDay: number,
        readingPerDay: number,
        writingPerDay: number,
        savedQuestions: number,
        savedTests: number,
        savedEssays: number,
      } | null,
      membership?:  {
        __typename: "Membership",
        current: number,
        previous: number,
        paypalSubscriptions:  {
          __typename: "Subscriptions",
          personal: Array< string | null >,
          professional: Array< string | null >,
          enterprise: Array< string | null >,
        },
      } | null,
      payerId?: string | null,
      markedQuestions?: Array< string > | null,
      daily?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      monthly?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      yearly?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      gameData?:  {
        __typename: "GameData",
        startDate: string,
        level: number,
        score: number,
        seed: string,
        collections: string,
      } | null,
      notification?:  {
        __typename: "Notification",
        emails: Array< string | null >,
        types: Array< NotificationType | null >,
      } | null,
      optionStates?:  {
        __typename: "OptionStates",
        mathMode?: string | null,
        mathNumber?: number | null,
        mathSource?: string | null,
        mathLevel?: string | null,
        mathConcepts?: Array< string | null > | null,
        writingType?: string | null,
        writingTopic?: string | null,
        writingLevel?: string | null,
        stemMode?: string | null,
        stemNumber?: number | null,
        stemLevel?: string | null,
        stemConcepts?: Array< string | null > | null,
      } | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      sub: string,
      username: string,
      email: string,
      picture: string,
      quota?:  {
        __typename: "Quota",
        mathPerDay: number,
        readingPerDay: number,
        writingPerDay: number,
        savedQuestions: number,
        savedTests: number,
        savedEssays: number,
      } | null,
      membership?:  {
        __typename: "Membership",
        current: number,
        previous: number,
        paypalSubscriptions:  {
          __typename: "Subscriptions",
          personal: Array< string | null >,
          professional: Array< string | null >,
          enterprise: Array< string | null >,
        },
      } | null,
      payerId?: string | null,
      markedQuestions?: Array< string > | null,
      daily?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      monthly?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      yearly?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      gameData?:  {
        __typename: "GameData",
        startDate: string,
        level: number,
        score: number,
        seed: string,
        collections: string,
      } | null,
      notification?:  {
        __typename: "Notification",
        emails: Array< string | null >,
        types: Array< NotificationType | null >,
      } | null,
      optionStates?:  {
        __typename: "OptionStates",
        mathMode?: string | null,
        mathNumber?: number | null,
        mathSource?: string | null,
        mathLevel?: string | null,
        mathConcepts?: Array< string | null > | null,
        writingType?: string | null,
        writingTopic?: string | null,
        writingLevel?: string | null,
        stemMode?: string | null,
        stemNumber?: number | null,
        stemLevel?: string | null,
        stemConcepts?: Array< string | null > | null,
      } | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UserBySubQueryVariables = {
  sub: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserBySubQuery = {
  userBySub?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      sub: string,
      username: string,
      email: string,
      picture: string,
      quota?:  {
        __typename: "Quota",
        mathPerDay: number,
        readingPerDay: number,
        writingPerDay: number,
        savedQuestions: number,
        savedTests: number,
        savedEssays: number,
      } | null,
      membership?:  {
        __typename: "Membership",
        current: number,
        previous: number,
        paypalSubscriptions:  {
          __typename: "Subscriptions",
          personal: Array< string | null >,
          professional: Array< string | null >,
          enterprise: Array< string | null >,
        },
      } | null,
      payerId?: string | null,
      markedQuestions?: Array< string > | null,
      daily?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      monthly?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      yearly?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      gameData?:  {
        __typename: "GameData",
        startDate: string,
        level: number,
        score: number,
        seed: string,
        collections: string,
      } | null,
      notification?:  {
        __typename: "Notification",
        emails: Array< string | null >,
        types: Array< NotificationType | null >,
      } | null,
      optionStates?:  {
        __typename: "OptionStates",
        mathMode?: string | null,
        mathNumber?: number | null,
        mathSource?: string | null,
        mathLevel?: string | null,
        mathConcepts?: Array< string | null > | null,
        writingType?: string | null,
        writingTopic?: string | null,
        writingLevel?: string | null,
        stemMode?: string | null,
        stemNumber?: number | null,
        stemLevel?: string | null,
        stemConcepts?: Array< string | null > | null,
      } | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UserByPayerIdQueryVariables = {
  payerId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByPayerIdQuery = {
  userByPayerId?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      sub: string,
      username: string,
      email: string,
      picture: string,
      quota?:  {
        __typename: "Quota",
        mathPerDay: number,
        readingPerDay: number,
        writingPerDay: number,
        savedQuestions: number,
        savedTests: number,
        savedEssays: number,
      } | null,
      membership?:  {
        __typename: "Membership",
        current: number,
        previous: number,
        paypalSubscriptions:  {
          __typename: "Subscriptions",
          personal: Array< string | null >,
          professional: Array< string | null >,
          enterprise: Array< string | null >,
        },
      } | null,
      payerId?: string | null,
      markedQuestions?: Array< string > | null,
      daily?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      monthly?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      yearly?:  Array< {
        __typename: "Statistic",
        date: string,
        mathCorrect: number,
        mathWrong: number,
        mathExam: number,
        mathRequest: number,
        readingCorrect: number,
        readingWrong: number,
        readingRequest: number,
        writing: number,
        writingRequest: number,
      } > | null,
      gameData?:  {
        __typename: "GameData",
        startDate: string,
        level: number,
        score: number,
        seed: string,
        collections: string,
      } | null,
      notification?:  {
        __typename: "Notification",
        emails: Array< string | null >,
        types: Array< NotificationType | null >,
      } | null,
      optionStates?:  {
        __typename: "OptionStates",
        mathMode?: string | null,
        mathNumber?: number | null,
        mathSource?: string | null,
        mathLevel?: string | null,
        mathConcepts?: Array< string | null > | null,
        writingType?: string | null,
        writingTopic?: string | null,
        writingLevel?: string | null,
        stemMode?: string | null,
        stemNumber?: number | null,
        stemLevel?: string | null,
        stemConcepts?: Array< string | null > | null,
      } | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetQuestionSetQueryVariables = {
  id: string,
};

export type GetQuestionSetQuery = {
  getQuestionSet?:  {
    __typename: "QuestionSet",
    id: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    testId?: string | null,
    indexInTest?: number | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListQuestionSetsQueryVariables = {
  filter?: ModelQuestionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionSetsQuery = {
  listQuestionSets?:  {
    __typename: "ModelQuestionSetConnection",
    items:  Array< {
      __typename: "QuestionSet",
      id: string,
      question: string,
      options?: Array< string > | null,
      answer: string,
      workout?: string | null,
      type: string,
      category: string,
      level: string,
      concept: string,
      testId?: string | null,
      indexInTest?: number | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncQuestionSetsQueryVariables = {
  filter?: ModelQuestionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncQuestionSetsQuery = {
  syncQuestionSets?:  {
    __typename: "ModelQuestionSetConnection",
    items:  Array< {
      __typename: "QuestionSet",
      id: string,
      question: string,
      options?: Array< string > | null,
      answer: string,
      workout?: string | null,
      type: string,
      category: string,
      level: string,
      concept: string,
      testId?: string | null,
      indexInTest?: number | null,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetBadQuestionSetQueryVariables = {
  id: string,
};

export type GetBadQuestionSetQuery = {
  getBadQuestionSet?:  {
    __typename: "BadQuestionSet",
    id: string,
    source: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListBadQuestionSetsQueryVariables = {
  filter?: ModelBadQuestionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBadQuestionSetsQuery = {
  listBadQuestionSets?:  {
    __typename: "ModelBadQuestionSetConnection",
    items:  Array< {
      __typename: "BadQuestionSet",
      id: string,
      source: string,
      question: string,
      options?: Array< string > | null,
      answer: string,
      workout?: string | null,
      type: string,
      category: string,
      level: string,
      concept: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncBadQuestionSetsQueryVariables = {
  filter?: ModelBadQuestionSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncBadQuestionSetsQuery = {
  syncBadQuestionSets?:  {
    __typename: "ModelBadQuestionSetConnection",
    items:  Array< {
      __typename: "BadQuestionSet",
      id: string,
      source: string,
      question: string,
      options?: Array< string > | null,
      answer: string,
      workout?: string | null,
      type: string,
      category: string,
      level: string,
      concept: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetTestQueryVariables = {
  id: string,
};

export type GetTestQuery = {
  getTest?:  {
    __typename: "Test",
    id: string,
    category: string,
    dateTime: string,
    duration?: number | null,
    total: number,
    wrong: number,
    correct: number,
    source?: string | null,
    questionSets:  Array< {
      __typename: "LocalQuestionSet",
      type: string,
      category: string,
      level: string,
      concept: string,
      question: string,
      options: Array< string >,
      answer: string,
      selected: string,
      workout: string,
      isBad: boolean,
      isTarget: boolean,
      isMarked?: boolean | null,
    } >,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListTestsQueryVariables = {
  filter?: ModelTestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTestsQuery = {
  listTests?:  {
    __typename: "ModelTestConnection",
    items:  Array< {
      __typename: "Test",
      id: string,
      category: string,
      dateTime: string,
      duration?: number | null,
      total: number,
      wrong: number,
      correct: number,
      source?: string | null,
      questionSets:  Array< {
        __typename: "LocalQuestionSet",
        type: string,
        category: string,
        level: string,
        concept: string,
        question: string,
        options: Array< string >,
        answer: string,
        selected: string,
        workout: string,
        isBad: boolean,
        isTarget: boolean,
        isMarked?: boolean | null,
      } >,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTestsQueryVariables = {
  filter?: ModelTestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTestsQuery = {
  syncTests?:  {
    __typename: "ModelTestConnection",
    items:  Array< {
      __typename: "Test",
      id: string,
      category: string,
      dateTime: string,
      duration?: number | null,
      total: number,
      wrong: number,
      correct: number,
      source?: string | null,
      questionSets:  Array< {
        __typename: "LocalQuestionSet",
        type: string,
        category: string,
        level: string,
        concept: string,
        question: string,
        options: Array< string >,
        answer: string,
        selected: string,
        workout: string,
        isBad: boolean,
        isTarget: boolean,
        isMarked?: boolean | null,
      } >,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetEssayQueryVariables = {
  id: string,
};

export type GetEssayQuery = {
  getEssay?:  {
    __typename: "Essay",
    id: string,
    type: string,
    level: string,
    topic: string,
    prompt: string,
    text: string,
    DateTime: string,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListEssaysQueryVariables = {
  filter?: ModelEssayFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEssaysQuery = {
  listEssays?:  {
    __typename: "ModelEssayConnection",
    items:  Array< {
      __typename: "Essay",
      id: string,
      type: string,
      level: string,
      topic: string,
      prompt: string,
      text: string,
      DateTime: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncEssaysQueryVariables = {
  filter?: ModelEssayFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncEssaysQuery = {
  syncEssays?:  {
    __typename: "ModelEssayConnection",
    items:  Array< {
      __typename: "Essay",
      id: string,
      type: string,
      level: string,
      topic: string,
      prompt: string,
      text: string,
      DateTime: string,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetRankingItemQueryVariables = {
  id: string,
};

export type GetRankingItemQuery = {
  getRankingItem?:  {
    __typename: "RankingItem",
    id: string,
    date: string,
    type: RankingType,
    names: Array< string >,
    values: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListRankingItemsQueryVariables = {
  filter?: ModelRankingItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRankingItemsQuery = {
  listRankingItems?:  {
    __typename: "ModelRankingItemConnection",
    items:  Array< {
      __typename: "RankingItem",
      id: string,
      date: string,
      type: RankingType,
      names: Array< string >,
      values: Array< string >,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncRankingItemsQueryVariables = {
  filter?: ModelRankingItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncRankingItemsQuery = {
  syncRankingItems?:  {
    __typename: "ModelRankingItemConnection",
    items:  Array< {
      __typename: "RankingItem",
      id: string,
      date: string,
      type: RankingType,
      names: Array< string >,
      values: Array< string >,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type RankingItemsByDateAndTypeQueryVariables = {
  date: string,
  type?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelRankingItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type RankingItemsByDateAndTypeQuery = {
  rankingItemsByDateAndType?:  {
    __typename: "ModelRankingItemConnection",
    items:  Array< {
      __typename: "RankingItem",
      id: string,
      date: string,
      type: RankingType,
      names: Array< string >,
      values: Array< string >,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    sub: string,
    username: string,
    email: string,
    picture: string,
    quota?:  {
      __typename: "Quota",
      mathPerDay: number,
      readingPerDay: number,
      writingPerDay: number,
      savedQuestions: number,
      savedTests: number,
      savedEssays: number,
    } | null,
    membership?:  {
      __typename: "Membership",
      current: number,
      previous: number,
      paypalSubscriptions:  {
        __typename: "Subscriptions",
        personal: Array< string | null >,
        professional: Array< string | null >,
        enterprise: Array< string | null >,
      },
    } | null,
    payerId?: string | null,
    markedQuestions?: Array< string > | null,
    daily?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    monthly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    yearly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    gameData?:  {
      __typename: "GameData",
      startDate: string,
      level: number,
      score: number,
      seed: string,
      collections: string,
    } | null,
    notification?:  {
      __typename: "Notification",
      emails: Array< string | null >,
      types: Array< NotificationType | null >,
    } | null,
    optionStates?:  {
      __typename: "OptionStates",
      mathMode?: string | null,
      mathNumber?: number | null,
      mathSource?: string | null,
      mathLevel?: string | null,
      mathConcepts?: Array< string | null > | null,
      writingType?: string | null,
      writingTopic?: string | null,
      writingLevel?: string | null,
      stemMode?: string | null,
      stemNumber?: number | null,
      stemLevel?: string | null,
      stemConcepts?: Array< string | null > | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    sub: string,
    username: string,
    email: string,
    picture: string,
    quota?:  {
      __typename: "Quota",
      mathPerDay: number,
      readingPerDay: number,
      writingPerDay: number,
      savedQuestions: number,
      savedTests: number,
      savedEssays: number,
    } | null,
    membership?:  {
      __typename: "Membership",
      current: number,
      previous: number,
      paypalSubscriptions:  {
        __typename: "Subscriptions",
        personal: Array< string | null >,
        professional: Array< string | null >,
        enterprise: Array< string | null >,
      },
    } | null,
    payerId?: string | null,
    markedQuestions?: Array< string > | null,
    daily?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    monthly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    yearly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    gameData?:  {
      __typename: "GameData",
      startDate: string,
      level: number,
      score: number,
      seed: string,
      collections: string,
    } | null,
    notification?:  {
      __typename: "Notification",
      emails: Array< string | null >,
      types: Array< NotificationType | null >,
    } | null,
    optionStates?:  {
      __typename: "OptionStates",
      mathMode?: string | null,
      mathNumber?: number | null,
      mathSource?: string | null,
      mathLevel?: string | null,
      mathConcepts?: Array< string | null > | null,
      writingType?: string | null,
      writingTopic?: string | null,
      writingLevel?: string | null,
      stemMode?: string | null,
      stemNumber?: number | null,
      stemLevel?: string | null,
      stemConcepts?: Array< string | null > | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    sub: string,
    username: string,
    email: string,
    picture: string,
    quota?:  {
      __typename: "Quota",
      mathPerDay: number,
      readingPerDay: number,
      writingPerDay: number,
      savedQuestions: number,
      savedTests: number,
      savedEssays: number,
    } | null,
    membership?:  {
      __typename: "Membership",
      current: number,
      previous: number,
      paypalSubscriptions:  {
        __typename: "Subscriptions",
        personal: Array< string | null >,
        professional: Array< string | null >,
        enterprise: Array< string | null >,
      },
    } | null,
    payerId?: string | null,
    markedQuestions?: Array< string > | null,
    daily?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    monthly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    yearly?:  Array< {
      __typename: "Statistic",
      date: string,
      mathCorrect: number,
      mathWrong: number,
      mathExam: number,
      mathRequest: number,
      readingCorrect: number,
      readingWrong: number,
      readingRequest: number,
      writing: number,
      writingRequest: number,
    } > | null,
    gameData?:  {
      __typename: "GameData",
      startDate: string,
      level: number,
      score: number,
      seed: string,
      collections: string,
    } | null,
    notification?:  {
      __typename: "Notification",
      emails: Array< string | null >,
      types: Array< NotificationType | null >,
    } | null,
    optionStates?:  {
      __typename: "OptionStates",
      mathMode?: string | null,
      mathNumber?: number | null,
      mathSource?: string | null,
      mathLevel?: string | null,
      mathConcepts?: Array< string | null > | null,
      writingType?: string | null,
      writingTopic?: string | null,
      writingLevel?: string | null,
      stemMode?: string | null,
      stemNumber?: number | null,
      stemLevel?: string | null,
      stemConcepts?: Array< string | null > | null,
    } | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionSetFilterInput | null,
  owner?: string | null,
};

export type OnCreateQuestionSetSubscription = {
  onCreateQuestionSet?:  {
    __typename: "QuestionSet",
    id: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    testId?: string | null,
    indexInTest?: number | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionSetFilterInput | null,
  owner?: string | null,
};

export type OnUpdateQuestionSetSubscription = {
  onUpdateQuestionSet?:  {
    __typename: "QuestionSet",
    id: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    testId?: string | null,
    indexInTest?: number | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionSetFilterInput | null,
  owner?: string | null,
};

export type OnDeleteQuestionSetSubscription = {
  onDeleteQuestionSet?:  {
    __typename: "QuestionSet",
    id: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    testId?: string | null,
    indexInTest?: number | null,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateBadQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionBadQuestionSetFilterInput | null,
};

export type OnCreateBadQuestionSetSubscription = {
  onCreateBadQuestionSet?:  {
    __typename: "BadQuestionSet",
    id: string,
    source: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateBadQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionBadQuestionSetFilterInput | null,
};

export type OnUpdateBadQuestionSetSubscription = {
  onUpdateBadQuestionSet?:  {
    __typename: "BadQuestionSet",
    id: string,
    source: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteBadQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionBadQuestionSetFilterInput | null,
};

export type OnDeleteBadQuestionSetSubscription = {
  onDeleteBadQuestionSet?:  {
    __typename: "BadQuestionSet",
    id: string,
    source: string,
    question: string,
    options?: Array< string > | null,
    answer: string,
    workout?: string | null,
    type: string,
    category: string,
    level: string,
    concept: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateTestSubscriptionVariables = {
  filter?: ModelSubscriptionTestFilterInput | null,
  owner?: string | null,
};

export type OnCreateTestSubscription = {
  onCreateTest?:  {
    __typename: "Test",
    id: string,
    category: string,
    dateTime: string,
    duration?: number | null,
    total: number,
    wrong: number,
    correct: number,
    source?: string | null,
    questionSets:  Array< {
      __typename: "LocalQuestionSet",
      type: string,
      category: string,
      level: string,
      concept: string,
      question: string,
      options: Array< string >,
      answer: string,
      selected: string,
      workout: string,
      isBad: boolean,
      isTarget: boolean,
      isMarked?: boolean | null,
    } >,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateTestSubscriptionVariables = {
  filter?: ModelSubscriptionTestFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTestSubscription = {
  onUpdateTest?:  {
    __typename: "Test",
    id: string,
    category: string,
    dateTime: string,
    duration?: number | null,
    total: number,
    wrong: number,
    correct: number,
    source?: string | null,
    questionSets:  Array< {
      __typename: "LocalQuestionSet",
      type: string,
      category: string,
      level: string,
      concept: string,
      question: string,
      options: Array< string >,
      answer: string,
      selected: string,
      workout: string,
      isBad: boolean,
      isTarget: boolean,
      isMarked?: boolean | null,
    } >,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteTestSubscriptionVariables = {
  filter?: ModelSubscriptionTestFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTestSubscription = {
  onDeleteTest?:  {
    __typename: "Test",
    id: string,
    category: string,
    dateTime: string,
    duration?: number | null,
    total: number,
    wrong: number,
    correct: number,
    source?: string | null,
    questionSets:  Array< {
      __typename: "LocalQuestionSet",
      type: string,
      category: string,
      level: string,
      concept: string,
      question: string,
      options: Array< string >,
      answer: string,
      selected: string,
      workout: string,
      isBad: boolean,
      isTarget: boolean,
      isMarked?: boolean | null,
    } >,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateEssaySubscriptionVariables = {
  filter?: ModelSubscriptionEssayFilterInput | null,
  owner?: string | null,
};

export type OnCreateEssaySubscription = {
  onCreateEssay?:  {
    __typename: "Essay",
    id: string,
    type: string,
    level: string,
    topic: string,
    prompt: string,
    text: string,
    DateTime: string,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateEssaySubscriptionVariables = {
  filter?: ModelSubscriptionEssayFilterInput | null,
  owner?: string | null,
};

export type OnUpdateEssaySubscription = {
  onUpdateEssay?:  {
    __typename: "Essay",
    id: string,
    type: string,
    level: string,
    topic: string,
    prompt: string,
    text: string,
    DateTime: string,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteEssaySubscriptionVariables = {
  filter?: ModelSubscriptionEssayFilterInput | null,
  owner?: string | null,
};

export type OnDeleteEssaySubscription = {
  onDeleteEssay?:  {
    __typename: "Essay",
    id: string,
    type: string,
    level: string,
    topic: string,
    prompt: string,
    text: string,
    DateTime: string,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateRankingItemSubscriptionVariables = {
  filter?: ModelSubscriptionRankingItemFilterInput | null,
};

export type OnCreateRankingItemSubscription = {
  onCreateRankingItem?:  {
    __typename: "RankingItem",
    id: string,
    date: string,
    type: RankingType,
    names: Array< string >,
    values: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateRankingItemSubscriptionVariables = {
  filter?: ModelSubscriptionRankingItemFilterInput | null,
};

export type OnUpdateRankingItemSubscription = {
  onUpdateRankingItem?:  {
    __typename: "RankingItem",
    id: string,
    date: string,
    type: RankingType,
    names: Array< string >,
    values: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteRankingItemSubscriptionVariables = {
  filter?: ModelSubscriptionRankingItemFilterInput | null,
};

export type OnDeleteRankingItemSubscription = {
  onDeleteRankingItem?:  {
    __typename: "RankingItem",
    id: string,
    date: string,
    type: RankingType,
    names: Array< string >,
    values: Array< string >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
