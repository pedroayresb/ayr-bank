"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createTokens = void 0;
var _a = require("jsonwebtoken"), sign = _a.sign, verify = _a.verify;
var createTokens = function (user) {
    var accessToken = sign({ id: user.id }, "ngprojetct");
    return accessToken;
};
exports.createTokens = createTokens;
var validateToken = function (req, res, next) {
    var accessToken = req.body.accessToken;
    if (!accessToken) {
        return res.status(400).json({ error: "User not Authenticated!" });
    }
    try {
        var validToken = verify(accessToken, "ngprojetct");
        if (validToken) {
            return next();
        }
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
};
exports.validateToken = validateToken;
