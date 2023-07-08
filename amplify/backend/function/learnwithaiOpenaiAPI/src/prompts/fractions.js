"use strict";
exports.__esModule = true;
exports.generateFractionsPrompt = void 0;
var types_1 = require("../types");
var math_1 = require("./math");
function generateFractionsPrompt(level) {
    var lowOperations = ['addition', 'subtraction'];
    var highOperations = ['multiplication', 'division'];
    var randomIndex = Math.floor(Math.random() * 2);
    var random = Math.random();
    var prompt = '';
    switch (level) {
        case types_1.QuestionLevel.Year1:
        case types_1.QuestionLevel.Year2:
        case types_1.QuestionLevel.Year3:
            prompt = generalFractionsPrompt(lowOperations[randomIndex]);
            break;
        case types_1.QuestionLevel.Year4:
            if (random < 0.3) {
                prompt = generalFractionsPrompt(lowOperations[randomIndex], 10, -10, 1);
            }
            else if (random < 0.5) {
                prompt = lowFractionsPrompt();
            }
            else {
                prompt = generalFractionsPrompt(highOperations[randomIndex], 10, 0, 1);
            }
            break;
        case types_1.QuestionLevel.Year5:
            if (random < 0.1) {
                prompt = generalFractionsPrompt(lowOperations[randomIndex], 10, -10, 1);
            }
            else if (random < 0.7) {
                prompt = lowFractionsPrompt();
            }
            else if (random < 0.8) {
                prompt = middleFractionsPrompt();
            }
            else {
                prompt = generalFractionsPrompt(highOperations[randomIndex], 10, 0, 1);
            }
            break;
        case types_1.QuestionLevel.Year6:
            if (random < 0.1) {
                prompt = generalFractionsPrompt(lowOperations[randomIndex], 10, -10, 1);
            }
            else if (random < 0.3) {
                prompt = lowFractionsPrompt();
            }
            else if (random < 0.5) {
                prompt = middleFractionsPrompt();
            }
            else if (random < 0.8) {
                prompt = highFractionsPrompt();
            }
            else {
                prompt = generalFractionsPrompt(highOperations[randomIndex], 10, 0, 1);
            }
            break;
        default:
            if (random < 0.2) {
                prompt = lowFractionsPrompt();
            }
            else if (random < 0.5) {
                prompt = middleFractionsPrompt();
            }
            else {
                prompt = highFractionsPrompt();
            }
    }
    return [
        { role: 'system', content: 'You are a math teacher.' },
        { role: 'user', content: prompt }
    ];
}
exports.generateFractionsPrompt = generateFractionsPrompt;
function generalFractionsPrompt(operation, upper, lower, workoutNumber) {
    if (operation === void 0) { operation = 'addition'; }
    if (upper === void 0) { upper = 10; }
    if (lower === void 0) { lower = 0; }
    if (workoutNumber === void 0) { workoutNumber = 1; }
    return "\n  Give a ".concat(operation, " math multi-choice question with the following conditions.\n  1. The operands should be fractions with denominator less than ").concat(upper, " and greater than ").concat(lower, ".\n  2. There should be 4 options including the answer.\n  3. Work out the question with at least ").concat(workoutNumber, " method.\n  4. ").concat(math_1.template, "\n  ");
}
function lowFractionsPrompt() {
    return "\n  Give a low level difficulty math multiplication multi-choice question with the following conditions.\n  1. Choose two positive fractions with denominator less than 10.\n  2. Make a short story with these numbers, such as \"A recipe for a cake calls for 3/4 cup of sugar. If you want to make half the recipe, how much sugar do you need?\"\n  3. There should be 4 options including the correct answer.\n  4. Work out the question with at least 1 method.\n  5. ".concat(math_1.template, "\n  ");
}
function middleFractionsPrompt() {
    return "\n  Give a middle level difficulty math multiplication multi-choice question with the following conditions.\n  1. Choose two positive fractions with denominator less than 10.\n  2. Make a short story with these numbers, such as \"John can paint a room in 6 hours, and Tom can paint the same room in 4 hours. How long will it take for them to paint the room working together?\"\n  3. There should be 4 options including the correct answer.\n  4. Work out the question with at least 2 methods.\n  5. ".concat(math_1.template, "\n  ");
}
function highFractionsPrompt() {
    return "\n  Give a high level difficulty math multiplication multi-choice question with the following conditions.\n  1. Choose two fractions with denominator less than 10.\n  2. Make a short story with these numbers, such as \"A water tank can be filled by two pipes. Pipe A can fill the tank in 6 hours, and pipe B can fill the tank in 4 hours. However, there is a hole in the tank that allows water to leak out, which can empty the full tank in 9 hours. If the tank is empty to start, how long will it take for both pipes A and B to fill the tank if the hole is fixed?\"\n  3. There should be 4 options including the correct answer.\n  4. Work out the question with at least 2 methods.\n  5. ".concat(math_1.template, "\n  ");
}
