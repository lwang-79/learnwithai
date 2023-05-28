"use strict";
exports.__esModule = true;
exports.generateArithmeticPrompt = void 0;
var types_1 = require("../types");
var math_1 = require("./math");
function generateArithmeticPrompt(level) {
    var lowOperations = ['addition', 'subtraction'];
    var highOperations = ['multiplication', 'division'];
    var randomIndex = Math.floor(Math.random() * 2);
    var random = Math.random();
    var prompt = '';
    switch (level) {
        case types_1.QuestionLevel.Year1:
            prompt = generalArithmeticPrompt(lowOperations[randomIndex]);
            break;
        case types_1.QuestionLevel.Year2:
            prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'integer', 100, 0);
            break;
        case types_1.QuestionLevel.Year3:
            if (random < 0.7) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'integer', 100, 0);
            }
            else {
                prompt = lowMultiplicationPrompt();
            }
            break;
        case types_1.QuestionLevel.Year4:
            if (random < 0.2) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'integer', 1000, 100, 2);
            }
            else if (random < 0.5) {
                prompt = middleMultiplicationPrompt();
            }
            else {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'integer', 100, 0, 2);
            }
            break;
        case types_1.QuestionLevel.Year5:
            if (random < 0.1) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'integer', 1000, 100, 2);
            }
            else if (random < 0.7) {
                prompt = middleMultiplicationPrompt();
            }
            else if (random < 0.8) {
                prompt = highArithmeticPrompt();
            }
            else {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'integer', 100, 0, 2);
            }
            break;
        case types_1.QuestionLevel.Year6:
            if (random < 0.1) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'integer', 1000, 100, 2);
            }
            else if (random < 0.5) {
                prompt = middleMultiplicationPrompt();
            }
            else if (random < 0.8) {
                prompt = highArithmeticPrompt();
            }
            else {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'integer', 100, 0, 2);
            }
            break;
        default:
            if (random < 0.3) {
                prompt = middleMultiplicationPrompt();
            }
            else if (random < 0.9) {
                prompt = highArithmeticPrompt();
            }
            else {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'integer', 100, 0, 2);
            }
    }
    console.log(prompt);
    return [
        { role: 'system', content: 'You are a math teacher.' },
        { role: 'user', content: prompt }
    ];
}
exports.generateArithmeticPrompt = generateArithmeticPrompt;
function generalArithmeticPrompt(operation, operandType, upper, lower, workoutNumber) {
    if (operation === void 0) { operation = 'addition'; }
    if (operandType === void 0) { operandType = 'integer'; }
    if (upper === void 0) { upper = 10; }
    if (lower === void 0) { lower = 0; }
    if (workoutNumber === void 0) { workoutNumber = 1; }
    return "\n  Give a ".concat(operation, " math multi-choice question with the following conditions.\n  1. The operands should be ").concat(operandType, " less than ").concat(upper, " and greater than ").concat(lower, ".\n  2. There should be 4 options including the answer.\n  3. Work out the question with at least ").concat(workoutNumber, " method.\n  4. ").concat(math_1.template, "\n  ");
}
function lowMultiplicationPrompt() {
    return "\n  Give a low level difficulty math multiplication multi-choice question with the following conditions.\n  1. Choose two positive integers less than 10. The product of these two numbers is less than 20.\n  2. Make a short story with these numbers, such as \"Dad gives 3 dollars to Jack every day, how much does Jack have after 2 days?\"\n  3. There should be 4 options including the correct answer.\n  4. Work out the question with at least 1 method.\n  5. ".concat(math_1.template, "\n  ");
}
function middleMultiplicationPrompt() {
    return "\n  Give a middle level difficulty math multiplication multi-choice question with the following conditions.\n  1. Make a short story with these numbers, such as \"An ice cream shop is testing some new flavours of ice cream. They invent 30 new flavours for customers to try and discard the 15 least popular new flavours. The shop makes 40 litres of each of the remaining flavours. How many litres of ice cream did the shop make?\"\n  2. There should be 4 options including the correct answer.\n  3. Work out the question with at least 2 methods.\n  4. ".concat(math_1.template, "\n  ");
}
function highArithmeticPrompt() {
    return "\n  Give a high level difficulty math multiplication multi-choice question with the following conditions.\n  1. Make a short story with these numbers, such as \"Bianca's mum just took roast lamb out of the oven and set it aside to rest. The core temperature right now is 170 Fahrenheit and will drop 10 Fahrenheit every 5 minutes. If it rests for 20 minutes, what will the final core temperature be?\"\n  2. There should be 4 options including the correct answer.\n  3. Work out the question with at least 2 methods.\n  4. ".concat(math_1.template, "\n  ");
}
