"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config({ path: `.env` });
const environment = {
    port: parseInt(process.env.PORT, 10),
    database: {
        mysql: {
            host: process.env.MYSQL_HOST,
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: process.env.MYSQL_PORT || 3306,
            dialect: "mysql",
        },
    },
};
exports.default = environment;
//# sourceMappingURL=config.js.map