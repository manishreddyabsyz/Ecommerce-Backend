"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const module_alias_1 = __importDefault(require("module-alias"));
module_alias_1.default.addAliases({
    "@config": `${__dirname}/config`,
    "@loaders": `${__dirname}/loaders`,
    "@middleware": `${__dirname}/middlewares`,
    "@modules": `${__dirname}/modules`,
    "@dtos": `${__dirname}/dtos`,
    "@utils": `${__dirname}/helperFunctions`,
    "@routers": `${__dirname}/routers`,
    "@services": `${__dirname}/services`,
});
const app = (0, express_1.default)();
const loaderModule = async () => {
    require("./loaders").default({ expressApp: app });
};
loaderModule();
exports.default = app;
//# sourceMappingURL=app.js.map