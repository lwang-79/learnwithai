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
exports.sendWeeklyNotification = exports.sendMonthlyNotification = exports.sendDailyNotification = exports.processData = void 0;
var graphql_1 = require("./graphql");
var node_fetch_1 = __importDefault(require("node-fetch"));
function sendMonthlyNotification(user) {
    return __awaiter(this, void 0, void 0, function () {
        var date, dateString, monthly, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user.notification ||
                        user.notification.emails.length === 0 ||
                        !user.notification.types.includes('Monthly'))
                        return [2 /*return*/];
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
                    _a.sent();
                    return [2 /*return*/, {
                            statusCode: 200,
                            body: 'Success'
                        }];
            }
        });
    });
}
exports.sendMonthlyNotification = sendMonthlyNotification;
function sendWeeklyNotification(user) {
    return __awaiter(this, void 0, void 0, function () {
        var date, endDate, startDate, data, message, total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user.notification ||
                        user.notification.emails.length === 0 ||
                        !user.notification.types.includes('Monthly'))
                        return [2 /*return*/];
                    date = new Date();
                    date.setDate(date.getDate() - 1);
                    endDate = new Date(date.toLocaleString('sv').slice(0, 10)).toISOString().slice(0, 10);
                    date = new Date();
                    date.setDate(date.getDate() - 7);
                    startDate = new Date(date.toLocaleString('sv').slice(0, 10)).toISOString().slice(0, 10);
                    data = user.daily.filter(function (d) { return d.date >= startDate && d.date <= endDate; });
                    message = "\nWeekly report for ".concat(user.username, "\nDate: from ").concat(startDate, " to ").concat(endDate, "\n");
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
                    _a.sent();
                    return [2 /*return*/, {
                            statusCode: 200,
                            body: 'Success'
                        }];
            }
        });
    });
}
exports.sendWeeklyNotification = sendWeeklyNotification;
function sendDailyNotification(user) {
    return __awaiter(this, void 0, void 0, function () {
        var date, dateString, daily, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user.notification ||
                        user.notification.emails.length === 0 ||
                        !user.notification.types.includes('Daily'))
                        return [2 /*return*/];
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
                    _a.sent();
                    return [2 /*return*/, {
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
function getStaticDataAndSendNotification(users, dayString, monthString) {
    return __awaiter(this, void 0, void 0, function () {
        var mathCorrectNumberByDayData, mathCorrectNumberByMonthData, writingNumberByDayData, writingNumberByMonthData, _i, users_1, user, dayData, mathScore, monthData, mathScore, today;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mathCorrectNumberByDayData = [];
                    mathCorrectNumberByMonthData = [];
                    writingNumberByDayData = [];
                    writingNumberByMonthData = [];
                    _i = 0, users_1 = users;
                    _a.label = 1;
                case 1:
                    if (!(_i < users_1.length)) return [3 /*break*/, 10];
                    user = users_1[_i];
                    if (user.daily) {
                        dayData = user.daily.find(function (d) { return d.date === dayString; });
                        if (dayData) {
                            mathScore = dayData.mathExam * 20 + dayData.mathCorrect * 10 + dayData.mathWrong;
                            if (mathScore > 100) {
                                mathCorrectNumberByDayData.push([user.username, mathScore]);
                            }
                            if (dayData.writing > 0) {
                                writingNumberByDayData.push([user.username, dayData.writing * 10]);
                            }
                        }
                    }
                    if (user.monthly) {
                        monthData = user.monthly.find(function (d) { return d.date === monthString; });
                        if (monthData) {
                            mathScore = monthData.mathExam * 20 + monthData.mathCorrect * 10 + monthData.mathWrong;
                            if (mathScore > 500) {
                                mathCorrectNumberByMonthData.push([user.username, mathScore]);
                            }
                            if (monthData.writing > 5) {
                                writingNumberByMonthData.push([user.username, monthData.writing]);
                            }
                        }
                    }
                    today = new Date();
                    if (!(today.getDate() === 1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, sendMonthlyNotification(user)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sendDailyNotification(user)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 4:
                    if (!(today.getDay() === 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, sendWeeklyNotification(user)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, sendDailyNotification(user)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, sendDailyNotification(user)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/, {
                        mathByDay: mathCorrectNumberByDayData,
                        mathByMonth: mathCorrectNumberByMonthData,
                        writingByDay: writingNumberByDayData,
                        writingByMonth: writingNumberByMonthData
                    }];
            }
        });
    });
}
function processData() {
    return __awaiter(this, void 0, void 0, function () {
        var today, yesterday, dayString, monthString, mathCorrectNumberByDayData, mathCorrectNumberByMonthData, writingNumberByDayData, writingNumberByMonthData, token, _a, users, nextToken, _b, mathByDay, mathByMonth, writingByDay, writingByMonth;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    today = new Date();
                    yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    dayString = new Date(yesterday.toLocaleString('sv').slice(0, 10)).toISOString().slice(0, 10);
                    monthString = dayString.slice(0, 7);
                    mathCorrectNumberByDayData = [];
                    mathCorrectNumberByMonthData = [];
                    writingNumberByDayData = [];
                    writingNumberByMonthData = [];
                    token = null;
                    _c.label = 1;
                case 1: return [4 /*yield*/, (0, graphql_1.listUserData)(token)];
                case 2:
                    _a = _c.sent(), users = _a.users, nextToken = _a.nextToken;
                    return [4 /*yield*/, getStaticDataAndSendNotification(users, dayString, monthString)];
                case 3:
                    _b = _c.sent(), mathByDay = _b.mathByDay, mathByMonth = _b.mathByMonth, writingByDay = _b.writingByDay, writingByMonth = _b.writingByMonth;
                    mathCorrectNumberByDayData = mathCorrectNumberByDayData.concat(mathByDay);
                    mathCorrectNumberByMonthData = mathCorrectNumberByMonthData.concat(mathByMonth);
                    writingNumberByDayData = writingNumberByDayData.concat(writingByDay);
                    writingNumberByMonthData = writingNumberByMonthData.concat(writingByMonth);
                    token = nextToken;
                    _c.label = 4;
                case 4:
                    if (token) return [3 /*break*/, 1];
                    _c.label = 5;
                case 5: return [4 /*yield*/, createOrSaveRankingItem(graphql_1.RankingType.MATH_CORRECT_NUMBER_BY_DAY, dayString, mathCorrectNumberByDayData)];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, createOrSaveRankingItem(graphql_1.RankingType.MATH_CORRECT_NUMBER_BY_MONTH, monthString, mathCorrectNumberByMonthData)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, createOrSaveRankingItem(graphql_1.RankingType.WRITING_NUMBER_BY_DAY, dayString, writingNumberByDayData)];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, createOrSaveRankingItem(graphql_1.RankingType.WRITING_NUMBER_BY_MONTH, monthString, writingNumberByMonthData)];
                case 9:
                    _c.sent();
                    return [2 /*return*/, {
                            statusCode: 200,
                            body: 'Success'
                        }];
            }
        });
    });
}
exports.processData = processData;
function createOrSaveRankingItem(type, date, data) {
    return __awaiter(this, void 0, void 0, function () {
        var firstNames, randomFirstName, randomScore, names, values, items, item, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    while (data.length < 5) {
                        firstNames = [
                            'Steve', 'John', 'Michael', 'David', 'Emily', 'Sarah', 'Jessica', 'Michelle',
                            'James', 'William', 'Emma', 'Olivia', 'Sophia', 'Ava', 'Isabella',
                            'Aarav', 'Arjun', 'Vivaan', 'Kabir', 'Aryan', 'Diya', 'Aishwarya', 'Suhana', 'Neha', 'Riya',
                            'Akira', 'Hiroshi', 'Ryota', 'Kazuki', 'Kenji', 'Ayumi', 'Haruka', 'Yumi', 'Emi', 'Sakura',
                            'Wei Chen', 'Xiao Li', 'Yi Wang', 'Jian Zhang', 'Hao Liu', 'Mei Huang', 'Li Yang', 'Xiu Wu', 'Yan Lin', 'Fang Xu',
                            'Louis', 'Pierre', 'Lucas', 'Alexandre', 'Gabriel', 'Emma', 'Charlotte', 'Sophie', 'Camille', 'Juliette',
                            'Carlos', 'Alejandro', 'Javier', 'Diego', 'Luis', 'Sofía', 'Isabella', 'Carmen', 'Ana', 'María',
                            'Luca', 'Giuseppe', 'Alessandro', 'Marco', 'Antonio', 'Sofia', 'Giulia', 'Isabella', 'Francesca', 'Lorenza'
                        ];
                        randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                        randomScore = type === graphql_1.RankingType.MATH_CORRECT_NUMBER_BY_DAY ?
                            Math.floor(Math.random() * 101) + 100 :
                            type === graphql_1.RankingType.MATH_CORRECT_NUMBER_BY_MONTH ?
                                Math.floor(Math.random() * 1001) + 1000 :
                                type === graphql_1.RankingType.WRITING_NUMBER_BY_DAY ?
                                    Math.floor(Math.random() * 2) + 1 :
                                    Math.floor(Math.random() * 10) + 1;
                        data.push(["".concat(randomFirstName), randomScore]);
                    }
                    names = data.sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10).map(function (d) { return d[0]; });
                    values = data.sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10).map(function (d) { return d[1].toString(); });
                    return [4 /*yield*/, (0, graphql_1.getRankingItemsByDateAndType)(date, type)];
                case 1:
                    items = _a.sent();
                    if (!(!items || items.length === 0)) return [3 /*break*/, 3];
                    item = {
                        date: date,
                        type: type,
                        names: names,
                        values: values
                    };
                    return [4 /*yield*/, (0, graphql_1.createRankingItem)(item)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    item = items[0];
                    item.names = names;
                    item.values = values;
                    return [4 /*yield*/, (0, graphql_1.updateRankingItem)(item)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
