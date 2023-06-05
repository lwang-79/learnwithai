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
exports.__esModule = true;
exports.polishWriting = exports.generateWritingMark = exports.generateWritingPrompt = void 0;
var narrative_1 = require("../prompts/narrative");
var types_1 = require("../types");
var chat_1 = require("./chat");
var generateWritingPrompt = function (type, topic, level) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (type.trim().length === 0 ||
                    topic.trim().length === 0 ||
                    level.trim().length === 0) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            error: 'Please enter a valid value'
                        }];
                }
                prompt = '';
                if (type == types_1.EssayType.Narrative) {
                    prompt = (0, narrative_1.generateNarrativePrompt)(level);
                }
                else {
                    prompt = "\n    Give a famous word or story or some facts less than 100 words about ".concat(topic, ", \n    and then give a ").concat(level, " level ").concat(type, " essay prompt based on the material. \n    The student should be able to write an essay to this prompt with 400 words.\n    ");
                }
                prompt += "\n  Desired format:\n  Text: <>\n  Prompt: <>\n  ";
                message = [
                    { role: 'system', content: 'You are an English writing teacher.' },
                    { role: 'user', content: prompt }
                ];
                return [4 /*yield*/, (0, chat_1.chatCompletion)(message)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.generateWritingPrompt = generateWritingPrompt;
var generateWritingMark = function (level, type, prompt, essay) { return __awaiter(void 0, void 0, void 0, function () {
    var content, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (prompt.trim().length === 0 ||
                    essay.trim().length === 0 ||
                    level.trim().length === 0 ||
                    type.trim().length === 0) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            error: 'Please enter a valid value'
                        }];
                }
                content = "\n  Evaluate a student's ".concat(type, " based on the student's level which is ").concat(level, ".\n  1. Make sure to carefully read the prompt and student's writing in full before evaluating.\n  2. The student must write an original narrative and cannot copy the prompt directly. Otherwise the score should be 0 and stop evaluating.\n  3. Consider the following facts \"Knowledge, understanding and control\", \"Response to prompt(copy prompt is not acceptable)\", \"Use of evidence\", \"Structure of response\" and \"Spelling and Punctuation\".\n  4. Give a score from 0 to 100 according to your evaluation.\n  5. Mark the good sentences which increased the score and not good sentences which decreased the score.\n  6. Give comments on the thing doing well and things that need to improve.\n  \n  ").concat(type, " prompt:\n  [").concat(prompt, "]\n  Student's ").concat(type, ":\n  [").concat(essay, "]\n  ");
                message = [
                    { role: 'system', content: 'You are an English writing teacher.' },
                    { role: 'user', content: content }
                ];
                return [4 /*yield*/, (0, chat_1.chatCompletion)(message)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.generateWritingMark = generateWritingMark;
var polishWriting = function (level, type, prompt, essay) { return __awaiter(void 0, void 0, void 0, function () {
    var content, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (prompt.trim().length === 0 ||
                    essay.trim().length === 0 ||
                    level.trim().length === 0 ||
                    type.trim().length === 0) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            error: 'Please enter a valid value'
                        }];
                }
                content = "\n  Here is a student's ".concat(type, ". Please polish the ").concat(type, " based on the student's level which is ").concat(level, ".\n  \n  ").concat(type, " prompt:\n  [").concat(prompt, "]\n  Student's ").concat(type, ":\n  [").concat(essay, "]\n  ");
                message = [
                    { role: 'system', content: 'You are an English writing teacher.' },
                    { role: 'user', content: content }
                ];
                return [4 /*yield*/, (0, chat_1.chatCompletion)(message)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.polishWriting = polishWriting;
