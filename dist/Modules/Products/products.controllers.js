"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlideProducts = exports.getAllProducts = void 0;
const ElectronicsServices = __importStar(require("./products.services"));
const responseServices_1 = require("@services/responseServices");
const getAllProducts = async (req, res) => {
    try {
        let response;
        const id = req.params;
        response = await ElectronicsServices.getAllProducts(id);
        response = (0, responseServices_1.sendResponse)(response);
        return res.json(response);
    }
    catch (error) {
        let result = (0, responseServices_1.setErrorResponse)({
            statusCode: 500,
            message: (0, responseServices_1.getResponseMessage)("SOMETHING_WRONG"),
            error: error,
            details: error,
        });
        result = (0, responseServices_1.sendResponse)(result);
        return res.json(result);
    }
};
exports.getAllProducts = getAllProducts;
const getSlideProducts = async (req, res) => {
    try {
        let response;
        response = await ElectronicsServices.getSlideProducts();
        console.log(response);
        response = (0, responseServices_1.sendResponse)(response);
        return res.json(response);
    }
    catch (error) {
        let result = (0, responseServices_1.setErrorResponse)({
            statusCode: 500,
            message: (0, responseServices_1.getResponseMessage)("SOMETHING_WRONG"),
            error: error,
            details: error,
        });
        result = (0, responseServices_1.sendResponse)(result);
        return res.json(result);
    }
};
exports.getSlideProducts = getSlideProducts;
//# sourceMappingURL=products.controllers.js.map