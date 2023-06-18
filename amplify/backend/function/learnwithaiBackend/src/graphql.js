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
exports.listUserData = exports.getRankingItemsByDateAndType = exports.updateRankingItem = exports.createRankingItem = exports.RankingType = void 0;
var api_1 = require("./api");
var RankingType;
(function (RankingType) {
    RankingType["MATH_CORRECT_NUMBER_BY_DAY"] = "MathCorrectNumberByDay";
    RankingType["MATH_CORRECT_NUMBER_BY_MONTH"] = "MathCorrectNumberByMonth";
    RankingType["WRITING_NUMBER_BY_DAY"] = "WritingNumberByDay";
    RankingType["WRITING_NUMBER_BY_MONTH"] = "WritingNumberByMonth";
})(RankingType = exports.RankingType || (exports.RankingType = {}));
function listUserData(nextToken) {
    return __awaiter(this, void 0, void 0, function () {
        var query, variable, response, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n    query ListUserData($nextToken: String) {\n      listUsers(limit: 20, nextToken: $nextToken) {\n        items {\n          id\n          username\n          membership {\n            current\n          }\n          daily {\n            date\n            mathCorrect\n            mathWrong\n            mathExam\n            readingCorrect\n            readingWrong\n            writing\n          }\n          monthly {\n            date\n            mathCorrect\n            mathWrong\n            mathExam\n            readingCorrect\n            readingWrong\n            writing\n          }\n          notification {\n            emails\n            types\n          }\n        }\n        nextToken\n      }\n    }\n  ";
                    variable = { nextToken: nextToken };
                    return [4 /*yield*/, (0, api_1.execute)(query, variable)];
                case 1:
                    response = _a.sent();
                    if (response.statusCode != 200) {
                        throw new Error('Failed to list users!');
                    }
                    users = response.body.data.listUsers.items;
                    if (!users) {
                        throw new Error('Failed to list users!');
                    }
                    return [2 /*return*/, {
                            users: users,
                            nextToken: response.body.data.listUsers.nextToken
                        }];
            }
        });
    });
}
exports.listUserData = listUserData;
function getRankingItemsByDateAndType(date, type) {
    return __awaiter(this, void 0, void 0, function () {
        var query, variable, response, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n    query GetRankingItemsByDateAndType($date: String!, $type: String!) {\n      rankingItemsByDateAndType(date: $date, type: {eq: $type}) {\n        items {\n          id\n          date\n          names\n          type\n          values\n          _version\n        }\n      }\n    }\n\n  ";
                    variable = { date: date, type: type };
                    return [4 /*yield*/, (0, api_1.execute)(query, variable)];
                case 1:
                    response = _a.sent();
                    if (response.statusCode != 200) {
                        throw new Error('Failed to get ranking item!');
                    }
                    items = response.body.data.rankingItemsByDateAndType.items;
                    return [2 /*return*/, items];
            }
        });
    });
}
exports.getRankingItemsByDateAndType = getRankingItemsByDateAndType;
function createRankingItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var query, variable, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n    mutation CreateRankingItem($date: String!, $names: [String!]!, $type: RankingType!, $values: [String!]!) {\n      createRankingItem(input: {date: $date, names: $names, type: $type, values: $values}) {\n        id\n        date\n        _version\n        names\n        type\n        values\n        updatedAt\n        createdAt\n        _lastChangedAt\n        _deleted\n      }\n    }\n  ";
                    variable = {
                        date: item.date,
                        names: item.names,
                        type: item.type,
                        values: item.values
                    };
                    return [4 /*yield*/, (0, api_1.execute)(query, variable)];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    if (response.statusCode != 200) {
                        throw new Error('Failed to create ranking item!');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.createRankingItem = createRankingItem;
function updateRankingItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var query, variable, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n    mutation UpdateRankingItem($id: ID!, $date: String!, $names: [String!]!, $type: RankingType!, $values: [String!]!, $version: Int!) {\n      updateRankingItem(input: {id: $id, date: $date, names: $names, type: $type, values: $values, _version: $version}) {\n        id\n        date\n        _version\n        names\n        type\n        values\n        updatedAt\n        createdAt\n        _lastChangedAt\n        _deleted\n      }\n    }\n  ";
                    variable = {
                        id: item.id,
                        date: item.date,
                        names: item.names,
                        type: item.type,
                        values: item.values,
                        version: item._version
                    };
                    return [4 /*yield*/, (0, api_1.execute)(query, variable)];
                case 1:
                    response = _a.sent();
                    if (response.statusCode != 200) {
                        throw new Error('Failed to create ranking item!');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateRankingItem = updateRankingItem;
