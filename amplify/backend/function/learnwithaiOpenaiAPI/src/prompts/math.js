"use strict";
exports.__esModule = true;
exports.mathTemplate = exports.template = exports.generateChatMessages = void 0;
var types_1 = require("../types");
var arithmetic_1 = require("./arithmetic");
var decimals_1 = require("./decimals");
var fractions_1 = require("./fractions");
var percentage_1 = require("./percentage");
var probability_1 = require("./probability");
var ratio_1 = require("./ratio");
var time_journey_1 = require("./time_journey");
function generateChatMessages(level, concept) {
    switch (concept) {
        case types_1.MathConcept.Arithmetic:
            return (0, arithmetic_1.generateArithmeticPrompt)(level);
        case types_1.MathConcept.Decimals:
            return (0, decimals_1.generateDecimalsPrompt)(level);
        case types_1.MathConcept.Percentage:
            return (0, percentage_1.generatePercentagePrompt)(level);
        case types_1.MathConcept.Ratio:
            return (0, ratio_1.generateRatioPrompt)(level);
        case types_1.MathConcept.Fractions:
            return (0, fractions_1.generateFractionsPrompt)(level);
        case types_1.MathConcept.TimeJourney:
            return (0, time_journey_1.generateTimeJourneyPrompt)(level);
        case types_1.MathConcept.Probability:
            return (0, probability_1.generateProbabilityPrompt)(level);
        default:
            return [{ role: 'system', content: 'You are a math teacher.' },];
    }
}
exports.generateChatMessages = generateChatMessages;
exports.template = "\nUse the desired template:\nQuestion: [Insert question text here]\nWorkout: [Detailed steps to solve the question]\nOptions:\nA: [Option A]\nB: [Option B]\nC: [Option C]\nD: [Option D]\nAnswer: [A, B, C, or D]\n";
// `
// Desired template:
// Question: <>
// Workout:
// Method1: <>
// Options:
// A: <option>
// B: <option>
// C: <option>
// D: <option>
// Answer: <A, B, C or D>
//   `
var mathTemplate = function (level, concept, condition, question, answer, workout, options) {
    return [
        { role: 'system', content: 'You are a math teacher.' },
        { role: 'user', content: "\nGenerate a ".concat(level, " difficulty math ").concat(concept, " question with the following conditions:\n\n").concat(condition, "\n")
        },
        { role: 'assistant', content: "Question: ".concat(question) },
        { role: 'user', content: 'Solve the above question.' },
        { role: 'assistant', content: "\nAnswer: ".concat(answer, "\nWorkout: \n").concat(workout, "\n")
        },
        { role: 'user', content: "Use the above question, answer and workout to form a multi-choice question. Use the desired template:\n\nQuestion: [Insert question text here]\nWorkout: [Explain the method to solve the question]\nOptions:\nA: [Option A]\nB: [Option B]\nC: [Option C]\nD: [Option D]\nAnswer: [A, B, C, or D]\n"
        },
        { role: 'assistant', content: "Question: ".concat(question, "\n\nWorkout: ").concat(workout, "\n\nOptions:\n").concat(options, "\n\nAnswer: C\n")
        },
        { role: 'user', content: "Follow the above process to generate another ".concat(level, " ").concat(concept, " multi-choice math question with the same condition.") },
    ];
};
exports.mathTemplate = mathTemplate;
