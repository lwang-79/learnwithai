export enum QuestionType {
  MultiChoice = 'multi-choice',
}

export enum MathConcept {
  Addition = 'addition',
  Subtraction = 'subtraction',
  Multiplication = 'multiplication',
  Division = 'division',
  Arithmetic = 'arithmetic',
  Decimals = 'decimals',
  Fractions = 'fractions',
  Probability = 'probability',
  Statistics = 'statistics',
  Algebra = 'algebra',
  Measurement = 'measurement',
  Time = 'time',
  Shopping = 'shopping',
  Production = 'production',
  Profit = 'profit',
  // ProblemSolving = 'problem solving',
  TwoPartJourney = 'two-part journey',
  Banking = 'banking',
  Polynomials = 'polynomials',
  // Geometry = 'geometry',
  Trigonometry = 'trigonometry',
  Functions = 'functions',
  ComplexNumbers = 'complex numbers',
  Sequences = 'sequences',
  Series = 'series',
  Vectors = 'vectors',
  Matrices = 'matrices',
  // DifferentialEquations = 'differential equations',
  // Calculus = 'calculus',
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
  Primary = 'primary school',
  Middle = 'middle school',
  High = 'high school'
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
