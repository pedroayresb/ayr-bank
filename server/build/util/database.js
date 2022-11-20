"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var dotenv = require("dotenv");
dotenv.config();
var sequelize_1 = require("sequelize");
var database = process.env.DATABASE ? process.env.DATABASE : 'ng-project';
var username = process.env.USERNAME ? process.env.USERNAME : 'postgres';
var password = process.env.PASSWORD ? process.env.PASSWORD : 'postgres_password';
var host = process.env.HOST ? process.env.HOST : 'localhost';
console.log(database, username, password);
var db = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: 'postgres',
    port: 5432,
});
exports.db = db;
