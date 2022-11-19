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
exports.loginWithToken = exports.getUserById = exports.getProfile = exports.getUsers = exports.register = exports.login = void 0;
var user_1 = require("../models/user");
var CryptoJS = require("crypto-js");
var JWT_1 = require("../JWT");
var jsonwebtoken_1 = require("jsonwebtoken");
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_name, password, hashedPassword, hasUser, account, accessToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user_name = _a.user_name, password = _a.password;
                hashedPassword = CryptoJS.SHA256(password).toString();
                return [4 /*yield*/, user_1.User.findOne({ where: { user_name: user_name, password: hashedPassword } })];
            case 1:
                hasUser = _b.sent();
                if (!hasUser) return [3 /*break*/, 3];
                return [4 /*yield*/, user_1.Account.findOne({ where: { id: hasUser.account_id } })];
            case 2:
                account = _b.sent();
                accessToken = (0, JWT_1.createTokens)(hasUser);
                res.cookie('accessToken', accessToken, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true,
                });
                res.status(200).json({ hasUser: hasUser, account: account, accessToken: accessToken });
                return [3 /*break*/, 4];
            case 3:
                res.status(401).json({ message: 'Username or Password is Incorrect' });
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user_name, password, hasUser, hashedPassword, account, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user_name = _a.user_name, password = _a.password;
                return [4 /*yield*/, user_1.User.findOne({ where: { user_name: user_name } })];
            case 1:
                hasUser = _b.sent();
                if (!hasUser) return [3 /*break*/, 2];
                res.status(409).json({ message: 'User already exists' });
                return [3 /*break*/, 5];
            case 2:
                hashedPassword = CryptoJS.SHA256(password).toString();
                return [4 /*yield*/, user_1.Account.create({ balance: 100 })];
            case 3:
                account = _b.sent();
                return [4 /*yield*/, user_1.User.create({ user_name: user_name, password: hashedPassword, account_id: account.id })];
            case 4:
                user = _b.sent();
                res.status(200).json({ user: user, account: account });
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.User.findAll()];
            case 1:
                allUsers = _a.sent();
                res.status(200).json({ allUsers: allUsers });
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var getProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_name, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_name = req.body.user_name;
                return [4 /*yield*/, user_1.User.findOne({ where: { user_name: user_name } })];
            case 1:
                user = _a.sent();
                if (user) {
                    res.status(200).json({ user: user });
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.getProfile = getProfile;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user_1.User.findOne({ where: { id: id } })];
            case 1:
                user = _a.sent();
                if (user) {
                    res.status(200).json({ user: user });
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var loginWithToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, validToken, hasUser, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accessToken = req.body.accessToken;
                if (!accessToken) {
                    return [2 /*return*/, res.status(400).json({ error: "User not Authenticated!" })];
                }
                validToken = (0, jsonwebtoken_1.verify)(accessToken, "ngprojetct");
                if (!validToken) return [3 /*break*/, 3];
                return [4 /*yield*/, user_1.User.findOne({ where: { id: validToken.id } })];
            case 1:
                hasUser = _a.sent();
                return [4 /*yield*/, user_1.Account.findOne({ where: { id: hasUser.account_id } })];
            case 2:
                account = _a.sent();
                res.status(200).json({ message: 'User Authenticated!', hasUser: hasUser, account: account });
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json({ error: "User not Authenticated!" });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginWithToken = loginWithToken;
