"use strict";
exports.__esModule = true;
exports.generateDecimalsPrompt = void 0;
var types_1 = require("../types");
var math_1 = require("./math");
function generateDecimalsPrompt(level) {
    var lowOperations = ['addition', 'subtraction'];
    var highOperations = ['multiplication', 'division'];
    var randomIndex = Math.floor(Math.random() * 2);
    var random = Math.random();
    var prompt = '';
    switch (level) {
        case types_1.QuestionLevel.Year1:
        case types_1.QuestionLevel.Year2:
        case types_1.QuestionLevel.Year3:
            if (random < 0.5) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'decimals', 1, 0, 1, 1);
            }
            else {
                prompt = lowDecimalsPrompt();
            }
            break;
        case types_1.QuestionLevel.Year4:
            if (random < 0.3) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'decimals', 1, 0, 2, 1);
            }
            else if (random < 0.5) {
                prompt = middleDecimalsPrompt();
            }
            else {
                prompt = lowDecimalsMultiplicationPrompt();
            }
            break;
        case types_1.QuestionLevel.Year5:
            if (random < 0.2) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'decimals', 1, 0, 2, 1);
            }
            else if (random < 0.4) {
                prompt = lowDecimalsMultiplicationPrompt();
            }
            else if (random < 0.7) {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'decimals', 1, 0, 1, 1);
            }
            else {
                prompt = middleDecimalsPrompt();
            }
            break;
        case types_1.QuestionLevel.Year6:
            if (random < 0.1) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'decimals', 10, -10, 2, 1);
            }
            else if (random < 0.2) {
                prompt = lowDecimalsMultiplicationPrompt();
            }
            else if (random < 0.4) {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'decimals', 10, -10, 1, 1);
            }
            else {
                prompt = middleDecimalsPrompt();
            }
            break;
        default:
            if (random < 0.4) {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'decimals', 20, -20, 1, 1);
            }
            else {
                prompt = middleDecimalsPrompt();
            }
            break;
    }
    console.log(prompt);
    return [
        { role: 'system', content: 'You are a math teacher.' },
        { role: 'user', content: prompt }
    ];
}
exports.generateDecimalsPrompt = generateDecimalsPrompt;
function generalArithmeticPrompt(operation, operandType, upper, lower, digitNumber, workoutNumber) {
    if (operation === void 0) { operation = 'addition'; }
    if (operandType === void 0) { operandType = 'decimals'; }
    if (upper === void 0) { upper = 10; }
    if (lower === void 0) { lower = 0; }
    if (digitNumber === void 0) { digitNumber = 1; }
    if (workoutNumber === void 0) { workoutNumber = 1; }
    return "\nGive a ".concat(operation, " math multi-choice question with the following conditions.\n1. The operands should be ").concat(operandType, " less than ").concat(upper, " and greater than ").concat(lower, " with ").concat(digitNumber, " digits.\n2. Work out the question with calculator.\n3. There should be 4 options including the answer.\n4. Make sure the correct answer is in the options.\n5. ").concat(math_1.template, "\n");
}
function lowDecimalsPrompt() {
    return "\nGive an addition or subtraction math multi-choice question with the following conditions.\n1. The operands should be decimals less than 1 and greater than 0 with 1 digits.\n2. Make a short story with these numbers, such as \"Tom's height is 1.5m, Jack is 0.2m higher than Tom. What's Jack's heigh?\"\n3. There should be 4 options including the correct answer.\n4. Work out the question with at least 3 methods.\n5. ".concat(math_1.template, "\n");
}
function lowDecimalsMultiplicationPrompt() {
    return "\nGive an multiplication math multi-choice question with the following conditions.\n1. One operand should be a decimal less than 10 and greater than 0 with 1 digit.\n2. Another operand should be an integer less than 10 and greater than 0.\n3. There should be 4 options including the answer.\n4. Work out the question with at least 1 method.\n5. Make sure the correct answer is in the options.\n6. ".concat(math_1.template, "\n");
}
// function middleDecimalsPrompt() {
//   return `
//   Give a middle level difficulty decimals multi-choice question with the following conditions.
//   1. One operand should be a decimal 1 digit.
//   2. Make a reasonable short story with these numbers, such as "An ice cream shop has 5 flavours ice creams. The shop makes 40 litres of each of the flavours every day. If every litres cost 1.5 dollars, how much these ice creams cost every day?"
//   3. Work out the question with at least 3 methods.
//   4. If at least two workout have the same value, it's the correct answer.
//   5. There should be 4 options including the correct answer.
//   6. The answer section must point to the correct answer.
//   7. ${template}
//   `
// }
function middleDecimalsPrompt() {
    return "\nGive a middle level difficulty decimals multi-choice question with the following conditions.\n1. One operand should be a decimal 1 digit.\n2. Make a reasonable short story with these numbers, such as \"A grocery store sells 0.4 kg of apples for $1.60. If a customer buys 2.4 kg of apples, how much will they have to pay?\"\n3. Work out the question with at least 3 methods.\n4. Choose the answer which is more frequent.\n5. There should be 4 options including the correct answer.\n6. The answer section must point to the correct answer.\n7. ".concat(math_1.template, "\n");
}
