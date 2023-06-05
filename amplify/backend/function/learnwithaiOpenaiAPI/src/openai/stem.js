"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getStemQuestions = void 0;
var mmlu_stem_json_1 = __importDefault(require("../models/mmlu-stem.json"));
var getStemQuestions = function (concepts, level, questionCount) {
    var count = Number(questionCount);
    if (isNaN(count) ||
        count <= 0 ||
        concepts.length === 0 ||
        ['High School', 'College'].indexOf(level) === -1) {
        return {
            statusCode: 400,
            error: 'Please enter a valid value'
        };
    }
    var questions = mmlu_stem_json_1["default"].filter(function (question) { return !question.concept.includes(level === 'College' ? 'high_school' : 'college'); });
    var selectedQuestions = [];
    var _loop_1 = function (i) {
        var randomConcept = concepts[(Math.floor(Math.random() * (concepts.length)))];
        var questionsInConcept = questions.filter(function (question) { return question.concept.includes(randomConcept.toLowerCase().replace(' ', '_')); });
        if (questionsInConcept.length === 0) {
            return out_i_1 = i, "continue";
        }
        var randomQuestion = questionsInConcept[Math.floor(Math.random() * (questionsInConcept.length))];
        selectedQuestions.push(randomQuestion);
        i++;
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < count;) {
        _loop_1(i);
        i = out_i_1;
    }
    return {
        statusCode: 200,
        data: selectedQuestions
    };
};
exports.getStemQuestions = getStemQuestions;
