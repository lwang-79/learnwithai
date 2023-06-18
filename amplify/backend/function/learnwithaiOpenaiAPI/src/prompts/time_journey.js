"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.generateTimeJourneyPrompt = void 0;
var types_1 = require("../types");
var math_1 = require("./math");
function generateTimeJourneyPrompt(level) {
    var random = Math.random();
    var prompt = [];
    switch (level) {
        case types_1.QuestionLevel.Year1:
        case types_1.QuestionLevel.Year2:
        case types_1.QuestionLevel.Year3:
            prompt = lowTimePrompt();
            break;
        case types_1.QuestionLevel.Year4:
            if (random < 0.5) {
                prompt = lowTimePrompt();
            }
            else {
                prompt = middleTimePrompt();
            }
            break;
        case types_1.QuestionLevel.Year5:
            // if (random < 0.5) {
            prompt = middleTimePrompt();
            // } else if (random < 0.8) {
            // prompt = lowJourneyPrompt();
            // } else {
            // prompt = middleJourneyPrompt();
            // }
            break;
        case types_1.QuestionLevel.Year6:
            if (random < 0.2) {
                prompt = middleTimePrompt();
            }
            else if (random < 0.5) {
                prompt = middleJourneyPrompt();
            }
            else if (random < 0.7) {
                prompt = highJourneyPrompt();
            }
            else {
                prompt = towJourneyPrompt();
            }
            break;
        default:
            if (random < 0.2) {
                prompt = middleJourneyPrompt();
            }
            else if (random < 0.5) {
                prompt = towJourneyPrompt();
            }
            else {
                prompt = highJourneyPrompt();
            }
    }
    console.log(prompt);
    return __spreadArray([
        { role: 'system', content: 'You are a math teacher.' }
    ], prompt
    // { role: 'user', content: prompt }
    , true);
}
exports.generateTimeJourneyPrompt = generateTimeJourneyPrompt;
function lowTimePrompt() {
    return [{ role: 'user', content: "\n  Generate a low-level difficulty math multi-choice question related to time with the following conditions:\n\n  1. Provide a question that involves calculating time based on a given scenario.\n  2. Use scenarios similar to the following examples:\n     a. \"A movie starts at 7:30 PM and lasts for 2 hours and 15 minutes. What time does the movie end?\"\n     b. \"Sarah wants to arrive at a party at 8:00 PM, and it takes her 30 minutes to get ready and 20 minutes to travel to the party. What time should she start getting ready?\"\n     c. \"A train departs from Station A at 9:00 AM and arrives at Station B after 2 hours and 30 minutes. How long does the train journey take?\"\n  3. Ensure consistent conversion of all times to decimal hours.\n  4. ".concat(math_1.template, "\n\n  Instructions: When converting minutes to decimal hours, divide the number of minutes by 60. For example, 15 minutes is equal to 15/60 = 0.25 hours. Ensure all time calculations are done using decimal hours for consistency.\n  ") }];
}
function middleTimePrompt() {
    return [
        //   {role: 'user', content: `
        // Give a middle level difficulty math multi-choice question related to time with the following conditions.
        // 1. Need at least two steps to solve the question, may need multiplication, division and subtraction methods. For example:  "If a person starts work at 8:30 AM and works for 6 hours and 45 minutes, and then takes a break for 30 minutes, what time will they finish their break?".
        // 2. Work out the question with calculator 3 times.
        // 3. There should be 4 options including the answer.
        // 4. Make sure the correct answer is in the options.
        // 5. ${template}
        // `}
        { role: 'user', content: "If a person starts work at 8:30 AM and works for 6 hours and 45 minutes, and then takes a break for 30 minutes, what time will they finish their break? Please work it out before give the answer." },
        { role: 'assistant', content: "\nTo find the time the person will finish their break, we need to add the duration of their work with the duration of their break and then add it to their start time.\n\nStart Time: 8:30 AM\nDuration of Work: 6 hours and 45 minutes\nDuration of Break: 30 minutes\n\nFirst, we need to convert the duration of work and break into hours. \n\n6 hours and 45 minutes = 6.75 hours\n30 minutes = 0.5 hours\n\nNext, we add the duration of work and break:\n\n6.75 hours + 0.5 hours = 7.25 hours\n\nFinally, we add the duration to the start time:\n\n8:30 AM + 7.25 hours = 3:45 PM\n\nTherefore, the person will finish their break at 3:45 PM.    \n    " },
        {
            role: 'user', content: "Use the above question, workout and answer to create a multi-choice question.\nDesired template:\nQuestion: <>\nWorkout: <>\nOptions:\nA: <option>\nB: <option>\nC: <option>\nD: <option>\nAnswer: <A, B, C or D>"
        },
        {
            role: 'assistant', content: "Question: If a person starts work at 8:30 AM and works for 6 hours and 45 minutes, and then takes a break for 30 minutes, what time will they finish their break?\nWorkout: 8:30 AM + 6.75 hours + 0.5 hours = 3:45 PM\nOptions:\nA: 1:30 PM\nB: 2:15 PM\nC: 3:45 PM\nD: 4:30 PM\nAnswer: C"
        },
        {
            role: 'user', content: "Follow the above process create a similar difficulty level math multi-choice question related to time in the same template. Involve at least 3 times."
        }
    ];
}
function lowJourneyPrompt() {
    return [{ role: 'user', content: "\n  Generate a low-level difficulty math journey multiple-choice question with the following conditions:\n\n  1. The question should involve a journey and require the use of the formula either \"time = distance / speed\", \"distance = speed * time\" or \"speed = distance / time\".\n  2. Provide a question that requires solving for a specific time or distance.  \n  3. The question should ask for either speed, time, or distance.\n  4. ".concat(math_1.template, "\n  ") }];
}
function middleJourneyPrompt() {
    return [{ role: 'user', content: "\n  Generate a middle-level difficulty math journey multiple-choice question with the following conditions:\n\n  1. The question should involve a journey and require the use of the formula either \"time = distance / speed\", \"distance = speed * time\" or \"speed = distance / time\".\n  2. Provide a question that involves two entities traveling towards each other from different starting points.\n  3. The speeds of the entities should be different.\n  4. The question should ask for either time, speed, or distance.\n  5. ".concat(math_1.template, "\n  ") }];
}
// 1. To solve the question should use the formula "time = distance / speed" for example: "A train leaves station A traveling at a speed of 60 km per hour towards station B. Two hours later, a second train leaves station B traveling at 70 km per hour towards station A. If the distance between the two stations is 420 km, at what time will the two trains meet?".
// 2. There should be 4 options including the answer.
// 3. Work out the question with at least 2 method.
function towJourneyPrompt() {
    return [{ role: 'user', content: "\n  Generate a high-level difficulty two-part journey multiple-choice question with the following conditions:\n\n  1. The question should require the use of the formula either \"time = distance / speed\", \"distance = speed * time\" or \"speed = distance / time\".\n  2. Provide a question that involves a round trip between two cities.\n  3. Include at least two different methods to solve the question.\n  4. ".concat(math_1.template, "\n  ") }];
}
// 1. To solve the question should use the formula "time = distance / speed" for example: "A person drives from City A to City B at an average speed of 60 km/h. After staying in City B for 5 hours, he returns to City A at an average speed of 96 km/h. If the round trip took a total of 12 hours, what is the distance between City A and City B?".
// 2. There should be 4 options including the answer.
// 3. Work out the question with at least 2 method.
function highJourneyPrompt() {
    return [{ role: 'user', content: "\n  Generate a high-level difficulty math journey multiple-choice question with the following conditions:\n\n  1. The question should involve flow speed.\n  2. The question should involve a swimming journey and require the use of the formula either \"time = distance / speed\", \"distance = speed * time\" or \"speed = distance / time\".\n  3. Include at least two different methods to solve the question.\n  4. ".concat(math_1.template, "\n  ") }];
}
// Give a high level difficulty math journey multi-choice question with the following conditions.
// 1. Involve the flow speed, example: "A person swims across a river that flows at 2 km/h. If the person can swim at 3 km/h in still water and the river is 5 km wide, at what angle to the river flow should they swim to reach the opposite bank in the shortest time?".
// 2. There should be 4 options including the answer.
// 3. Work out the question with at least 2 method.
