"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const database_1 = require("./database");
const express_1 = __importDefault(require("./express"));
exports.default = async ({ expressApp }) => {
    await database_1.sequelize;
    await (0, express_1.default)({ app: expressApp });
};
//# sourceMappingURL=index.js.map