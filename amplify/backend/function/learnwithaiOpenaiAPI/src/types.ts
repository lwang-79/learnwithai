export enum APIOperation {
  WritingPrompt = 'writing-prompt',
  WritingMark = 'writing-mark',
  WritingPolish = 'writing-polish',
  MathAnswer = 'math-answer',
  MathQuestion = 'math-question',
  MathDataset = 'math-dataset',
  AskAnything = 'ask-anything',
}

export type APIResponse = {
  statusCode: number;
  data?: any;
  error?: string
};

export enum QuestionType {
  MultiChoice = 'multi-choice',
}

export enum MathConcept {
  // Addition = 'addition',
  // Subtraction = 'subtraction',
  // Multiplication = 'multiplication',
  // Division = 'division',
  Arithmetic = 'arithmetic',
  Decimals = 'decimals',
  Percentage = 'percentage',
  Ratio = 'ratio',
  Fractions = 'fractions',
  TimeJourney = 'time or journey'
  // Probability = 'probability',
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

export enum QuestionCategory {
  Math = 'mathematics',
  AdvancedMath = 'advanced mathematics'
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
  GSM8K = 'GSM8K',
  MathQA = 'MathQA',
  // AQuA = 'AQuA',
  Level1 = 'Level 1',
  Level2 = 'Level 2',
  Level3 = 'Level 3',
  Level4 = 'Level 4',
  Level5 = 'Level 5',
  // Primary = 'primary school',
  // Middle = 'middle school',
  // High = 'high school'
}

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

export enum EssayTopic {
  Society = 'society',
  Culture = 'culture',
  Science = 'science',
  Technology = 'technology',
  History = 'history',
  Politics = 'politics'
  // Creative = 'creative'
  // Narrative = 'narrative',
  // Reading = 'reading'
}

export enum EssayType {
  Persuasive = 'persuasive',
  // Expository = 'expository',
  // Descriptive = 'descriptive',
  Narrative = 'narrative'
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

export type GSM8KQuestion = {
  question: string
  answer: string
}

export type CompetitionQuestion = {
  problem: string
  level: string
  type: string
  solution: string
}