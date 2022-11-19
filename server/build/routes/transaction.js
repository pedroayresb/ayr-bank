"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transactions_1 = require("../controllers/transactions");
var express_1 = require("express");
var router = (0, express_1.Router)();
var JWT_1 = require("../JWT");
router
    .get('/all', transactions_1.getAllHistory)
    .put('/transfer', JWT_1.validateToken, transactions_1.transfer)
    .post('/history', JWT_1.validateToken, transactions_1.getHistory)
    .post('/sendhistory', JWT_1.validateToken, transactions_1.getSendHistory)
    .post('/recievehistory', JWT_1.validateToken, transactions_1.getRecieveHistory);
module.exports = router;
