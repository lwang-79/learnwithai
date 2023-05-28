"use strict";
exports.__esModule = true;
// export const getMessageByConcept = (
//   concept: MathConcept,
//   level: QuestionLevel,
//   category: QuestionCategory
// ): string => {
//   const l = convertLevel(level);
//   const al = adjustLevel(l, concept);
//   const general = `
//   1. Give a ${al} level difficulty ${concept} ${category} question.
//   `;
//   const custom = `
//   Give a ${al} level difficulty ${concept} ${category} question.
//   `
//   switch (concept) {
//     case MathConcept.TwoPartJourney:
//       return twoPartJourneyQuestion;
//     case MathConcept.Addition:
//     case MathConcept.Subtraction:
//     case MathConcept.Multiplication:
//     case MathConcept.Division:
//     case MathConcept.Arithmetic:
//       return custom + arithmeticQuestion;
//     default:
//       return general + generalPrompt;
//   }
// }
// const convertLevel = (level: QuestionLevel) => {
//   switch (level) {
//     case QuestionLevel.Year1:
//     case QuestionLevel.Year2:
//     case QuestionLevel.Year3:
//       return 'low'
//     case QuestionLevel.Year4:
//     case QuestionLevel.Year5:
//     case QuestionLevel.Year6:
//       return 'lower-middle'
//     case QuestionLevel.Year7:
//     case QuestionLevel.Year8:
//       return 'middle'
//     case QuestionLevel.Year9:
//     case QuestionLevel.Year10:
//       return 'higher-middle'
//     case QuestionLevel.Year11:
//     case QuestionLevel.Year12:
//       return 'high'
//     default:
//       return level
//   }
// }
// const adjustLevel = (l: string, c: MathConcept) => {
//   if ([
//     MathConcept.Addition, 
//     MathConcept.Subtraction, 
//     MathConcept.Multiplication,
//     MathConcept.Division,
//     MathConcept.Arithmetic
//   ].includes(c) && l.includes('high')) {
//     return 'middle';
//   }
//   return l;
// }
var twoPartJourneyQuestion = "\nThe formula is distance = speed x time\n1 hour (h) = 60 minutes (m)\n1 minutes (m) = 60 seconds (s)\n1 km = 1000 m\nPlease give a two-part journey question. And work out the answer. \nExample:\n###\nA cyclist travels a distance of 200 km at an average speed of 20 km/h. After taking a 2-hour break, the cyclist rides another 300 km at an average speed of 25 km/h. What is the total time taken for the entire trip in hours?\nTotal time taken for the entire trip = (time taken for first part of trip) + (time taken for second part of trip) + (break time)\n= (200 km \u00F7 20 km/h) + (300 km \u00F7 25 km/h) + 2 hours\n= 10 hours + 12 hours + 2 hours\n= 24 hours\n###\nThe answer can be distance or speed or time.\nDesired template:\nQuestion: <>\nWorkout: <Brief workout no more than 50 words>\nA: <option>\nB: <option>\nC: <option>\nD: <option>\nAnswer: <A, B, C or D>\n";
var generalPrompt = "\n2. Work out the answer in 3 different ways.\n3. Choose the answer that has more frequency as the correct answer. If no correct answers go to step 1 to regenerate a new question.\n4. Put the correct answer in 4 options. \n5. Double-check if the answer is in the options.\n6. Strictly follow the template.\nDesired template:\nQuestion: <>\nWorkout: <>\nOptions:\nA: <option>\nB: <option>\nC: <option>\nD: <option>\nAnswer: <A, B, C or D>\n";
var problemSolving = "\n2. Work out the answer in 3 different ways.\n3. Choose the answer that has more frequency as the correct answer. If no correct answers go to step 1 to regenerate a new question.\n4. Put the correct answer in 4 options. \n5. Double-check if the answer is in the options.\n6. Strictly follow the template.\nDesired template:\nQuestion: <>\nWorkout: <>\nOptions:\nA: <option>\nB: <option>\nC: <option>\nD: <option>\nAnswer: <A, B, C or D>\n";
var arithmeticQuestion = "\nThe returned string should include a question, a workout detail, \nfour answer options tagged with (A, B, C, D)\nand the answer tag (A, B, C or D). \nStep 1. Generate a question.\nStep 2. Work out the answer with more than one methods.\nStep 3. Put the answer to question to double check the calculation. \nStep 4. If pass the checking put the correct answer in only four options, otherwise go to Step 1.\nStep 6. Generate the question set by strictly following the template.\nDesired template:\nQuestion: <>\nWorkout: <>\nOptions:\nA: <option>\nB: <option>\nC: <option>\nD: <option>\nAnswer: <A, B, C or D>\n";
var essayPrompt = "\nEvaluate a student's essay\n1. Consider the following facts \"Knowledge, understanding and control\", \"Response to essay prompt\", \"Use of evidence\", \"Structure of response\" and \"Spelling and Punctuation\".\n2. Give a score from 0 to 100 according to your evaluation.\n3. Give comments on the thing doing well and things that need to improve.\n\nEssay prompt:\n[]\nStudent's Essay:\n[]\n";
// The set includes a question, a workout detail, 
// four options tagged with (A, B, C, D) for the answer 
// and the answer tag (A, B, C or D). 
