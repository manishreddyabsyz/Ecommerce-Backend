import { Request, ResponseDto } from "@dtos/reuseableDtos";
import { CreationIUsersDTO } from "../users/users.dtos";
import Joi from "joi";
import { Response } from "express";
import * as AuthServices from "./auth.services";
import { schemaValidation } from "@utils/helperfunction";
import {
  getResponseMessage,
  sendResponse,
  setErrorResponse,
} from "@services/responseServices";
export const userSignup = async (req: Request, res: Response): Promise<any> => {
  try {
    let response: ResponseDto;
    const userDetails: CreationIUsersDTO = req.body;
    const schema = Joi.object()
      .options({})
      .keys({
        firstname: Joi.string().required().label("First Name"),
        lastname: Joi.string().required().label("Last Name"),
        email: Joi.string()
          .email()
          .regex(/@gmail\.com$|/, { name: "email" })
          .required()
          .label("Email"),
        password: Joi.string()
          .min(8)
          .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).*$/)
          .message(
            `"{#label}" must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.`
          )
          .required()
          .label("Password"),
        gender: Joi.string().required().label("Gender"),
      });
    const validateResult: ResponseDto = await schemaValidation(
      userDetails,
      schema
    );
    if (!validateResult) {
      response = sendResponse(validateResult);
      return res.json(response);
    } else {
      response = await AuthServices.candidateSignup(userDetails);
      return res.json(response);
    }
  } catch (error) {
    let result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error: error,
      details: error,
    });
    result = sendResponse(result);
    return res.json(result);
  }
};

export const userSignin = async (req: Request, res: Response): Promise<any> => {
  let response: ResponseDto;
  const userlogindetails: CreationIUsersDTO = req.body;
  const schema = Joi.object()
    .options({})
    .keys({
      email: Joi.string().required().label("Email"),
      password: Joi.string().required().label("Password"),
    });
  const validateResult: ResponseDto = await schemaValidation(
    userlogindetails,
    schema
  );
  if (!validateResult) {
    response = sendResponse(validateResult);
    return res.json(response);
  } else {
    response = await AuthServices.candidateSignin(userlogindetails);
    response = sendResponse(response);
    return res.json(response);
  }
};

export const getToken = async (req: Request, res: Response): Promise<any> => {
  try {
    let response: ResponseDto;
    const userDetails = req.body;
    const schema = Joi.object().options({}).keys({
      refreshtoken: Joi.string().required(),
      id: Joi.number().required()
    });
    const validateResult: ResponseDto = await schemaValidation(userDetails, schema);
    if (validateResult.status) {
      response = await AuthServices.getToken(userDetails);
      response = sendResponse(response);
      return res.json(response);
    } else {
      response = sendResponse(validateResult);
      return res.json(response);
    }
  }
  catch (error) {
    let result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error: error,
      details: error,
    });
    result = sendResponse(result);
    return res.json(result);
  }
};