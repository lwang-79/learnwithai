"use strict";
exports.__esModule = true;
exports.generatePercentagePrompt = void 0;
var types_1 = require("../types");
var math_1 = require("./math");
function generatePercentagePrompt(level) {
    var random = Math.random();
    var prompt = '';
    switch (level) {
        case types_1.QuestionLevel.Year1:
        case types_1.QuestionLevel.Year2:
        case types_1.QuestionLevel.Year3:
            prompt = lowPercentagePrompt();
            break;
        case types_1.QuestionLevel.Year4:
            if (random < 0.5) {
                prompt = middlePercentagePrompt();
            }
            else {
                prompt = lowPercentagePrompt();
            }
            break;
        case types_1.QuestionLevel.Year5:
            if (random < 0.2) {
                prompt = lowPercentagePrompt();
            }
            else if (random < 0.7) {
                prompt = middlePercentagePrompt();
            }
            else {
                prompt = highPercentagePrompt();
            }
            break;
        case types_1.QuestionLevel.Year6:
            if (random < 0.4) {
                prompt = middlePercentagePrompt();
            }
            else {
                prompt = highPercentagePrompt();
            }
            break;
        default:
            prompt = highPercentagePrompt();
            break;
    }
    console.log(prompt);
    return [
        { role: 'system', content: 'You are a math teacher.' },
        { role: 'user', content: prompt }
    ];
}
exports.generatePercentagePrompt = generatePercentagePrompt;
function lowPercentagePrompt() {
    return "\nGive low level difficulty math percentage multi-choice question with the following conditions.\n1. The percentage should be multiplier of 10% such as 20%, 50%... example question \"Tom has 50 candies, he gave 10% of his candies to Jack. How many candies does Jack have?\"\n2. Work out the question.\n3. There should be 4 options including the answer.\n4. Make sure the correct answer is in the options.\n5. ".concat(math_1.template, "\n");
}
function middlePercentagePrompt() {
    var random = Math.random();
    if (random < 0.33) {
        return "\nGive an middle level difficulty math percentage multi-choice question with the following conditions.\n1. Percentage should be in the question or answer.\n2. Need two or three steps to workout the question. Example: \"A store sells 50 cans of soda per day. Each can costs 0.75 dollars. If the store gives a discount of 10%, what is the total cost of 10 days of selling?\"\n3. Work out the question with calculator.\n4. There should be 4 options including the answer.\n5. Make sure the correct answer is in the options.\n6. ".concat(math_1.template, "\n");
    }
    else if (random < 0.66) {
        return "\nGive an middle level difficulty math percentage multi-choice question with the following conditions.\n1. Percentage should be in the question or answer.\n2. Need two or three steps to workout the question. Example: \"The cost of a laptop is $800. If the price is increased to $900, what is the percentage increase in price?\"\n3. Work out the question with calculator.\n4. There should be 4 options including the answer.\n5. Make sure the correct answer is in the options.\n6. ".concat(math_1.template, "\n");
    }
    else {
        return "\nGive an middle level difficulty math percentage multi-choice question with the following conditions.\n1. Percentage should be in the question or answer.\n2. Need two or three steps to workout the question. Example: \"A school has 500 students, and 60% of them are boys. How many girls are there in the school?\"\n3. Work out the question with calculator.\n4. There should be 4 options including the answer.\n5. Make sure the correct answer is in the options.\n6. ".concat(math_1.template, "\n");
    }
}
function highPercentagePrompt() {
    var random = Math.random();
    console.log(random);
    if (random < 0.33) {
        return "\nGive a middle level difficulty math percentage multi-choice question with the following conditions.\n1. Percentage should be in the question or answer.\n2. Require three or more steps to workout the question. Example: \"A company's revenue increased by 20% in the first year and decreased by 25% in the second year. If the company's revenue at the end of the second year was $500,000, what was the company's revenue at the beginning of the first year?\"\n3. Work out the question with calculator and formula.\n4. There should be 4 options including the answer.\n5. Make sure the correct answer is in the options.\n6. ".concat(math_1.template, "\n");
    }
    else if (random < 0.66) {
        return "\nGive an middle level difficulty math percentage multi-choice question with the following conditions.\n1. Percentage should be in the question or answer.\n2. Need two or three steps to workout the question. Example: \"A department store offers a 20% discount on all items for a sale. A customer buys a shirt that is on sale for $48 after the discount. If the customer paid $7.68 in sales tax, what was the original price of the shirt before the sale?\"\n3. Work out the question with calculator.\n4. There should be 4 options including the answer.\n5. Make sure the correct answer is in the options.\n6. ".concat(math_1.template, "\n");
    }
    else {
        return "\nGive an middle level difficulty math percentage multi-choice question with the following conditions.\n1. Percentage should be in the question or answer.\n2. Need two or three steps to workout the question. Example: \"A company has a profit margin of 25%. If the company's revenue is $800,000, what is the company's net profit after taxes if the tax rate is 30%?\"\n3. Work out the question with calculator.\n4. There should be 4 options including the answer.\n5. Make sure the correct answer is in the options.\n6. ".concat(math_1.template, "\n");
    }
}
