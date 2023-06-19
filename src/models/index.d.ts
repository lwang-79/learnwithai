import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum NotificationType {
  MONTHLY = "Monthly",
  WEEKLY = "Weekly",
  DAILY = "Daily",
  INSTANT = "Instant"
}

export enum RankingType {
  MATH_CORRECT_NUMBER_BY_DAY = "MathCorrectNumberByDay",
  MATH_CORRECT_NUMBER_BY_MONTH = "MathCorrectNumberByMonth",
  WRITING_NUMBER_BY_DAY = "WritingNumberByDay",
  WRITING_NUMBER_BY_MONTH = "WritingNumberByMonth"
}

type EagerMembership = {
  readonly current: number;
  readonly previous: number;
  readonly paypalSubscriptions: Subscriptions;
}

type LazyMembership = {
  readonly current: number;
  readonly previous: number;
  readonly paypalSubscriptions: Subscriptions;
}

export declare type Membership = LazyLoading extends LazyLoadingDisabled ? EagerMembership : LazyMembership

export declare const Membership: (new (init: ModelInit<Membership>) => Membership)

type EagerSubscriptions = {
  readonly personal: (string | null)[];
  readonly professional: (string | null)[];
  readonly enterprise: (string | null)[];
}

type LazySubscriptions = {
  readonly personal: (string | null)[];
  readonly professional: (string | null)[];
  readonly enterprise: (string | null)[];
}

export declare type Subscriptions = LazyLoading extends LazyLoadingDisabled ? EagerSubscriptions : LazySubscriptions

export declare const Subscriptions: (new (init: ModelInit<Subscriptions>) => Subscriptions)

type EagerQuota = {
  readonly mathPerDay: number;
  readonly readingPerDay: number;
  readonly writingPerDay: number;
  readonly savedQuestions: number;
  readonly savedTests: number;
  readonly savedEssays: number;
}

type LazyQuota = {
  readonly mathPerDay: number;
  readonly readingPerDay: number;
  readonly writingPerDay: number;
  readonly savedQuestions: number;
  readonly savedTests: number;
  readonly savedEssays: number;
}

export declare type Quota = LazyLoading extends LazyLoadingDisabled ? EagerQuota : LazyQuota

export declare const Quota: (new (init: ModelInit<Quota>) => Quota)

type EagerStatistic = {
  readonly date: string;
  readonly mathCorrect: number;
  readonly mathWrong: number;
  readonly mathExam: number;
  readonly mathRequest: number;
  readonly readingCorrect: number;
  readonly readingWrong: number;
  readonly readingRequest: number;
  readonly writing: number;
  readonly writingRequest: number;
}

type LazyStatistic = {
  readonly date: string;
  readonly mathCorrect: number;
  readonly mathWrong: number;
  readonly mathExam: number;
  readonly mathRequest: number;
  readonly readingCorrect: number;
  readonly readingWrong: number;
  readonly readingRequest: number;
  readonly writing: number;
  readonly writingRequest: number;
}

export declare type Statistic = LazyLoading extends LazyLoadingDisabled ? EagerStatistic : LazyStatistic

export declare const Statistic: (new (init: ModelInit<Statistic>) => Statistic)

type EagerGameData = {
  readonly startDate: string;
  readonly level: number;
  readonly score: number;
  readonly seed: string;
  readonly collections: string;
}

type LazyGameData = {
  readonly startDate: string;
  readonly level: number;
  readonly score: number;
  readonly seed: string;
  readonly collections: string;
}

export declare type GameData = LazyLoading extends LazyLoadingDisabled ? EagerGameData : LazyGameData

export declare const GameData: (new (init: ModelInit<GameData>) => GameData)

type EagerNotification = {
  readonly emails: (string | null)[];
  readonly types: (NotificationType | null)[] | keyof typeof NotificationType;
}

type LazyNotification = {
  readonly emails: (string | null)[];
  readonly types: (NotificationType | null)[] | keyof typeof NotificationType;
}

