"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
var validateRegister = function (req, res, next) {
    var _a = req.body, user_name = _a.user_name, password = _a.password;
    if (!user_name || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (user_name.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }
    if (password.length < 8) {
        return res
            .status(400)
            .json({ message: 'Password must be at least 8 characters' });
    }
    next();
};
exports.validateRegister = validateRegister;
