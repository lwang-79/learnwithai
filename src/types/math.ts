import { MathConcept, QuestionLevel } from "./types";

export const getConcepts = (level: QuestionLevel): MathConcept[] => {
  switch (level) {
    case QuestionLevel.Year1: 
      return Year1Concepts;
    case QuestionLevel.Year2:
      return Year2Concepts;
    case QuestionLevel.Year3:
      return Year3Concepts;
    case QuestionLevel.Year4:
      return Year4Concepts;
    case QuestionLevel.Year5:
      return Year5Concepts;
    case QuestionLevel.Year6:
      return Year6Concepts
    case QuestionLevel.Primary:
    case QuestionLevel.Year7:
    case QuestionLevel.Year8:
    case QuestionLevel.Year9:
    case QuestionLevel.Middle:
    case QuestionLevel.Year10:
    case QuestionLevel.Year11:
    case QuestionLevel.Year12:
    case QuestionLevel.High:
    default:
      return []
  }
}

const Year1Concepts = [
  MathConcept.Arithmetic,
]

const Year2Concepts = [
  ...Year1Concepts,
]

const Year3Concepts = [
  ...Year2Concepts,
]

const Year4Concepts = [
  MathConcept.Decimals,
  MathConcept.Arithmetic,
]

const Year5Concepts = [
  ...Year4Concepts,
]

const Year6Concepts = [
  ...Year4Concepts
]

// const PrimarySchool = [
//   ...Year6Concepts,
//   MathConcept.Arithmetic,
//   MathConcept.Decimals,
//   MathConcept.Measurement,
//   MathConcept.Time,
//   MathConcept.Shopping,
//   MathConcept.Production
// ]

// const MiddleSchool = [
//   ...Year6Concepts,
//   MathConcept.Banking,
//   MathConcept.Polynomials
// ]

// const HighSchool = [
//   ...MiddleSchool,
//   MathConcept.ComplexNumbers,
//   MathConcept.Sequences,
//   MathConcept.Trigonometry,
//   MathConcept.Functions,
//   MathConcept.Series,
//   MathConcept.Vectors,
//   MathConcept.Matrices
// ]