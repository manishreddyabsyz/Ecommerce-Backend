"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const { database, username, password, port, host } = config_1.default.database.mysql;
console.log(database, username, password, port, host);
exports.sequelize = new sequelize_1.Sequelize(database, username, password, {
    dialect: "mysql",
    host,
    port,
    logging: false,
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("MYSQL Connection has been established successfully.");
})
    .catch((error) => {
    console.log("Unable to connect to database: ", error);
});
//# sourceMappingURL=database.js.map