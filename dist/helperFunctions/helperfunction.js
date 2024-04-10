"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendmail = exports.generateRefreshToken = exports.generateAccessToken = exports.schemaValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const responseServices_1 = require("@services/responseServices");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "manish.naini@absyz.com",
        pass: "oulx aeas vznb vvcf",
    },
});
const schemaValidation = async (data, schema) => {
    try {
        const options = {
            errors: {
                wrap: {
                    label: "",
                },
            },
        };
        const { error } = await schema.validate(data, options);
        let response;
        if (error && error.details) {
            response = (0, responseServices_1.setErrorResponse)({
                statusCode: 422,
                message: error.details[0].message || (0, responseServices_1.getResponseMessage)("VALIDATION_ERROR"),
            });
            return response;
        }
        response = (0, responseServices_1.setSuccessResponse)({
            statusCode: 200,
            message: (0, responseServices_1.getResponseMessage)("VALIDATION_SUCCESS"),
        });
        return response;
    }
    catch (error) {
        const response = (0, responseServices_1.setErrorResponse)({
            statusCode: 500,
            message: (0, responseServices_1.getResponseMessage)("SOMETHING_WRONG"),
            error: error,
            details: error,
        });
        return response;
    }
};
exports.schemaValidation = schemaValidation;
const generateAccessToken = async (userDetails) => {
    const { firstname, lastname, email } = userDetails;
    const payload = {
        firstname,
        lastname,
        email,
    };
    const secretKey = process.env.ACCESS_SECRET_KEY;
    const accessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME;
    try {
        const accesstoken = jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn: accessTokenExpiryTime,
        });
        return accesstoken;
    }
    catch (error) {
        const result = (0, responseServices_1.setErrorResponse)({
            statusCode: 500,
            message: (0, responseServices_1.getResponseMessage)("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return result;
    }
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = async (userDetails) => {
    const { firstname, lastname, email } = userDetails;
    const payload = {
        firstname,
        lastname,
        email,
    };
    const secretKey = process.env.REFRESH_SECRET_KEY;
    const refreshTokenExpiryTime = process.env.REFRESH_TOKEN_EXPIRY_TIME;
    try {
        const refreshtoken = jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn: refreshTokenExpiryTime,
        });
        return refreshtoken;
    }
    catch (error) {
        const result = (0, responseServices_1.setErrorResponse)({
            statusCode: 500,
            message: (0, responseServices_1.getResponseMessage)("SOMETHING_WRONG"),
            error,
            details: error,
        });
        return result;
    }
};
exports.generateRefreshToken = generateRefreshToken;
const sendmail = async (userDetails, username) => {
    try {
        const sendmailtousers = await transporter.sendMail({
            from: "manish.naini@absyz.com",
            to: userDetails.email,
            subject: "Registrartion Successfully",
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Successful</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Our E-Cart Website!</h1>
                <p>Dear ${username},</p>
                <p>Congratulations! Your registration on our website was successful.</p>
                <p>Start exploring our products and find amazing deals.</p>
                <p>Happy shopping!</p>
                <a href="[YourWebsiteURL]" class="btn">Shop Now</a>
                <p>If you have any questions, feel free to contact our support team.</p>
                <p>Best regards,<br>The [YourCompany] Team</p>
            </div>
        </body>
        </html>
    `,
        });
    }
    catch (error) {
        console.log("Errore sending mails", error);
    }
};
exports.sendmail = sendmail;
//# sourceMappingURL=helperfunction.js.map