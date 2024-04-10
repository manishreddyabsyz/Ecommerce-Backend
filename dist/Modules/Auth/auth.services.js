"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.candidateSignin = exports.candidateSignup = void 0;
const database_1 = require("@loaders/database");
const user_model_1 = require("../users/user.model");
const responseServices_1 = require("@services/responseServices");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const helperfunction_1 = require("@utils/helperfunction");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        const refreshtoken = await (0, helperfunction_1.generateRefreshToken)(userDetails);
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
        const refresh_token = await (0, helperfunction_1.generateRefreshToken)(userDetails);
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
const getToken = async (inputDetails) => {
    try {
        let response;
        const { refreshtoken, id } = inputDetails;
        const userData = await user_model_1.UsersModel.findOne({ where: { id: id } });
        if (!userData || userData.length === 0) {
            return (0, responseServices_1.setErrorResponse)({
                statusCode: 404,
                message: (0, responseServices_1.getResponseMessage)("USERS_NOT_FOUND"),
            });
        }
        const userDetails = {
            id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            gender: userData.gender,
            email: userData.email,
        };
        const tokenCreationTime = Date.parse(userData.created_at);
        const currentTime = Date.now();
        const tokenExpiryTime = tokenCreationTime + 28 * 24 * 60 * 60 * 1000;
        const timeDifference = tokenExpiryTime - currentTime;
        if (timeDifference > 0) {
            const decodedToken = await jsonwebtoken_1.default.verify(refreshtoken, process.env.REFRESH_SECRET_KEY);
            if (!decodedToken) {
                return (response = (0, responseServices_1.setErrorResponse)({
                    statusCode: 404,
                    message: (0, responseServices_1.getResponseMessage)("INVAILD_REFRESH_TOKEN"),
                }));
            }
            const newAccessToken = await (0, helperfunction_1.generateAccessToken)(userDetails);
            const data = { access_token: newAccessToken, refreshtoken, id };
            return (0, responseServices_1.setSuccessResponse)({
                statusCode: 200,
                message: (0, responseServices_1.getResponseMessage)("TOKEN_GENERATED_AGAIN"),
                data,
            });
        }
        const saltRounds = await bcryptjs_1.default.genSalt(10);
        const newAccessToken = await (0, helperfunction_1.generateAccessToken)(userDetails);
        const newRefreshToken = (await (0, helperfunction_1.generateRefreshToken)(userDetails));
        const hashedRefreshToken = bcryptjs_1.default.hash(newRefreshToken, saltRounds);
        const data = {
            access_token: newAccessToken,
            refresh_token: hashedRefreshToken,
            id,
        };
        return (0, responseServices_1.setSuccessResponse)({
            statusCode: 200,
            message: (0, responseServices_1.getResponseMessage)("TOKEN_GENERATED_AGAIN"),
            data,
        });
    }
    catch (error) {
        return (0, responseServices_1.setErrorResponse)({
            statusCode: 500,
            message: (0, responseServices_1.getResponseMessage)("SOMETHING_WRONG"),
            error,
            details: error,
        });
    }
};
exports.getToken = getToken;
//# sourceMappingURL=auth.services.js.map