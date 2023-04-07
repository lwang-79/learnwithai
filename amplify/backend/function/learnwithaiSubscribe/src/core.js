"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.updateMembershipLevel = exports.unsubscribePlanFromWebhook = exports.unsubscribePlanFromGraphQL = exports.getPlanSubscriptions = exports.createSubscription = void 0;
var graphql_1 = require("./graphql");
var paypal_1 = require("./paypal");
var quota_1 = require("./quota");
function createSubscription(subscriptionId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var duplicatedMessage, token, subscription, plan, planName, userMembership, membership, quota, body, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    duplicatedMessage = 'Subscribed successfully. Please note you have another higher level plan subscription.';
                    return [4 /*yield*/, (0, paypal_1.getAccessToken)()];
                case 1:
                    token = _b.sent();
                    return [4 /*yield*/, (0, paypal_1.getSubscription)(subscriptionId, token)];
                case 2:
                    subscription = _b.sent();
                    return [4 /*yield*/, (0, paypal_1.getPlan)(subscription.plan_id, token)];
                case 3:
                    plan = _b.sent();
                    planName = plan.name.split(' ')[0];
                    return [4 /*yield*/, (0, graphql_1.getUserMembershipById)(userId)];
                case 4:
                    userMembership = _b.sent();
                    membership = userMembership.membership, quota = userMembership.quota;
                    body = 'Subscribed successfully. Plan has been upgraded.';
                    _a = planName;
                    switch (_a) {
                        case 'Personal': return [3 /*break*/, 5];
                        case 'Professional': return [3 /*break*/, 6];
                        case 'Enterprise': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 14];
                case 5:
                    membership.paypalSubscriptions.personal.splice(0, 0, subscriptionId);
                    if (membership.paypalSubscriptions.personal.length > 5) {
                        membership.paypalSubscriptions.personal = membership.paypalSubscriptions.personal.slice(0, 5);
                    }
                    if (membership.current > 2) {
                        body = duplicatedMessage;
                        return [3 /*break*/, 14];
                    }
                    membership.previous = membership.current;
                    membership.current = 2;
                    quota = quota_1.Quota.personal;
                    return [3 /*break*/, 14];
                case 6:
                    membership.paypalSubscriptions.professional.splice(0, 0, subscriptionId);
                    if (membership.paypalSubscriptions.professional.length > 5) {
                        membership.paypalSubscriptions.professional = membership.paypalSubscriptions.professional.slice(0, 5);
                    }
                    if (membership.current > 3) {
                        body = duplicatedMessage;
                        return [3 /*break*/, 14];
                    }
                    membership.previous = membership.current;
                    membership.current = 3;
                    quota = quota_1.Quota.professional;
                    if (!(membership.previous == 2)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, paypal_1.cancelSubscription)(membership.paypalSubscriptions.personal[0], token)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3 /*break*/, 14];
                case 9:
                    membership.paypalSubscriptions.enterprise.splice(0, 0, subscriptionId);
                    if (membership.paypalSubscriptions.enterprise.length > 5) {
                        membership.paypalSubscriptions.enterprise = membership.paypalSubscriptions.enterprise.slice(0, 5);
                    }
                    if (membership.current > 4) {
                        body = duplicatedMessage;
                        return [3 /*break*/, 14];
                    }
                    membership.previous = membership.current;
                    membership.current = 4;
                    quota = quota_1.Quota.enterprise;
                    if (!(membership.previous == 3)) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, paypal_1.cancelSubscription)(membership.paypalSubscriptions.professional[0], token)];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11:
                    if (!(membership.previous == 2)) return [3 /*break*/, 13];
                    return [4 /*yield*/, (0, paypal_1.cancelSubscription)(membership.paypalSubscriptions.personal[0], token)];
                case 12:
                    _b.sent();
                    _b.label = 13;
                case 13: return [3 /*break*/, 14];
                case 14: return [4 /*yield*/, (0, graphql_1.updateUserMembership)(__assign(__assign({}, userMembership), { membership: membership, quota: quota, payerId: subscription.subscriber.payer_id }))];
                case 15:
                    _b.sent();
                    return [2 /*return*/, {
                            statusCode: 200,
                            body: body
                        }];
            }
        });
    });
}
exports.createSubscription = createSubscription;
function unsubscribePlanFromWebhook(subscriptionId, payerId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, userMemberships, userMembership, _i, userMemberships_1, userM, stringOfUserM, paypalSubscriptions, membership, quota, _a, _b, plan, _c, _d, plan, token, subscription;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, graphql_1.getUserMembershipsByPayerId)(payerId)];
                case 1:
                    response = _e.sent();
                    if (response.statusCode != 200) {
                        console.error(response);
                        return [2 /*return*/, {
                                statusCode: response.statusCode,
                                body: response.body
                            }];
                    }
                    userMemberships = response.body;
                    if (userMemberships.length == 0) {
                        console.log('The payerId is not found');
                        return [2 /*return*/, { statusCode: 200, body: 'The payerId is not found' }];
                    }
                    for (_i = 0, userMemberships_1 = userMemberships; _i < userMemberships_1.length; _i++) {
                        userM = userMemberships_1[_i];
                        stringOfUserM = JSON.stringify(userM);
                        if (stringOfUserM.includes(subscriptionId)) {
                            userMembership = userM;
                        }
                    }
                    if (!userMembership) {
                        console.log('The subscription is not found');
                        return [2 /*return*/, { statusCode: 200, body: 'The subscription is not found' }];
                    }
                    paypalSubscriptions = userMembership.membership.paypalSubscriptions;
                    membership = userMembership.membership, quota = userMembership.quota;
                    // set default value
                    membership.current = 1;
                    quota = quota_1.Quota.free;
                    for (_a = 0, _b = ['enterprise', 'professional', 'personal']; _a < _b.length; _a++) {
                        plan = _b[_a];
                        if (paypalSubscriptions[plan][0] == subscriptionId) {
                            membership.previous = plan == 'enterprise' ? 4 : plan === 'professional' ? 3 : 2;
                        }
                    }
                    ;
                    _c = 0, _d = ['enterprise', 'professional', 'personal'];
                    _e.label = 2;
                case 2:
                    if (!(_c < _d.length)) return [3 /*break*/, 6];
                    plan = _d[_c];
                    if (!(paypalSubscriptions[plan][0] &&
                        paypalSubscriptions[plan][0] != subscriptionId)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, paypal_1.getAccessToken)()];
                case 3:
                    token = _e.sent();
                    return [4 /*yield*/, (0, paypal_1.getSubscription)(paypalSubscriptions[plan][0], token)];
                case 4:
                    subscription = _e.sent();
                    if (subscription.status == 'ACTIVE') {
                        quota = quota_1.Quota[plan];
                        membership.current = plan == 'enterprise' ? 4 : plan === 'professional' ? 3 : 2;
                        return [3 /*break*/, 6];
                    }
                    _e.label = 5;
                case 5:
                    _c++;
                    return [3 /*break*/, 2];
                case 6: return [4 /*yield*/, (0, graphql_1.updateUserMembership)(__assign(__assign({}, userMembership), { membership: membership, quota: quota }))];
                case 7:
                    _e.sent();
                    return [2 /*return*/, {
                            statusCode: 200,
                            body: 'Success'
                        }];
            }
        });
    });
}
exports.unsubscribePlanFromWebhook = unsubscribePlanFromWebhook;
function unsubscribePlanFromGraphQL(subscriptionId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var body, token, userMembership, paypalSubscriptions, membership, quota, _i, _a, plan, _b, _c, plan, subscription;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    body = 'Unsubscribed successfully.';
                    return [4 /*yield*/, (0, paypal_1.getAccessToken)()];
                case 1:
                    token = _d.sent();
                    return [4 /*yield*/, (0, paypal_1.cancelSubscription)(subscriptionId, token)];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, (0, graphql_1.getUserMembershipById)(userId)];
                case 3:
                    userMembership = _d.sent();
                    if (!userMembership) {
                        console.log('The user is not found');
                        return [2 /*return*/, { statusCode: 404, body: 'The user is not found' }];
                    }
                    paypalSubscriptions = userMembership.membership.paypalSubscriptions;
                    membership = userMembership.membership, quota = userMembership.quota;
                    // set default value
                    membership.current = 1;
                    quota = quota_1.Quota.free;
                    for (_i = 0, _a = ['enterprise', 'professional', 'personal']; _i < _a.length; _i++) {
                        plan = _a[_i];
                        if (paypalSubscriptions[plan][0] == subscriptionId) {
                            membership.previous = plan == 'enterprise' ? 4 : plan === 'professional' ? 3 : 2;
                        }
                    }
                    ;
                    _b = 0, _c = ['enterprise', 'professional', 'personal'];
                    _d.label = 4;
                case 4:
                    if (!(_b < _c.length)) return [3 /*break*/, 7];
                    plan = _c[_b];
                    if (!(paypalSubscriptions[plan][0] &&
                        paypalSubscriptions[plan][0] != subscriptionId)) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, paypal_1.getSubscription)(paypalSubscriptions[plan][0], token)];
                case 5:
                    subscription = _d.sent();
                    if (subscription.status == 'ACTIVE') {
                        quota = quota_1.Quota[plan];
                        membership.current = plan == 'enterprise' ? 4 : plan === 'professional' ? 3 : 2;
                        return [3 /*break*/, 7];
                    }
                    _d.label = 6;
                case 6:
                    _b++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, (0, graphql_1.updateUserMembership)(__assign(__assign({}, userMembership), { membership: membership, quota: quota }))];
                case 8:
                    _d.sent();
                    return [2 /*return*/, {
                            statusCode: 200,
                            body: body
                        }];
            }
        });
    });
}
exports.unsubscribePlanFromGraphQL = unsubscribePlanFromGraphQL;
function getPlanSubscriptions(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var userMembership, paypalSubscriptions, token, subscriptions, _i, _a, plan, subscription;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, graphql_1.getUserMembershipById)(userId)];
                case 1:
                    userMembership = _b.sent();
                    paypalSubscriptions = userMembership.membership.paypalSubscriptions;
                    return [4 /*yield*/, (0, paypal_1.getAccessToken)()];
                case 2:
                    token = _b.sent();
                    subscriptions = {
                        personal: { id: '', plan_name: '', create_time: '', status: '' },
                        professional: { id: '', plan_name: '', create_time: '', status: '' },
                        enterprise: { id: '', plan_name: '', create_time: '', status: '' }
                    };
                    _i = 0, _a = ['enterprise', 'professional', 'personal'];
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    plan = _a[_i];
                    if (!paypalSubscriptions[plan][0])
                        return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, paypal_1.getSubscription)(paypalSubscriptions[plan][0], token)];
                case 4:
                    subscription = _b.sent();
                    subscriptions[plan] = {
                        id: subscription.id,
                        plan_name: plan,
                        create_time: subscription.create_time,
                        status: subscription.status
                    };
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify(subscriptions)
                    }];
            }
        });
    });
}
exports.getPlanSubscriptions = getPlanSubscriptions;
function updateMembershipLevel(userId, level) {
    return __awaiter(this, void 0, void 0, function () {
        var userMembership;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, graphql_1.getUserMembershipById)(userId)];
                case 1:
                    userMembership = _a.sent();
                    return [4 /*yield*/, (0, graphql_1.updateUserMembership)(__assign(__assign({}, userMembership), { membership: __assign(__assign({}, userMembership.membership), { current: level, previous: userMembership.membership.current }) }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, {
                            statusCode: 200,
                            body: 'Success'
                        }];
            }
        });
    });
}
exports.updateMembershipLevel = updateMembershipLevel;
