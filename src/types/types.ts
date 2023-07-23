export enum APIName {
  OpenAI = 'openai',
}

export enum APIOperation {
  WritingPrompt = 'writing-prompt',
  WritingMark = 'writing-mark',
  WritingPolish = 'writing-polish',
  MathAnswer = 'math-answer',
  MathQuestion = 'math-question',
  MathDataset = 'math-dataset',
  AskAnything = 'ask-anything',
  StemQuestion = 'stem-question',
  Chat = 'chat'
}

export enum QuestionSource {
  ChatGPT3 = 'ChatGPT-3',
  ChatGPT4 = 'ChatGPT-4',
  Hendrycks = 'Hendrycks MATH',
  GSM8K = 'GMS8K',
  MathQA = 'MathQA',
  Competition = 'Competition',
  SavedQuestions = 'Saved Questions'
}

export enum QuestionRunMode {
  Practice = 'practice',
  Test = 'test',
  Review = 'review',
}

export enum QuestionType {
  MultiChoice = 'multi-choice',
}

export enum HendrycksConcept {
  Algebra = 'Algebra',
  Prealgebra = 'Prealgebra',
  IntermediateAlgebra = 'Intermediate Algebra',
  Geometry = 'Geometry',
  NumberTheory = 'Number Theory',
  Precalculus = 'Precalculus',
  CountingProbability = 'Counting & Probability',
}

export enum MathConcept {
  Arithmetic = 'arithmetic',
  Decimals = 'decimals',
  Percentage = 'percentage',
  Ratio = 'ratio',
  Fractions = 'fractions',
  TimeJourney = 'time or journey',
  Probability = 'probability',
  // Statistics = 'statistics',
  // Algebra = 'algebra',
  // Measurement = 'measurement',
  // Time = 'time',
  // Shopping = 'shopping',
  // Production = 'production',
  // Profit = 'profit',
  // // ProblemSolving = 'problem solving',
  // TwoPartJourney = 'two-part journey',
  // Banking = 'banking',
  // Polynomials = 'polynomials',
  // // Geometry = 'geometry',
  // Trigonometry = 'trigonometry',
  // Functions = 'functions',
  // ComplexNumbers = 'complex numbers',
  // Sequences = 'sequences',
  // Series = 'series',
  // Vectors = 'vectors',
  // Matrices = 'matrices',
  // // DifferentialEquations = 'differential equations',
  // // Calculus = 'calculus',

  // Geometry = 'geometry',
  // Equations = 'equations',
  // CoordinateGeometry = 'coordinate geometry',
  // Indices = 'indices',
  // MeasurementPerimeter = 'measurement perimeter',
  // MeasurementArea = 'measurement area',
}

export enum StemConcept {
  Science = 'science',
  Astronomy = 'astronomy',
  Biology = 'biology',
  Chemistry = 'chemistry',
  ComputerScience = 'computer science',
  Electrical = 'electrical',
  Mathematics = 'mathematics',
  Medicine = 'medicine',
  Physics = 'physics',
  ConceptualPhysics = 'conceptual physics',
  Statistics = 'statistics',
}

export enum QuestionCategory {
  Math = 'mathematics',
  AdvancedMath = 'advanced mathematics',
  Stem = 'stem'
}

export enum QuestionLevel {
  Year1 = 'Year-1',
  Year2 = 'Year-2',
  Year3 = 'Year-3',
  Year4 = 'Year-4',
  Year5 = 'Year-5',
  Year6 = 'Year-6',
  Year7 = 'Year-7',
  Year8 = 'Year-8',
  Year9 = 'Year-9',
  Year10 = 'Year-10',
  Year11 = 'Year-11',
  Year12 = 'Year-12',
  Level1 = 'Level 1',
  Level2 = 'Level 2',
  Level3 = 'Level 3',
  Level4 = 'Level 4',
  Level5 = 'Level 5',
  // Primary = 'primary school',
  // Middle = 'middle school',
  // High = 'high school'
}

export enum EssayTopic {
  Society = 'society',
  Culture = 'culture',
  Science = 'science',
  Technology = 'technology',
  History = 'history',
  Politics = 'politics'
}

export enum EssayType {
  Persuasive = 'persuasive',
  // Expository = 'expository',
  // Descriptive = 'descriptive',
  Narrative = 'narrative',
  Custom = 'custom'
}

export type APIResponse = {
  statusCode: number;
  data?: any;
  error?: string
};

export type QuestionSet = {
  type: string,
  category: string,
  level: string,
  concept: string,
  question: string,
  options: string[],
  answer: string,
  selected: string,
  workout: string,
  isBad: boolean,
  isTarget: boolean,
  isMarked?: boolean | null
}

export type AQuAQuestion = {
  question: string
  rationale: string
  options: string[]
  correct: string
}

export type MathQAQuestion = {
  Problem: string
  Rationale: string
  options: string
  correct: string
  category: string
}

export type HendrycksQuestion = {
  problem: string
  level: string
  type: string
  solution: string
}

export type GSM8KQuestion = {
  question: string
  answer: string
}

export type StemQuestion = {
  concept: string,
  question: string,
  options: string[],
  answer: string
}

export type CompetitionQuestion = {
  problem: string
  level: string
  type: string
  solution: string
}