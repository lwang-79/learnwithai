/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["PAYPAL_SECRET"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
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
var paypal_1 = require("./paypal");
var core_1 = require("./core");
exports.handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var statusCode, body;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("EVENT: ".concat(JSON.stringify(event)));
                statusCode = 200;
                body = 'Success';
                if (!(event.multiValueHeaders &&
                    event.multiValueHeaders['PAYPAL-AUTH-ALGO'])) return [3 /*break*/, 2];
                return [4 /*yield*/, handlePaypalWebhook(event)];
            case 1:
                (_a = _c.sent(), statusCode = _a.statusCode, body = _a.body);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, handleGraphQL(event)];
            case 3:
                (_b = _c.sent(), statusCode = _b.statusCode, body = _b.body);
                _c.label = 4;
            case 4: return [2 /*return*/, {
                    statusCode: statusCode,
                    body: body
                }];
        }
    });
}); };
function handlePaypalWebhook(event) {
    return __awaiter(this, void 0, void 0, function () {
        var statusCode, body, eventBody, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, paypal_1.isWebhookVerified)(event)];
                case 1:
                    if (!(_c.sent())) {
                        return [2 /*return*/, { statusCode: 400 }];
                    }
                    ;
                    statusCode = 200;
                    body = 'Success';
                    eventBody = JSON.parse(event.body);
                    console.log(eventBody);
                    _a = eventBody.event_type;
                    switch (_a) {
                        case 'BILLING.SUBSCRIPTION.CANCELLED': return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 2:
                    if (!eventBody.resource.id ||
                        !eventBody.resource.subscriber.payer_id)
                        return [2 /*return*/, { statusCode: 200 }];
                    return [4 /*yield*/, (0, core_1.unsubscribePlanFromWebhook)(eventBody.resource.id, eventBody.resource.subscriber.payer_id)];
                case 3:
                    (_b = _c.sent(), statusCode = _b.statusCode, body = _b.body);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, {
                        statusCode: statusCode,
                        body: body
                    }];
            }
        });
    });
}
function handleGraphQL(event) {
    return __awaiter(this, void 0, void 0, function () {
        var statusCode, body, _a;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    statusCode = 200;
                    body = 'Success';
                    _a = event.arguments.operation;
                    switch (_a) {
                        case 'create': return [3 /*break*/, 1];
                        case 'cancel': return [3 /*break*/, 3];
                        case 'getPlanSubscriptions': return [3 /*break*/, 5];
                        case 'setToFreePlan': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1: return [4 /*yield*/, (0, core_1.createSubscription)(event.arguments.subscriptionId, event.arguments.userId)];
                case 2:
                    (_b = _f.sent(), statusCode = _b.statusCode, body = _b.body);
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, (0, core_1.unsubscribePlanFromGraphQL)(event.arguments.subscriptionId, event.arguments.userId)];
                case 4:
                    (_c = _f.sent(), statusCode = _c.statusCode, body = _c.body);
                    return [3 /*break*/, 9];
                case 5: return [4 /*yield*/, (0, core_1.getPlanSubscriptions)(event.arguments.userId)];
                case 6:
                    (_d = _f.sent(), statusCode = _d.statusCode, body = _d.body);
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, (0, core_1.updateMembershipLevel)(event.arguments.userId, 1)];
                case 8:
                    (_e = _f.sent(), statusCode = _e.statusCode, body = _e.body);
                    _f.label = 9;
                case 9: return [2 /*return*/, {
                        statusCode: statusCode,
                        body: body
                    }];
            }
        });
    });
}
