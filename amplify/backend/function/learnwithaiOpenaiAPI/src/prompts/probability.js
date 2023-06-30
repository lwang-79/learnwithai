"use strict";
exports.__esModule = true;
exports.generateProbabilityPrompt = void 0;
var types_1 = require("../types");
var math_1 = require("./math");
function generateProbabilityPrompt(level) {
    var random = Math.random();
    switch (level) {
        case types_1.QuestionLevel.Year1:
        case types_1.QuestionLevel.Year2:
        case types_1.QuestionLevel.Year3:
        case types_1.QuestionLevel.Year4:
            if (random < 0.8) {
                return lowSingleEventPrompt();
            }
            else {
                return lowTwoEventsPrompt();
            }
        case types_1.QuestionLevel.Year5:
            if (random < 0.5) {
                return lowSingleEventPrompt();
            }
            else if (random < 0.9) {
                return lowTwoEventsPrompt();
            }
            else {
                return middleTwoEventsPrompt();
            }
        case types_1.QuestionLevel.Year6:
            if (random < 0.4) {
                return lowTwoEventsPrompt();
            }
            else if (random < 0.7) {
                return middleTwoEventsPrompt();
            }
            else {
                return highThreeEventsPrompt();
            }
        default:
            if (random < 0.8) {
                return highThreeEventsPrompt();
            }
            else {
                return middleTwoEventsPrompt();
            }
    }
}
exports.generateProbabilityPrompt = generateProbabilityPrompt;
function lowSingleEventPrompt() {
    var condition = "\n  1. Single Event Probability.\n  2. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.\n  ";
    var question = "\n  A bag contains 6 red balls and 4 blue balls. If a ball is randomly selected from the bag, what is the probability of selecting a red ball?\n  ";
    var answer = "3 / 5";
    var workout = "\n  There are 6 red balls and 4 blue balls in the bag, making a total of 10 balls. The probability of selecting a red ball can be calculated by dividing the number of favorable outcomes (red balls) by the total number of possible outcomes (all balls).\n\n  Probability of selecting a red ball = Number of red balls / Total number of balls\n  Probability of selecting a red ball = 6 / 10, simplify to 3 / 5\n  ";
    var options = "\n  A: 2 / 5\n  B: 1 / 6\n  C: 3 / 5\n  D: 1 / 4\n  ";
    return (0, math_1.mathTemplate)('low-level', 'probability', condition, question, answer, workout, options);
}
function lowTwoEventsPrompt() {
    var condition = "\n  1. Should be a two events probability.\n  2. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.\n  ";
    var question = "\n  A standard six-sided die is rolled twice. What is the probability of rolling two even numbers?\n  ";
    var answer = "1/4";
    var workout = "\nTo find the probability, we need to determine the number of favorable outcomes and divide it by the total number of possible outcomes.\n\nPossible outcomes from rolling a six-sided die twice = 6 x 6 = 36\n\nOut of these six outcomes, three of them are even numbers: 2, 4, and 6. Therefore, there is a 3/6 or 1/2 chance of rolling an even number on the first roll.\n\nSince the first roll does not affect the second roll, the probability of rolling an even number on the second roll remains the same, 1/2.\n\nTo find the probability of both events occurring (rolling two even numbers), we multiply the probabilities:\n\nProbability = (1/2) x (1/2) = 1/4\n  ";
    var options = "\n  A: 1/2\n  B: 1/3\n  C: 1/4\n  D: 1/5\n  ";
    return (0, math_1.mathTemplate)('low-level', 'two events probability', condition, question, answer, workout, options);
}
function middleTwoEventsPrompt() {
    var condition = "\n  1. More than 2 different possible events.\n  2. Ask for the 2nd events' probability.\n  3. Present the question in a clear and concise manner, ensuring that it aligns with the given story and mathematical conditions.\n  ";
    var question = "\n  In a bag, there are 5 red balls, 3 blue balls, and 2 green balls. If two balls are randomly drawn from the bag without replacement, what is the probability of selecting a red ball on the second draw, given that the first ball drawn was blue?\n  ";
    var answer = "1/6";
    var workout = "\n  To calculate the probability of selecting a red ball on the second draw, given that the first ball drawn was blue, we need to consider the two scenarios separately: drawing a blue ball on the first draw and drawing a red ball on the second draw.\n\n  Scenario 1: Drawing a blue ball on the first draw:\n  In the bag, there are a total of 10 balls. Since the first ball drawn was blue, there are now 2 blue balls remaining in the bag. So, the probability of drawing a blue ball on the first draw is 3/10.\n  \n  Scenario 2: Drawing a red ball on the second draw, given that the first ball was blue:\n  After removing one blue ball from the bag, there are 9 balls left. Out of these, 5 are red balls. So, the probability of drawing a red ball on the second draw, given that the first ball was blue, is 5/9.\n  \n  To find the probability of both events occurring consecutively, we multiply the probabilities of the two scenarios:\n  \n  Probability = (3/10) * (5/9)\n  Probability = 1/6  ";
    var options = "\n  A: 3/8\n  B: 1/8\n  C: 1/6\n  D: 1/5\n  ";
    return (0, math_1.mathTemplate)('middle-level', 'conditional probability', condition, question, answer, workout, options);
}
function highThreeEventsPrompt() {
    var condition = "\n  1. Three events probability.\n  4. Choose numbers and units that are appropriate for the context of the story, making sure they are challenging to work with.  ";
    var question = "\n  In a bag, there are 6 red balls, 4 blue balls, and 2 green balls. Three balls are randomly drawn from the bag without replacement. What is the probability of drawing exactly 2 red balls and 1 blue ball?\n  ";
    var answer = "30.30%";
    var workout = "\n  To calculate the probability of drawing exactly 2 red balls and 1 blue ball, we need to consider the different scenarios in which this can occur.\n\n  Scenario 1: Red-Red-Blue\n  \n  Scenario 2: Red-Blue-Red\n  \n  Scenario 3: Blue-Red-Red\n  \n  We need to consider all three scenarios because the order in which the balls are drawn matters.\n  \n  Now, we can calculate the probability using these scenarios:\n  \n  Probability of drawing exactly 2 red balls and 1 blue ball = Probability of scenario 1 + Probability of scenario 2 + Probability of scenario 3\n  \n  Probability of drawing exactly 2 red balls and 1 blue ball = (6/12) * (5/11) * (4/10) + (6/12) * (4/11) * (5/10) + (4/12) * (6/11) * (5/10)\n  \n  The probability is 0.3030 or 30.30%.\n  ";
    var options = "\n  A: 46.33%\n  B: 25.80%\n  C: 30.30%\n  D: 67.45%\n  ";
    return (0, math_1.mathTemplate)('high-level', 'probability', condition, question, answer, workout, options);
}
