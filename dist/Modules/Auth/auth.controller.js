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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.userSignin = exports.userSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const AuthServices = __importStar(require("./auth.services"));
const helperfunction_1 = require("@utils/helperfunction");
const responseServices_1 = require("@services/responseServices");
const userSignup = async (req, res) => {
    try {
        let response;
        const userDetails = req.body;
        const schema = joi_1.default.object()
            .options({})
            .keys({
            firstname: joi_1.default.string().required().label("First Name"),
            lastname: joi_1.default.string().required().label("Last Name"),
            email: joi_1.default.string()
                .email()
                .regex(/@gmail\.com$|/, { name: "email" })
                .required()
                .label("Email"),
            password: joi_1.default.string()
                .min(8)
                .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).*$/)
                .message(`"{#label}" must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.`)
                .required()
                .label("Password"),
            gender: joi_1.default.string().required().label("Gender"),
        });
        const validateResult = await (0, helperfunction_1.schemaValidation)(userDetails, schema);
        if (!validateResult) {
            response = (0, responseServices_1.sendResponse)(validateResult);
            return res.json(response);
        }
        else {
            response = await AuthServices.candidateSignup(userDetails);
            return res.json(response);
        }
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
exports.userSignup = userSignup;
const userSignin = async (req, res) => {
    let response;
    const userlogindetails = req.body;
    const schema = joi_1.default.object()
        .options({})
        .keys({
        email: joi_1.default.string().required().label("Email"),
        password: joi_1.default.string().required().label("Password"),
    });
    const validateResult = await (0, helperfunction_1.schemaValidation)(userlogindetails, schema);
    if (!validateResult) {
        response = (0, responseServices_1.sendResponse)(validateResult);
        return res.json(response);
    }
    else {
        response = await AuthServices.candidateSignin(userlogindetails);
        response = (0, responseServices_1.sendResponse)(response);
        return res.json(response);
    }
};
exports.userSignin = userSignin;
const getToken = async (req, res) => {
    try {
        let response;
        const userDetails = req.body;
        const schema = joi_1.default.object().options({}).keys({
            refreshtoken: joi_1.default.string().required(),
            id: joi_1.default.number().required()
        });
        const validateResult = await (0, helperfunction_1.schemaValidation)(userDetails, schema);
        if (validateResult.status) {
            response = await AuthServices.getToken(userDetails);
            response = (0, responseServices_1.sendResponse)(response);
            return res.json(response);
        }
        else {
            response = (0, responseServices_1.sendResponse)(validateResult);
            return res.json(response);
        }
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
exports.getToken = getToken;
//# sourceMappingURL=auth.controller.js.map