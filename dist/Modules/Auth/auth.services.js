"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateSignin = exports.candidateSignup = void 0;
const database_1 = require("@loaders/database");
const user_model_1 = require("../users/user.model");
const responseServices_1 = require("@services/responseServices");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helperfunction_1 = require("@utils/helperfunction");
const candidateSignup = async (userDetails) => {
    const transaction = await database_1.sequelize.transaction();
    try {
        let response;
        const { firstname, lastname, email, password, gender } = userDetails;
        console.log(email);
        const isUserExist = await user_model_1.UsersModel.findOne({
            where: { email },
            transaction,
        });
        console.log(isUserExist, "isuserexist");
        if (isUserExist) {
            transaction.rollback();
            return (response = (0, responseServices_1.setErrorResponse)({
                statusCode: 400,
                message: (0, responseServices_1.getResponseMessage)("EMAIL_ALREADY_EXIST"),
            }));
        }
        const saltrounds = await bcryptjs_1.default.genSalt(10);
        const hashpassword = await bcryptjs_1.default.hash(password, saltrounds);
        const accesstoken = await (0, helperfunction_1.generateAccessToken)(userDetails);
        const refreshtoken = await (0, helperfunction_1.genrateRefreshToken)(userDetails);
        const username = `${firstname} ${lastname}`;
        const userInfo = await user_model_1.UsersModel.create({
            firstname,
            lastname,
            email,
            password: hashpassword,
            gender,
            accesstoken,
            refreshtoken,
        }, { transaction });
        const data = {
            firstname,
            lastname,
            email,
            gender,
            refreshtoken,
            accesstoken,
        };
        if (!userInfo) {
            transaction.rollback();
            return (response = (0, responseServices_1.setErrorResponse)({
                statusCode: 500,
                message: (0, responseServices_1.getResponseMessage)("REGISTRATION_FAILED"),
            }));
        }
        transaction.commit();
        await (0, helperfunction_1.sendmail)(userDetails, username);
        return (0, responseServices_1.setSuccessResponse)({
            statusCode: 200,
            message: (0, responseServices_1.getResponseMessage)("REGISTRATION_SUCCESS"),
        });
    }
    catch (error) {
        transaction.rollback();
        const result = (0, responseServices_1.setErrorResponse)({
            statusCode: 500,
            message: (0, responseServices_1.getResponseMessage)("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return result;
    }
};
exports.candidateSignup = candidateSignup;
const candidateSignin = async (userlogindetails) => {
    let response;
    const transaction = await database_1.sequelize.transaction();
    try {
        const { email, password } = userlogindetails;
        const isUserFound = await user_model_1.UsersModel.findOne({
            where: { email },
        });
        if (isUserFound.length === 0) {
            return (0, responseServices_1.setErrorResponse)({
                statusCode: 500,
                message: (0, responseServices_1.getResponseMessage)("USER_NOT_REGISTERED"),
            });
        }
        const passwordmatched = await bcryptjs_1.default.compare(password, isUserFound.password);
        if (!passwordmatched) {
            return (0, responseServices_1.setErrorResponse)({
                statusCode: 400,
                message: (0, responseServices_1.getResponseMessage)("INVALID_PASSWORD"),
            });
        }
        const userDetails = {
            id: isUserFound.id,
            firstname: isUserFound.firstname,
            lastname: isUserFound.lastname,
            email: isUserFound.email,
            gender: isUserFound.gender,
        };
        const access_token = await (0, helperfunction_1.generateAccessToken)(userDetails);
        const refresh_token = await (0, helperfunction_1.genrateRefreshToken)(userDetails);
        await user_model_1.UsersModel.update({
            refreshtoken: refresh_token,
            accesstoken: access_token,
        }, {
            where: { email },
            transaction,
        });
        const data = Object.assign(Object.assign({}, userDetails), { accessToken: access_token, refreshToken: refresh_token });
        transaction.commit();
        response = (0, responseServices_1.setSuccessResponse)({
            statusCode: 200,
            message: (0, responseServices_1.getResponseMessage)("LOGIN_SUCCESS"),
            data,
        });
        return response;
    }
    catch (error) {
        console.log("error validating userlogin details", error);
        transaction.rollback();
        const result = (0, responseServices_1.setErrorResponse)({
            statusCode: 500,
            message: (0, responseServices_1.getResponseMessage)("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return result;
    }
};
exports.candidateSignin = candidateSignin;
//# sourceMappingURL=auth.services.js.map