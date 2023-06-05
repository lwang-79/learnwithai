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
var stem_1 = require("./openai/stem");
var anything_1 = require("./openai/anything");
var math_1 = require("./openai/math");
var writing_1 = require("./openai/writing");
var types_1 = require("./types");
exports.handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var req, operation, body, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("EVENT: ".concat(JSON.stringify(event)));
                req = event;
                operation = req.operation || '';
                if (Object.values(types_1.APIOperation).indexOf(operation) < 0) {
                    return [2 /*return*/, {
                            statusCode: 400,
                            body: {
                                statusCode: 400,
                                error: 'Please enter a valid value'
                            }
                        }];
                }
                _a = operation;
                switch (_a) {
                    case types_1.APIOperation.AskAnything: return [3 /*break*/, 1];
                    case types_1.APIOperation.WritingPrompt: return [3 /*break*/, 3];
                    case types_1.APIOperation.WritingMark: return [3 /*break*/, 5];
                    case types_1.APIOperation.WritingPolish: return [3 /*break*/, 7];
                    case types_1.APIOperation.MathDataset: return [3 /*break*/, 9];
                    case types_1.APIOperation.MathQuestion: return [3 /*break*/, 11];
                    case types_1.APIOperation.MathAnswer: return [3 /*break*/, 13];
                    case types_1.APIOperation.StemQuestion: return [3 /*break*/, 15];
                }
                return [3 /*break*/, 17];
            case 1: return [4 /*yield*/, (0, anything_1.askAnything)(req.prompt || '')];
            case 2:
                body = _b.sent();
                return [3 /*break*/, 18];
            case 3: return [4 /*yield*/, (0, writing_1.generateWritingPrompt)(req.type || '', req.topic || '', req.level || '')];
            case 4:
                body = _b.sent();
                return [3 /*break*/, 18];
            case 5: return [4 /*yield*/, (0, writing_1.generateWritingMark)(req.level || '', req.type || '', req.prompt || '', req.essay || '')];
            case 6:
                body = _b.sent();
                return [3 /*break*/, 18];
            case 7: return [4 /*yield*/, (0, writing_1.polishWriting)(req.level || '', req.type || '', req.prompt || '', req.essay || '')];
            case 8:
                body = _b.sent();
                return [3 /*break*/, 18];
            case 9: return [4 /*yield*/, (0, math_1.getDatasetQuestions)(req.dataset || '', req.questionCount || '')];
            case 10:
                body = _b.sent();
                return [3 /*break*/, 18];
            case 11: return [4 /*yield*/, (0, math_1.generateMathQuestion)(req.category || '', req.type || '', req.level || '', req.concept || '')];
            case 12:
                body = _b.sent();
                return [3 /*break*/, 18];
            case 13: return [4 /*yield*/, (0, math_1.generateMathAnswer)(req.question || '')];
            case 14:
                body = _b.sent();
                return [3 /*break*/, 18];
            case 15: return [4 /*yield*/, (0, stem_1.getStemQuestions)(req.concepts || [], req.level || '', req.questionCount || '')];
            case 16:
                body = _b.sent();
                return [3 /*break*/, 18];
            case 17:
                body = {
                    statusCode: 400,
                    error: "Invalid operation"
                };
                _b.label = 18;
            case 18:
                if (body.statusCode !== 200) {
                    console.error(body.error);
                }
                return [2 /*return*/, {
                        statusCode: body.statusCode,
                        body: JSON.stringify(body)
                    }];
        }
    });
}); };
