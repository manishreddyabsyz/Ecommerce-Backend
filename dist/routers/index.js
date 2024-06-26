"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const index_1 = __importDefault(require("../Modules/Auth/index"));
const index_2 = __importDefault(require("../Modules/Products/index"));
const index_3 = __importDefault(require("../Modules/UserCartDetails/index"));
const routes = (app) => {
    app.use("/api/auth", index_1.default);
    app.use("/api", index_2.default);
    app.use("/api", index_3.default);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map