export declare type Notification = LazyLoading extends LazyLoadingDisabled ? EagerNotification : LazyNotification

export declare const Notification: (new (init: ModelInit<Notification>) => Notification)

type EagerOptionStates = {
  readonly mathMode?: string | null;
  readonly mathNumber?: number | null;
  readonly mathSource?: string | null;
  readonly mathLevel?: string | null;
  readonly mathConcepts?: (string | null)[] | null;
  readonly writingType?: string | null;
  readonly writingTopic?: string | null;
  readonly writingLevel?: string | null;
  readonly stemMode?: string | null;
  readonly stemNumber?: number | null;
  readonly stemLevel?: string | null;
  readonly stemConcepts?: (string | null)[] | null;
}

type LazyOptionStates = {
  readonly mathMode?: string | null;
  readonly mathNumber?: number | null;
  readonly mathSource?: string | null;
  readonly mathLevel?: string | null;
  readonly mathConcepts?: (string | null)[] | null;
  readonly writingType?: string | null;
  readonly writingTopic?: string | null;
  readonly writingLevel?: string | null;
  readonly stemMode?: string | null;
  readonly stemNumber?: number | null;
  readonly stemLevel?: string | null;
  readonly stemConcepts?: (string | null)[] | null;
}

export declare type OptionStates = LazyLoading extends LazyLoadingDisabled ? EagerOptionStates : LazyOptionStates

export declare const OptionStates: (new (init: ModelInit<OptionStates>) => OptionStates)

type EagerLocalQuestionSet = {
  readonly type: string;
  readonly category: string;
  readonly level: string;
  readonly concept: string;
  readonly question: string;
  readonly options: string[];
  readonly answer: string;
  readonly selected: string;
  readonly workout: string;
  readonly isBad: boolean;
  readonly isTarget: boolean;
  readonly isMarked?: boolean | null;
}

type LazyLocalQuestionSet = {
  readonly type: string;
  readonly category: string;
  readonly level: string;
  readonly concept: string;
  readonly question: string;
  readonly options: string[];
  readonly answer: string;
  readonly selected: string;
  readonly workout: string;
  readonly isBad: boolean;
  readonly isTarget: boolean;
  readonly isMarked?: boolean | null;
}

export declare type LocalQuestionSet = LazyLoading extends LazyLoadingDisabled ? EagerLocalQuestionSet : LazyLocalQuestionSet

export declare const LocalQuestionSet: (new (init: ModelInit<LocalQuestionSet>) => LocalQuestionSet)

type EagerLambdaResponse = {
  readonly statusCode: number;
  readonly body: string;
}

type LazyLambdaResponse = {
  readonly statusCode: number;
  readonly body: string;
}

export declare type LambdaResponse = LazyLoading extends LazyLoadingDisabled ? EagerLambdaResponse : LazyLambdaResponse

export declare const LambdaResponse: (new (init: ModelInit<LambdaResponse>) => LambdaResponse)

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly username: string;
  readonly email: string;
  readonly picture: string;
  readonly quota?: Quota | null;
  readonly membership?: Membership | null;
  readonly payerId?: string | null;
  readonly markedQuestions?: string[] | null;
  readonly daily?: Statistic[] | null;
  readonly monthly?: Statistic[] | null;
  readonly yearly?: Statistic[] | null;
  readonly gameData?: GameData | null;
  readonly notification?: Notification | null;
  readonly optionStates?: OptionStates | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sub: string;
  readonly username: string;
  readonly email: string;
  readonly picture: string;
  readonly quota?: Quota | null;
  readonly membership?: Membership | null;
  readonly payerId?: string | null;
  readonly markedQuestions?: string[] | null;
  readonly daily?: Statistic[] | null;
  readonly monthly?: Statistic[] | null;
  readonly yearly?: Statistic[] | null;
  readonly gameData?: GameData | null;
  readonly notification?: Notification | null;
  readonly optionStates?: OptionStates | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerQuestionSet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<QuestionSet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly question: string;
  readonly options?: string[] | null;
  readonly answer: string;
  readonly workout?: string | null;
  readonly type: string;
  readonly category: string;
  readonly level: string;
  readonly concept: string;
  readonly testId?: string | null;
  readonly indexInTest?: number | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuestionSet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<QuestionSet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly question: string;
  readonly options?: string[] | null;
  readonly answer: string;
  readonly workout?: string | null;
  readonly type: string;
  readonly category: string;
  readonly level: string;
  readonly concept: string;
  readonly testId?: string | null;
  readonly indexInTest?: number | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type QuestionSet = LazyLoading extends LazyLoadingDisabled ? EagerQuestionSet : LazyQuestionSet

