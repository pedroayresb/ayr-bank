"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../controllers/user");
var express_1 = require("express");
var router = (0, express_1.Router)();
var JWT_1 = require("../JWT");
var register_1 = require("../middlewares/register");
router
    .post('/login', user_1.login)
    .post('/register', register_1.validateRegister, user_1.register)
    .get('/', user_1.getUsers)
    .get('/profile', JWT_1.validateToken, user_1.getProfile)
    .get('/:id', user_1.getUserById)
    .post('/autologin', user_1.loginWithToken);
module.exports = router;
