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
exports.sendWeeklyNotification = exports.sendMonthlyNotification = exports.sendDailyNotification = void 0;
var graphql_1 = require("./graphql");
var node_fetch_1 = __importDefault(require("node-fetch"));
function sendMonthlyNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _loop_1, _i, users_1, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, graphql_1.listUserData)()];
                case 1:
                    users = _a.sent();
                    _loop_1 = function (user) {
                        var date, dateString, monthly, message;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!user.notification ||
                                        user.notification.emails.length === 0 ||
                                        !user.notification.types.includes('Monthly'))
                                        return [2 /*return*/, "continue"];
                                    date = new Date();
                                    date.setDate(date.getDate() - 2);
                                    dateString = date.toISOString().slice(0, 7);
                                    monthly = user.monthly.find(function (d) { return d.date === dateString; });
                                    message = "\nMonthly report for ".concat(user.username, "\nDate: ").concat(dateString, "\n");
                                    if (!monthly) {
                                        message += "\nYou didn't have any practices last month!\n";
                                    }
                                    else {
                                        message += "\nMath questions: ".concat(monthly.mathCorrect + monthly.mathWrong, "\nMath correct: ").concat(monthly.mathCorrect, " (").concat(monthly.mathCorrect === 0 ? '' : (100 * monthly.mathCorrect / (monthly.mathCorrect + monthly.mathWrong)).toFixed(0) + '%', ")\nMath test: ").concat(monthly.mathExam, "\nWriting practiced: ").concat(monthly.writing, "\n");
                                    }
                                    return [4 /*yield*/, sesSendEmail(user.notification.emails, "".concat(process.env.APP_NAME, " monthly report"), message)];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, users_1 = users;
                    _a.label = 2;
                case 2:
                    if (!(_i < users_1.length)) return [3 /*break*/, 5];
                    user = users_1[_i];
                    return [5 /*yield**/, _loop_1(user)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, {
                        statusCode: 200,
                        body: 'Success'
                    }];
            }
        });
    });
}
exports.sendMonthlyNotification = sendMonthlyNotification;
function sendWeeklyNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _loop_2, _i, users_2, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, graphql_1.listUserData)()];
                case 1:
                    users = _a.sent();
                    _loop_2 = function (user) {
                        var date, endDate, startDate, data, message, total;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!user.notification ||
                                        user.notification.emails.length === 0 ||
                                        !user.notification.types.includes('Monthly'))
                                        return [2 /*return*/, "continue"];
                                    date = new Date();
                                    date.setDate(date.getDate() - 1);
                                    endDate = new Date(date.toLocaleString('sv').slice(0, 10)).toISOString().slice(0, 10);
                                    date = new Date();
                                    date.setDate(date.getDate() - 7);
                                    startDate = new Date(date.toLocaleString('sv').slice(0, 10)).toISOString().slice(0, 10);
                                    data = user.daily.filter(function (d) { return d.date >= startDate && d.date <= endDate; });
                                    message = "\nWeekly report for ".concat(user.username, "\nDate: from ").concat(startDate, " to ").concat(endDate, "\n    ");
                                    if (data.length === 0) {
                                        message += "\nYou didn't have any practices last week!\n";
                                    }
                                    else {
                                        total = data.reduce(function (acc, obj) {
                                            return {
                                                mathCorrect: acc.mathCorrect + obj.mathCorrect,
                                                mathWrong: acc.mathWrong + obj.mathWrong,
                                                mathExam: acc.mathExam + obj.mathExam,
                                                writing: acc.writing + obj.writing
                                            };
                                        }, { mathCorrect: 0, mathWrong: 0, mathExam: 0, writing: 0 });
                                        message += "\nMath questions: ".concat(total.mathCorrect + total.mathWrong, "\nMath correct: ").concat(total.mathCorrect, " (").concat(total.mathCorrect === 0 ? '' : (100 * total.mathCorrect / (total.mathCorrect + total.mathWrong)).toFixed(0) + '%', ")\nMath test: ").concat(total.mathExam, "\nWriting practiced: ").concat(total.writing, "\n");
                                    }
                                    return [4 /*yield*/, sesSendEmail(user.notification.emails, "".concat(process.env.APP_NAME, " weekly report"), message)];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, users_2 = users;
                    _a.label = 2;
                case 2:
                    if (!(_i < users_2.length)) return [3 /*break*/, 5];
                    user = users_2[_i];
                    return [5 /*yield**/, _loop_2(user)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, {
                        statusCode: 200,
                        body: 'Success'
                    }];
            }
        });
    });
}
exports.sendWeeklyNotification = sendWeeklyNotification;
function sendDailyNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _loop_3, _i, users_3, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, graphql_1.listUserData)()];
                case 1:
                    users = _a.sent();
                    _loop_3 = function (user) {
                        var date, dateString, daily, message;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!user.notification ||
                                        user.notification.emails.length === 0 ||
                                        !user.notification.types.includes('Daily'))
                                        return [2 /*return*/, "continue"];
                                    date = new Date();
                                    date.setDate(date.getDate() - 1);
                                    dateString = new Date(date.toLocaleString('sv').slice(0, 10)).toISOString().slice(0, 10);
                                    daily = user.daily.find(function (d) { return d.date === dateString; });
                                    message = "\nDaily report for ".concat(user.username, "\nDate: ").concat(dateString, "\n");
                                    if (!daily) {
                                        message += "\nYou didn't have any practices yesterday!\n";
                                    }
                                    else {
                                        message += "\nMath questions: ".concat(daily.mathCorrect + daily.mathWrong, "\nMath correct: ").concat(daily.mathCorrect, " (").concat(daily.mathCorrect === 0 ? '' : (100 * daily.mathCorrect / (daily.mathCorrect + daily.mathWrong)).toFixed(0) + '%', ")\nMath test: ").concat(daily.mathExam, "\nWriting practiced: ").concat(daily.writing, "\n");
                                    }
                                    return [4 /*yield*/, sesSendEmail(user.notification.emails, "".concat(process.env.APP_NAME, " daily report"), message)];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, users_3 = users;
                    _a.label = 2;
                case 2:
                    if (!(_i < users_3.length)) return [3 /*break*/, 5];
                    user = users_3[_i];
                    return [5 /*yield**/, _loop_3(user)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, {
                        statusCode: 200,
                        body: 'Success'
                    }];
            }
        });
    });
}
exports.sendDailyNotification = sendDailyNotification;
function sesSendEmail(to, subject, message) {
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        'from': 'notification@StudyWithAI.pro',
                        'to': to,
                        'subject': subject,
                        'message': message
                    };
                    return [4 /*yield*/, (0, node_fetch_1["default"])('https://lelnuzxenk.execute-api.ap-southeast-2.amazonaws.com/production/sendbasicemail', {
                            method: 'POST',
                            body: JSON.stringify(body),
                            headers: { 'Content-Type': 'application/json' }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
