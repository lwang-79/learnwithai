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
exports.__esModule = true;
exports.chatCompletion = void 0;
var index_1 = require("index");
var openai_1 = require("openai");
var OPENAI_API_KEY = Buffer.from(process.env.OPENAI_API_KEY, 'base64').toString();
var configuration = new openai_1.Configuration({
    apiKey: OPENAI_API_KEY
});
var openai = new openai_1.OpenAIApi(configuration);
var chatCompletion = function (messages, functions, temperature, max_tokens) {
    if (temperature === void 0) { temperature = 1; }
    if (max_tokens === void 0) { max_tokens = 1000; }
    return __awaiter(void 0, void 0, void 0, function () {
        var model, completion, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    // const { Parameter } = await (new SSMClient({
                    //   region: process.env.AWS_REGION
                    // }))
                    //   .send(new GetParameterCommand({
                    //     Name: process.env['OPENAI_API_KEY'],
                    //     WithDecryption: true,
                    //   }));
                    // const configuration = new Configuration({
                    //   apiKey: Parameter.Value,
                    // });
                    // const openai = new OpenAIApi(configuration);  
                    if (!configuration.apiKey) {
                        return [2 /*return*/, {
                                statusCode: 500,
                                error: "Missing API Key"
                            }];
                    }
                    model = (0, index_1.getModel)();
                    console.log("Model: ".concat(model));
                    console.log("Messages: ".concat(JSON.stringify(messages)));
                    console.log("Functions: ".concat(JSON.stringify(functions)));
                    console.log("Temperature: ".concat(temperature));
                    console.log("Max Tokens: ".concat(max_tokens));
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openai.createChatCompletion({
                            model: model,
                            messages: messages,
                            functions: functions,
                            temperature: temperature,
                            max_tokens: max_tokens
                        })];
                case 2:
                    completion = _d.sent();
                    console.log(JSON.stringify(completion.data.choices[0].message));
                    if ((_a = completion.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.function_call) {
                        return [2 /*return*/, {
                                statusCode: 200,
                                data: (_b = completion.data.choices[0].message) === null || _b === void 0 ? void 0 : _b.function_call.arguments
                            }];
                    }
                    return [2 /*return*/, {
                            statusCode: 200,
                            data: (_c = completion.data.choices[0].message) === null || _c === void 0 ? void 0 : _c.content
                        }];
                case 3:
                    error_1 = _d.sent();
                    if (error_1.response) {
                        console.error(error_1.response.status, error_1.response.data);
                        return [2 /*return*/, {
                                statusCode: error_1.response.status,
                                error: error_1.response.data
                            }];
                    }
                    else {
                        console.error("Error with OpenAI API request: ".concat(error_1.message));
                        return [2 /*return*/, {
                                statusCode: 500,
                                error: 'An error occurred during your request.'
                            }];
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.chatCompletion = chatCompletion;
