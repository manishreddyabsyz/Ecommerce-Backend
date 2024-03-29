import { ResponseDto } from "@dtos/reuseableDtos";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  getResponseMessage,
  setErrorResponse,
  setSuccessResponse,
} from "@services/responseServices";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manish.naini@absyz.com",
    pass: "oulx aeas vznb vvcf",
  },
});

export const schemaValidation = async (
  data: any,
  schema: any
): Promise<ResponseDto> => {
  try {
    const options: any = {
      errors: {
        wrap: {
          label: "",
        },
      },
    };
    const { error } = await schema.validate(data, options);
    let response: ResponseDto;
    if (error && error.details) {
      response = setErrorResponse({
        statusCode: 422,
        message:
          error.details[0].message || getResponseMessage("VALIDATION_ERROR"),
      });
      return response;
    }
    response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("VALIDATION_SUCCESS"),
    });
    return response;
  } catch (error) {
    const response: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error: error,
      details: error,
    });
    return response;
  }
};

export const generateAccessToken = async (userDetails: any) => {
  const { firstname, lastname, email } = userDetails;
  const payload = {
    firstname,
    lastname,
    email,
  };
  const secretKey = process.env.ACCESS_SECRET_KEY;
  const accessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME;
  try {
    const accesstoken = jwt.sign(payload, secretKey, {
      expiresIn: accessTokenExpiryTime,
    });
    return accesstoken;
  } catch (error) {
    const result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error,
      details: error,
    });
    return result;
  }
};

export const genrateRefreshToken = async (userDetails: any) => {
  const { firstname, lastname, email } = userDetails;
  const payload = {
    firstname,
    lastname,
    email,
  };
  const secretKey = process.env.REFRESH_SECRET_KEY;
  const refreshTokenExpiryTime = process.env.REFRESH_TOKEN_EXPIRY_TIME;
  try {
    const refreshtoken = jwt.sign(payload, secretKey, {
      expiresIn: refreshTokenExpiryTime,
    });
    return refreshtoken;
  } catch (error) {
    const result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error,
      details: error,
    });
    return result;
  }
};

export const sendmail = async (userDetails: any, username: string) => {
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
  } catch (error) {
    console.log("Errore sending mails", error);
  }
};
