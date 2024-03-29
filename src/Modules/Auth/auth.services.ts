import { ResponseDto } from "@dtos/reuseableDtos";
import { sequelize } from "@loaders/database";
import { UsersModel } from "../users/user.model";
import {
  getResponseMessage,
  setErrorResponse,
  setSuccessResponse,
} from "@services/responseServices";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  genrateRefreshToken,
  sendmail,
} from "@utils/helperfunction";
import { CreationIUsersDTO, UserJwtDetailsDTO } from "../users/users.dtos";
import { response } from "express";
export const candidateSignup = async (
  userDetails: CreationIUsersDTO
): Promise<ResponseDto> => {
  const transaction = await sequelize.transaction();
  try {
    let response: ResponseDto;
    const { firstname, lastname, email, password, gender } = userDetails;
    console.log(email);
    const isUserExist = await UsersModel.findOne({
      where: { email },
      transaction,
    });
    console.log(isUserExist, "isuserexist");
    if (isUserExist) {
      transaction.rollback();
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("EMAIL_ALREADY_EXIST"),
      }));
    }

    const saltrounds: string = await bcrypt.genSalt(10);
    const hashpassword: string = await bcrypt.hash(password, saltrounds);
    const accesstoken: any = await generateAccessToken(userDetails);
    const refreshtoken: any = await genrateRefreshToken(userDetails);

    const username = `${firstname} ${lastname}`;

    const userInfo = await UsersModel.create(
      {
        firstname,
        lastname,
        email,
        password: hashpassword,
        gender,
        accesstoken,
        refreshtoken,
      },
      { transaction }
    );

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
      return (response = setErrorResponse({
        statusCode: 500,
        message: getResponseMessage("REGISTRATION_FAILED"),
      }));
    }
    transaction.commit();
    await sendmail(userDetails, username);
    return setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("REGISTRATION_SUCCESS"),
    });
  } catch (error) {
    transaction.rollback();
    const result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error,
      details: error,
    });
    return result;
  }
};

export const candidateSignin = async (
  userlogindetails: CreationIUsersDTO
): Promise<ResponseDto> => {
  let response: ResponseDto;
  const transaction = await sequelize.transaction();
  try {
    const { email, password } = userlogindetails;

    const isUserFound: any = await UsersModel.findOne({
      where: { email },
    });
    if (isUserFound.length === 0) {
      return setErrorResponse({
        statusCode: 500,
        message: getResponseMessage("USER_NOT_REGISTERED"),
      });
    }
    const passwordmatched: boolean = await bcrypt.compare(
      password,
      isUserFound.password
    );
    if (!passwordmatched) {
      return setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("INVALID_PASSWORD"),
      });
    }

    const userDetails: UserJwtDetailsDTO = {
      id: isUserFound.id,
      firstname: isUserFound.firstname,
      lastname: isUserFound.lastname,
      email: isUserFound.email,
      gender: isUserFound.gender,
    };

    const access_token: any = await generateAccessToken(userDetails);
    const refresh_token: any = await genrateRefreshToken(userDetails);

    await UsersModel.update(
      {
        refreshtoken: refresh_token,
        accesstoken: access_token,
      },
      {
        where: { email },
        transaction,
      }
    );

    const data = {
      ...userDetails,
      accessToken: access_token,
      refreshToken: refresh_token,
    };
    transaction.commit();
    response = setSuccessResponse({
      statusCode: 200,
      message: getResponseMessage("LOGIN_SUCCESS"),
      data,
    });
    return response;
  } catch (error) {
    console.log("error validating userlogin details", error);
    transaction.rollback();
    const result: ResponseDto = setErrorResponse({
      statusCode: 500,
      message: getResponseMessage("SOMETHING_WRONG"),
      error,
      details: error,
    });
    return result;
  }
};
