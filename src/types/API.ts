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


export type ModelUserConditionInput = {
  sub?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  picture?: ModelStringInput | null,
  payerId?: ModelStringInput | null,
  markedQuestions?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
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
  correctCount: number,
  wrongCount: number,
  badCount: number,
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
  correctCount?: ModelIntInput | null,
  wrongCount?: ModelIntInput | null,
  badCount?: ModelIntInput | null,
  and?: Array< ModelQuestionSetConditionInput | null > | null,
  or?: Array< ModelQuestionSetConditionInput | null > | null,
  not?: ModelQuestionSetConditionInput | null,
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
  correctCount: number,
  wrongCount: number,
  badCount: number,
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
  correctCount?: number | null,
  wrongCount?: number | null,
  badCount?: number | null,
  _version?: number | null,
};

export type DeleteQuestionSetInput = {
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
  questionSets: Array< LocalQuestionSetInput >,
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
};

export type ModelTestConditionInput = {
  category?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  total?: ModelIntInput | null,
  wrong?: ModelIntInput | null,
  correct?: ModelIntInput | null,
  and?: Array< ModelTestConditionInput | null > | null,
  or?: Array< ModelTestConditionInput | null > | null,
  not?: ModelTestConditionInput | null,
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
  questionSets:  Array<LocalQuestionSet >,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
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
};

export type UpdateTestInput = {
  id: string,
  category?: string | null,
  dateTime?: string | null,
  duration?: number | null,
  total?: number | null,
  wrong?: number | null,
  correct?: number | null,
  questionSets?: Array< LocalQuestionSetInput > | null,
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
  _version?: number | null,
};

export type ModelEssayConditionInput = {
  type?: ModelStringInput | null,
  level?: ModelStringInput | null,
  topic?: ModelStringInput | null,
  prompt?: ModelStringInput | null,
  text?: ModelStringInput | null,
  DateTime?: ModelStringInput | null,
  and?: Array< ModelEssayConditionInput | null > | null,
  or?: Array< ModelEssayConditionInput | null > | null,
  not?: ModelEssayConditionInput | null,
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
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateEssayInput = {
  id: string,
  type?: string | null,
  level?: string | null,
  topic?: string | null,
  prompt?: string | null,
  text?: string | null,
  DateTime?: string | null,
  _version?: number | null,
};

export type DeleteEssayInput = {
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
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
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
  correctCount?: ModelIntInput | null,
  wrongCount?: ModelIntInput | null,
  badCount?: ModelIntInput | null,
  and?: Array< ModelQuestionSetFilterInput | null > | null,
  or?: Array< ModelQuestionSetFilterInput | null > | null,
  not?: ModelQuestionSetFilterInput | null,
};

export type ModelQuestionSetConnection = {
  __typename: "ModelQuestionSetConnection",
  items:  Array<QuestionSet | null >,
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
  and?: Array< ModelTestFilterInput | null > | null,
  or?: Array< ModelTestFilterInput | null > | null,
  not?: ModelTestFilterInput | null,
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
  and?: Array< ModelEssayFilterInput | null > | null,
  or?: Array< ModelEssayFilterInput | null > | null,
  not?: ModelEssayFilterInput | null,
};

export type ModelEssayConnection = {
  __typename: "ModelEssayConnection",
  items:  Array<Essay | null >,
  nextToken?: string | null,
  startedAt?: number | null,
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
  correctCount?: ModelSubscriptionIntInput | null,
  wrongCount?: ModelSubscriptionIntInput | null,
  badCount?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionQuestionSetFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestionSetFilterInput | null > | null,
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

export type ModelSubscriptionTestFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  category?: ModelSubscriptionStringInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  duration?: ModelSubscriptionIntInput | null,
  total?: ModelSubscriptionIntInput | null,
  wrong?: ModelSubscriptionIntInput | null,
  correct?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionTestFilterInput | null > | null,
  or?: Array< ModelSubscriptionTestFilterInput | null > | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    correctCount: number,
    wrongCount: number,
    badCount: number,
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
    correctCount: number,
    wrongCount: number,
    badCount: number,
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
    correctCount: number,
    wrongCount: number,
    badCount: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    } >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    } >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    } >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    correctCount: number,
    wrongCount: number,
    badCount: number,
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
      correctCount: number,
      wrongCount: number,
      badCount: number,
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
      correctCount: number,
      wrongCount: number,
      badCount: number,
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
    } >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
      } >,
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
      } >,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionSetFilterInput | null,
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
    correctCount: number,
    wrongCount: number,
    badCount: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionSetFilterInput | null,
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
    correctCount: number,
    wrongCount: number,
    badCount: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteQuestionSetSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionSetFilterInput | null,
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
    correctCount: number,
    wrongCount: number,
    badCount: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    } >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    } >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    } >,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
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
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