export declare const QuestionSet: (new (init: ModelInit<QuestionSet>) => QuestionSet) & {
  copyOf(source: QuestionSet, mutator: (draft: MutableModel<QuestionSet>) => MutableModel<QuestionSet> | void): QuestionSet;
}

type EagerBadQuestionSet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BadQuestionSet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly source: string;
  readonly question: string;
  readonly options?: string[] | null;
  readonly answer: string;
  readonly workout?: string | null;
  readonly type: string;
  readonly category: string;
  readonly level: string;
  readonly concept: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBadQuestionSet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BadQuestionSet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly source: string;
  readonly question: string;
  readonly options?: string[] | null;
  readonly answer: string;
  readonly workout?: string | null;
  readonly type: string;
  readonly category: string;
  readonly level: string;
  readonly concept: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BadQuestionSet = LazyLoading extends LazyLoadingDisabled ? EagerBadQuestionSet : LazyBadQuestionSet

export declare const BadQuestionSet: (new (init: ModelInit<BadQuestionSet>) => BadQuestionSet) & {
  copyOf(source: BadQuestionSet, mutator: (draft: MutableModel<BadQuestionSet>) => MutableModel<BadQuestionSet> | void): BadQuestionSet;
}

type EagerTest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Test, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly category: string;
  readonly dateTime: string;
  readonly duration?: number | null;
  readonly total: number;
  readonly wrong: number;
  readonly correct: number;
  readonly source?: string | null;
  readonly questionSets: LocalQuestionSet[];
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Test, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly category: string;
  readonly dateTime: string;
  readonly duration?: number | null;
  readonly total: number;
  readonly wrong: number;
  readonly correct: number;
  readonly source?: string | null;
  readonly questionSets: LocalQuestionSet[];
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Test = LazyLoading extends LazyLoadingDisabled ? EagerTest : LazyTest

export declare const Test: (new (init: ModelInit<Test>) => Test) & {
  copyOf(source: Test, mutator: (draft: MutableModel<Test>) => MutableModel<Test> | void): Test;
}

type EagerEssay = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Essay, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly level: string;
  readonly topic: string;
  readonly prompt: string;
  readonly text: string;
  readonly DateTime: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEssay = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Essay, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly level: string;
  readonly topic: string;
  readonly prompt: string;
  readonly text: string;
  readonly DateTime: string;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Essay = LazyLoading extends LazyLoadingDisabled ? EagerEssay : LazyEssay

export declare const Essay: (new (init: ModelInit<Essay>) => Essay) & {
  copyOf(source: Essay, mutator: (draft: MutableModel<Essay>) => MutableModel<Essay> | void): Essay;
}

type EagerRankingItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RankingItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly type: RankingType | keyof typeof RankingType;
  readonly names: string[];
  readonly values: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRankingItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RankingItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly type: RankingType | keyof typeof RankingType;
  readonly names: string[];
  readonly values: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RankingItem = LazyLoading extends LazyLoadingDisabled ? EagerRankingItem : LazyRankingItem

export declare const RankingItem: (new (init: ModelInit<RankingItem>) => RankingItem) & {
  copyOf(source: RankingItem, mutator: (draft: MutableModel<RankingItem>) => MutableModel<RankingItem> | void): RankingItem;
}