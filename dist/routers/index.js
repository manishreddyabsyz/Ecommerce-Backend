"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const index_1 = __importDefault(require("../Modules/Auth/index"));
const routes = (app) => {
    app.use("/api/auth", index_1.default);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map