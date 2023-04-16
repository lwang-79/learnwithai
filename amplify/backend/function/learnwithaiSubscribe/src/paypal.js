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
exports.isWebhookVerified = exports.getSubscriptionPlanName = exports.getSubscription = exports.getPlan = exports.getAccessToken = exports.cancelSubscription = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var client_ssm_1 = require("@aws-sdk/client-ssm");
var paypalEndpoint = process.env.PAYPAL_API_ENDPOINT;
var paypalClientId = process.env.PAYPAL_CLIENT_ID;
var webhookId = process.env.PAYPAL_WEBHOOK_ID;
function getAccessToken() {
    return __awaiter(this, void 0, void 0, function () {
        var Parameter, url, authData, base64Auth, urlencoded, response, _a, _b, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (new client_ssm_1.SSMClient({
                        region: process.env.AWS_REGION
                    }))
                        .send(new client_ssm_1.GetParameterCommand({
                        Name: process.env['PAYPAL_SECRET'],
                        WithDecryption: true
                    }))];
                case 1:
                    Parameter = (_c.sent()).Parameter;
                    url = "".concat(paypalEndpoint, "/v1/oauth2/token");
                    authData = "".concat(paypalClientId, ":").concat(Parameter.Value);
                    base64Auth = Buffer.from(authData).toString('base64');
                    urlencoded = new URLSearchParams();
                    urlencoded.append('grant_type', 'client_credentials');
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url, {
                            method: 'POST',
                            headers: {
                                'Authorization': "Basic ".concat(base64Auth),
                                'Content-Type': "application/x-www-form-urlencoded"
                            },
                            body: urlencoded,
                            redirect: 'follow'
                        })];
                case 2:
                    response = _c.sent();
                    if (!(response.status != 200)) return [3 /*break*/, 4];
                    _b = (_a = console).error;
                    return [4 /*yield*/, response.json()];
                case 3:
                    _b.apply(_a, [_c.sent()]);
                    throw new Error('Failed to get access token!');
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    data = _c.sent();
                    return [2 /*return*/, data.access_token];
            }
        });
    });
}
exports.getAccessToken = getAccessToken;
function getSubscription(subscriptionId, accessToken) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, _a, _b, subscription;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = "".concat(paypalEndpoint, "/v1/billing/subscriptions/").concat(subscriptionId);
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url, {
                            headers: {
                                'Authorization': "Bearer ".concat(accessToken),
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        })];
                case 1:
                    response = _c.sent();
                    if (!(response.status != 200)) return [3 /*break*/, 3];
                    _b = (_a = console).error;
                    return [4 /*yield*/, response.json()];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    throw new Error('Failed to get subscription detail!');
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    subscription = _c.sent();
                    return [2 /*return*/, subscription];
            }
        });
    });
}
exports.getSubscription = getSubscription;
function cancelSubscription(subscriptionId, accessToken, reason) {
    if (reason === void 0) { reason = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var url, response, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = "".concat(paypalEndpoint, "/v1/billing/subscriptions/").concat(subscriptionId, "/cancel");
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url, {
                            method: 'POST',
                            headers: {
                                'Authorization': "Bearer ".concat(accessToken),
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ reason: reason })
                        })];
                case 1:
                    response = _c.sent();
                    if (!(response.status != 204)) return [3 /*break*/, 3];
                    _b = (_a = console).error;
                    return [4 /*yield*/, response.json()];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    throw new Error('Failed to cancel subscription!');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.cancelSubscription = cancelSubscription;
function getPlan(planId, accessToken) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, _a, _b, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = "".concat(paypalEndpoint, "/v1/billing/plans/").concat(planId);
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url, {
                            headers: {
                                'Authorization': "Bearer ".concat(accessToken),
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        })];
                case 1:
                    response = _c.sent();
                    if (!(response.status != 200)) return [3 /*break*/, 3];
                    _b = (_a = console).error;
                    return [4 /*yield*/, response.json()];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    throw new Error('Failed to get plan detail!');
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _c.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
exports.getPlan = getPlan;
function getSubscriptionPlanName(subscriptionId, accessToken) {
    return __awaiter(this, void 0, void 0, function () {
        var subscription, plan;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSubscription(subscriptionId, accessToken)];
                case 1:
                    subscription = _a.sent();
                    return [4 /*yield*/, getPlan(subscription.plan_id, accessToken)];
                case 2:
                    plan = _a.sent();
                    return [2 /*return*/, plan.name.split(' ')[0]];
            }
        });
    });
}
exports.getSubscriptionPlanName = getSubscriptionPlanName;
function isWebhookVerified(event) {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, body, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "".concat(paypalEndpoint, "/v1/notifications/verify-webhook-signature");
                    return [4 /*yield*/, getAccessToken()];
                case 1:
                    token = _a.sent();
                    body = {
                        auth_algo: event.multiValueHeaders['PAYPAL-AUTH-ALGO'][0],
                        cert_url: event.multiValueHeaders['PAYPAL-CERT-URL'][0],
                        transmission_id: event.multiValueHeaders['PAYPAL-TRANSMISSION-ID'][0],
                        transmission_sig: event.multiValueHeaders['PAYPAL-TRANSMISSION-SIG'][0],
                        transmission_time: event.multiValueHeaders['PAYPAL-TRANSMISSION-TIME'][0],
                        webhook_id: webhookId,
                        webhook_event: JSON.parse(event.body)
                    };
                    return [4 /*yield*/, (0, node_fetch_1["default"])(url, {
                            method: 'POST',
                            headers: {
                                'Authorization': "Bearer ".concat(token),
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (response.status != 200) {
                        return [2 /*return*/, false];
                    }
                    if (data.verification_status == 'SUCCESS') {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.isWebhookVerified = isWebhookVerified;
