"use strict";
exports.__esModule = true;
exports.template = exports.generateChatMessages = void 0;
var types_1 = require("../types");
var arithmetic_1 = require("./arithmetic");
var decimals_1 = require("./decimals");
var fractions_1 = require("./fractions");
var percentage_1 = require("./percentage");
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
        default:
            return [{ role: 'system', content: 'You are a math teacher.' },];
    }
}
exports.generateChatMessages = generateChatMessages;
exports.template = "\nDesired template:\nQuestion: <>\nWorkout:\nMethod1: <>\nOptions:\nA: <option>\nB: <option>\nC: <option>\nD: <option>\nAnswer: <A, B, C or D>\n  ";
