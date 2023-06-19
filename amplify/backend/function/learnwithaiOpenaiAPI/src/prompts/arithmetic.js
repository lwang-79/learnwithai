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
                return lowMultiplicationPrompt();
            }
            break;
        case types_1.QuestionLevel.Year4:
            if (random < 0.2) {
                prompt = generalArithmeticPrompt(lowOperations[randomIndex], 'integer', 1000, 100, 2);
            }
            else if (random < 0.5) {
                return middleMultiplicationPrompt();
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
                return middleMultiplicationPrompt();
            }
            else if (random < 0.8) {
                return highArithmeticPrompt();
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
                return middleMultiplicationPrompt();
            }
            else if (random < 0.8) {
                return highArithmeticPrompt();
            }
            else {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'integer', 100, 0, 2);
            }
            break;
        default:
            if (random < 0.3) {
                return middleMultiplicationPrompt();
            }
            else if (random < 0.9) {
                return highArithmeticPrompt();
            }
            else {
                prompt = generalArithmeticPrompt(highOperations[randomIndex], 'integer', 100, 0, 2);
            }
    }
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
    return "\n  Generate a ".concat(operation, " math multi-choice question with the following conditions.\n  1. The question should involve ").concat(operandType, " operations with operands ranging from ").concat(lower, " to ").concat(upper, ".\n  2. Ensure there are 4 options provided, including the correct answer.\n  3. Work out the question with at least ").concat(workoutNumber, " method.\n  4. ").concat(math_1.template, "\n  ");
}
function lowMultiplicationPrompt() {
    var condition = "\n  1. Choose two positive integers, a and b, such that a and b are both less than 11 and their product is less than 21.\n  2. Create a short story or scenario using these numbers to frame the question.\n  3. The question should explicitly ask for the product of a and b.\n  ";
    var question = "\n  Emily went to the store to buy some snacks for her friends. She picked up 4 packs of cookies, each pack containing 5 chocolate chip cookies. How many cookies did Emily buy in total?\n  ";
    var answer = "20";
    var workout = "\n  To find the total number of cookies Emily bought, we can multiply the number of packs of cookies she bought by the number of cookies in each pack:\n\n  Total number of cookies = 4 packs \u00D7 5 cookies/pack\n  Total number of cookies = 20 cookies \n\n  Therefore, Emily bought a total of 20 cookies for her friends.\n  ";
    var options = "\n  A: 15 cookies\n  B: 18 cookies\n  C: 20 cookies\n  D: 23 cookies\n  ";
    return (0, math_1.mathTemplate)('low-level', 'multiplication', condition, question, answer, workout, options);
    // return `
    // Generate a low level difficulty math multiplication multi-choice question with the following conditions.
    // 1. Choose two positive integers less than 10. The product of these two numbers is less than 20.
    // 2. Make a short story with these numbers, such as "Dad gives 3 dollars to Jack every day, how much does Jack have after 2 days?"
    // 3. There should be 4 options including the correct answer.
    // 4. Work out the question with at least 1 method.
    // 5. ${template}
    // `
}
function middleMultiplicationPrompt() {
    var condition = "\n  1. Create a short story or scenario using 3 to 5 numbers to frame the question.\n  2. Solving the question should involve 3 or 4 calculation steps.\n  3. Choose numbers and units that are appropriate for the context of the story.\n  ";
    var question = "\n  An ice cream shop is testing some new flavours of ice cream. They invent 30 new flavours for customers to try and discard the 15 least popular new flavours. The shop makes 40 litres of each of the remaining flavours. How many litres of ice cream did the shop make?\n  ";
    var answer = "600";
    var workout = "\n  The shop had 30 new flavours, and they discarded 15, leaving 30 \u2013 15 = 15 remaining flavours.\n  They made 40 litres of each of the 15 remaining flavours, so they made a total of 15 x 40 = 600 litres of ice cream. Answer: 600.\n  ";
    var options = "\n  A: 650 litres\n  B: 700 litres\n  C: 600 litres\n  D: 1000 litres\n  ";
    return (0, math_1.mathTemplate)('middle-level', 'multiplication', condition, question, answer, workout, options);
    // return `
    // Give a middle level difficulty math multiplication multi-choice question with the following conditions.
    // 1. Make a short story with these numbers, such as "An ice cream shop is testing some new flavours of ice cream. They invent 30 new flavours for customers to try and discard the 15 least popular new flavours. The shop makes 40 litres of each of the remaining flavours. How many litres of ice cream did the shop make?"
    // 2. There should be 4 options including the correct answer.
    // 3. Work out the question with at least 2 methods.
    // 4. ${template}
    // `
}
function highArithmeticPrompt() {
    var condition = "\n  1. Craft a complex scenario or story using the given numbers to frame the question. Ensure that it involves multiple variables.\n  2. Solving the question should involve 3 or 4 calculation steps including multiplication or division operations.\n  3. The question should require a deeper understanding of the mathematical concepts involved, incorporating higher-level problem-solving skills.\n  4. Choose numbers and units that are appropriate for the context of the story, making sure they are challenging to work with.\n  ";
    var question = "\n  Bianca's mum just took roast lamb out of the oven and set it aside to rest. The core temperature right now is 170 Fahrenheit and will drop 10 Fahrenheit every 5 minutes. If it rests for 20 minutes, what will the final core temperature be?\n  ";
    var answer = "130";
    var workout = "\n  To solve the problem, we can start by calculating how many 5-minute intervals there are in 20 minutes:\n\n  20 \u00F7 5 = 4\n\n  So the temperature will drop 10 degrees for each of the 4 intervals, giving us a total temperature drop of:\n\n  10 x 4 = 40\n\n  Subtracting this from the initial temperature of 170 Fahrenheit gives us the final core temperature:\n\n  170 - 40 = 130\n\n  Therefore, the final core temperature of the roast lamb after resting for 20 minutes will be 130 Fahrenheit.\n  ";
    var options = "\n  A: 120 Fahrenheit\n  B: 125 Fahrenheit\n  C: 130 Fahrenheit\n  D: 135 Fahrenheit\n  ";
    return (0, math_1.mathTemplate)('high-level', 'multiplication or division', condition, question, answer, workout, options);
    // return `
    // Give a high level difficulty math multiplication multi-choice question with the following conditions.
    // 1. Make a short story with these numbers, such as "Bianca's mum just took roast lamb out of the oven and set it aside to rest. The core temperature right now is 170 Fahrenheit and will drop 10 Fahrenheit every 5 minutes. If it rests for 20 minutes, what will the final core temperature be?"
    // 2. There should be 4 options including the correct answer.
    // 3. Work out the question with at least 2 methods.
    // 4. ${template}
    // `
}
