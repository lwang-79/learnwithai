"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.generateMathAnswer = exports.generateMathQuestion = exports.getDatasetQuestions = void 0;
var mathqa_json_1 = __importDefault(require("../models/mathqa.json"));
var gsm8k_json_1 = __importDefault(require("../models/gsm8k.json"));
var hendrycks_json_1 = __importDefault(require("../models/hendrycks.json"));
var competition_json_1 = __importDefault(require("../models/competition.json"));
var types_1 = require("../types");
var chat_1 = require("./chat");
var math_1 = require("../prompts/math");
var getDatasetQuestions = function (dataset, questionCount, level, concept) { return __awaiter(void 0, void 0, void 0, function () {
    var count, ds, questions, randomIndex, questionSets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                count = Number(questionCount);
                ds = dataset === types_1.QuestionSource.MathQA ?
                    types_1.QuestionSource.MathQA :
                    dataset === types_1.QuestionSource.GSM8K ?
                        types_1.QuestionSource.GSM8K :
                        dataset === types_1.QuestionSource.Competition ?
                            types_1.QuestionSource.Competition :
                            dataset === types_1.QuestionSource.Hendrycks ?
                                types_1.QuestionSource.Hendrycks : '';
                if (isNaN(count) || count <= 0 || ds.length === 0) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            error: 'Please enter a valid value'
                        }];
                }
                if (ds === types_1.QuestionSource.Competition &&
                    Object.values(types_1.QuestionLevel).slice(12, 17).indexOf(level) === -1) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            error: 'Please enter a valid value'
                        }];
                }
                questions = ds === types_1.QuestionSource.MathQA ?
                    mathqa_json_1["default"] :
                    ds === types_1.QuestionSource.GSM8K ?
                        gsm8k_json_1["default"] :
                        ds === types_1.QuestionSource.Competition ?
                            competition_json_1["default"].filter(function (question) { return question.level === level; }) :
                            ds === types_1.QuestionSource.Hendrycks ?
                                hendrycks_json_1["default"].filter(function (question) {
                                    return question.level === level &&
                                        concept === question.type;
                                }) : [];
                randomIndex = Math.floor(Math.random() * (questions.length - count));
                if (!(ds === types_1.QuestionSource.Hendrycks)) return [3 /*break*/, 2];
                return [4 /*yield*/, generateHendrycksQuestionSets(questions.slice(randomIndex, randomIndex + count))];
            case 1:
                questionSets = _a.sent();
                if (questionSets.length === 0) {
                    return [2 /*return*/, {
                            statusCode: 500,
                            error: 'Failed to generate question sets.'
                        }];
                }
                return [2 /*return*/, {
                        statusCode: 200,
                        data: questionSets
                    }];
            case 2: return [2 /*return*/, {
                    statusCode: 200,
                    data: questions.slice(randomIndex, randomIndex + count)
                }];
        }
    });
}); };
exports.getDatasetQuestions = getDatasetQuestions;
var generateMathQuestion = function (category, type, level, concept) { return __awaiter(void 0, void 0, void 0, function () {
    var messages;
    return __generator(this, function (_a) {
        if (category.trim().length === 0 ||
            type.trim().length === 0 ||
            level.trim().length === 0 ||
            concept.trim().length === 0) {
            return [2 /*return*/, {
                    statusCode: 400,
                    error: 'Please enter a valid value'
                }];
        }
        messages = (0, math_1.generateChatMessages)(level, concept);
        return [2 /*return*/, (0, chat_1.chatCompletion)(messages)];
    });
}); };
exports.generateMathQuestion = generateMathQuestion;
var generateMathAnswer = function (question) { return __awaiter(void 0, void 0, void 0, function () {
    var messages;
    return __generator(this, function (_a) {
        if (question.trim().length === 0) {
            return [2 /*return*/, {
                    statusCode: 400,
                    error: 'Please enter a valid question'
                }];
        }
        messages = [
            { role: 'system', content: 'You are a math teacher.' },
            { role: 'user', content: question }
        ];
        return [2 /*return*/, (0, chat_1.chatCompletion)(messages)];
    });
}); };
exports.generateMathAnswer = generateMathAnswer;
var generateMathOptions = function (question, solution) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, messages;
    return __generator(this, function (_a) {
        prompt = "\nBased on the following math question and solution, please generate answer options to form a multichoice question. Put the correct answer in the 4 options randamly. Indicate the option by capital alphabet followed by column. And put the correct answer's indicator in answer.\nQuestion: \"".concat(question, "\"\nSolution: \"").concat(solution, "\"\nDesired template:\nA: <>\nB: <>\nC: <>\nD: <>\nAnswer: <>\n");
        messages = [
            { role: 'system', content: 'You are a math teacher.' },
            { role: 'user', content: prompt }
        ];
        return [2 /*return*/, (0, chat_1.chatCompletion)(messages)];
    });
}); };
var generateHendrycksQuestionSets = function (questions) { return __awaiter(void 0, void 0, void 0, function () {
    var questionSets, _i, questions_1, question, count, done, response, optionsString, answer, options, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                questionSets = [];
                _i = 0, questions_1 = questions;
                _a.label = 1;
            case 1:
                if (!(_i < questions_1.length)) return [3 /*break*/, 8];
                question = questions_1[_i];
                count = 0;
                done = false;
                _a.label = 2;
            case 2:
                if (!(count < 3 && !done)) return [3 /*break*/, 7];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, generateMathOptions(question.problem, question.solution)];
            case 4:
                response = _a.sent();
                if (response.statusCode !== 200) {
                    console.error("Failed to generate options");
                    count++;
                    return [3 /*break*/, 2];
                }
                optionsString = response.data.split('Answer:')[0].trim();
                answer = response.data.split('Answer:')[1].trim();
                options = optionsString.split('\n').map(function (line) { return line.split(':')[1].trim(); });
                if (options.length !== 4 || answer.length !== 1) {
                    console.error("Can't parse the options or answer");
                    count++;
                    return [3 /*break*/, 2];
                }
                questionSets.push({
                    type: types_1.QuestionType.MultiChoice,
                    category: types_1.QuestionCategory.Math,
                    level: question.level,
                    concept: question.type,
                    question: question.problem,
                    options: options,
                    answer: answer,
                    selected: '',
                    workout: question.solution,
                    isBad: false,
                    isTarget: false,
                    isMarked: false
                });
                done = true;
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.error(error_1);
                count++;
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 2];
            case 7:
                _i++;
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/, questionSets];
        }
    });
}); };
