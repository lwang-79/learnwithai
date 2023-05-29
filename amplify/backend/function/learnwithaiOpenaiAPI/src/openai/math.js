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
        while (_) try {
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
var competition_json_1 = __importDefault(require("../models/competition.json"));
var types_1 = require("../types");
var chat_1 = require("./chat");
var math_1 = require("../prompts/math");
var getDatasetQuestions = function (dataset, questionCount) {
    var count = Number(questionCount);
    var ds = dataset === types_1.QuestionLevel.MathQA ?
        types_1.QuestionLevel.MathQA :
        dataset === types_1.QuestionLevel.GSM8K ?
            types_1.QuestionLevel.GSM8K :
            Object.values(types_1.QuestionLevel).indexOf(dataset) > -1 ?
                dataset : '';
    if (isNaN(count) || count <= 0 || ds.length === 0) {
        return {
            statusCode: 400,
            error: 'Please enter a valid value'
        };
    }
    var questions = ds === types_1.QuestionLevel.MathQA ?
        mathqa_json_1["default"] :
        ds === types_1.QuestionLevel.GSM8K ?
            gsm8k_json_1["default"] :
            competition_json_1["default"].filter(function (question) { return question.level === ds; });
    var randomIndex = Math.floor(Math.random() * (questions.length - count));
    return {
        statusCode: 200,
        data: questions.slice(randomIndex, randomIndex + count)
    };
};
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
