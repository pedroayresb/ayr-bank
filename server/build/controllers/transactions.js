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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHistory = exports.getRecieveHistory = exports.getSendHistory = exports.getHistory = exports.transfer = void 0;
var user_1 = require("../models/user");
;
[];
var transfer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_name, amount, reciever_name, hasUser, hasReciver, account, newSenderBalance, recieverAccount, newRecieverBalance, newAccount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user_name = _a.user_name, amount = _a.amount, reciever_name = _a.reciever_name;
                return [4 /*yield*/, user_1.User.findOne({ where: { user_name: user_name } })];
            case 1:
                hasUser = _b.sent();
                return [4 /*yield*/, user_1.User.findOne({ where: { user_name: reciever_name } })];
            case 2:
                hasReciver = _b.sent();
                return [4 /*yield*/, user_1.Account.findOne({ where: { id: hasUser.account_id } })];
            case 3:
                account = _b.sent();
                if (!(hasUser === null)) return [3 /*break*/, 4];
                res.status(400).json({ message: 'User does not exist' });
                return [3 /*break*/, 14];
            case 4:
                if (!(hasReciver === null)) return [3 /*break*/, 5];
                res.status(400).json({ message: 'Recipient does not exist' });
                return [3 /*break*/, 14];
            case 5:
                if (!(hasUser.id === hasReciver.id)) return [3 /*break*/, 6];
                res.status(400).json({ message: 'You cannot send money to yourself' });
                return [3 /*break*/, 14];
            case 6:
                if (!(Number(amount) <= 0)) return [3 /*break*/, 7];
                res.status(400).json({ message: 'Amount must be greater than 0' });
                return [3 /*break*/, 14];
            case 7:
                if (!(Number(amount) <= account.balance)) return [3 /*break*/, 13];
                newSenderBalance = Number(account.balance) - Number(amount);
                return [4 /*yield*/, user_1.Account.update({ balance: Number(newSenderBalance) }, { where: { id: account.id } })];
            case 8:
                _b.sent();
                return [4 /*yield*/, user_1.Account.findOne({ where: { id: hasReciver.account_id } })];
            case 9:
                recieverAccount = _b.sent();
                newRecieverBalance = Number(recieverAccount.balance) + Number(amount);
                return [4 /*yield*/, user_1.Account.update({ balance: Number(newRecieverBalance) }, { where: { id: recieverAccount.id } })];
            case 10:
                _b.sent();
                return [4 /*yield*/, user_1.Transaction.create({
                        value: Number(amount),
                        creditedAccount: hasUser.id,
                        debitedAccount: hasReciver.id,
                        createdAt: new Date(),
                    })];
            case 11:
                _b.sent();
                return [4 /*yield*/, user_1.Account.findOne({ where: { id: hasUser.account_id } })];
            case 12:
                newAccount = _b.sent();
                res.status(200).json({ message: 'Transfer Successful', newAccount: newAccount });
                return [3 /*break*/, 14];
            case 13:
                if (Number(amount) > account.balance) {
                    res.status(400).json({ message: 'Insufficient Funds' });
                }
                _b.label = 14;
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.transfer = transfer;
var getHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_name, hasUser, sendTransactions, recieveTransactions, transactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_name = req.body.user_name;
                return [4 /*yield*/, user_1.User.findOne({ where: { user_name: user_name } })];
            case 1:
                hasUser = _a.sent();
                if (!hasUser) return [3 /*break*/, 4];
                return [4 /*yield*/, user_1.Transaction.findAll({ where: { creditedAccount: hasUser.id } })];
            case 2:
                sendTransactions = _a.sent();
                return [4 /*yield*/, user_1.Transaction.findAll({ where: { debitedAccount: hasUser.id } })];
            case 3:
                recieveTransactions = _a.sent();
                transactions = sendTransactions.concat(recieveTransactions);
                res.status(200).json({ transactions: transactions });
                return [3 /*break*/, 5];
            case 4:
                res.status(400).json({ message: 'User does not exist' });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getHistory = getHistory;
var getSendHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_name, hasUser, sendTransactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_name = req.body.user_name;
                return [4 /*yield*/, user_1.User.findOne({ where: { user_name: user_name } })];
            case 1:
                hasUser = _a.sent();
                if (!hasUser) return [3 /*break*/, 3];
                return [4 /*yield*/, user_1.Transaction.findAll({ where: { creditedAccount: hasUser.id } })];
            case 2:
                sendTransactions = _a.sent();
                res.status(200).json({ sendTransactions: sendTransactions });
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json({ message: 'User does not exist' });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSendHistory = getSendHistory;
var getRecieveHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_name, hasUser, recieveTransactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_name = req.body.user_name;
                return [4 /*yield*/, user_1.User.findOne({ where: { user_name: user_name } })];
            case 1:
                hasUser = _a.sent();
                if (!hasUser) return [3 /*break*/, 3];
                return [4 /*yield*/, user_1.Transaction.findAll({ where: { debitedAccount: hasUser.id } })];
            case 2:
                recieveTransactions = _a.sent();
                res.status(200).json({ recieveTransactions: recieveTransactions });
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json({ message: 'User does not exist' });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRecieveHistory = getRecieveHistory;
var getAllHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.Transaction.findAll()];
            case 1:
                transactions = _a.sent();
                res.status(200).json({ transactions: transactions });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllHistory = getAllHistory;
