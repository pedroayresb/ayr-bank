"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;

var sequelize_1 = require("sequelize");

var db = new sequelize_1.Sequelize('ng-project', 'postgres', 'postgres_password', {
    host: 'postgres',
    dialect: 'postgres',
    port: 5432,
});
exports.db = db;
