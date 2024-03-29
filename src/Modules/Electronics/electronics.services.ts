import { ResponseDto } from "@dtos/reuseableDtos";
import { sequelize } from "@loaders/database";
import { UsersModel } from "../users/user.model";
import { ElectronicDetailsModel } from "./electronicsdetails.model";
import { ElectronicModel } from "./electronics.model";
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
export const getAllElectronics = async (
    electronics_id: any
): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    try {
        let response: ResponseDto;
        const { id } = electronics_id;
        const allElectronics = await ElectronicDetailsModel.findAll({
            where: {
                category_id: id
            },
            transaction,
        });
        if (!allElectronics) {
            transaction.rollback();
            return (response = setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_ELECTRONICS_FOUND"),
            }));
        }
        transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("REGISTRATION_SUCCESS"),
            data: allElectronics,
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

export const getSlideElectronics = async (
): Promise<ResponseDto> => {
    const transaction = await sequelize.transaction();
    try {
        let response: ResponseDto;

        const allElectronics = await ElectronicModel.findAll({
            transaction,
        });
        if (!allElectronics) {
            transaction.rollback();
            return (response = setErrorResponse({
                statusCode: 400,
                message: getResponseMessage("NO_ELECTRONICS_FOUND"),
            }));
        }
        transaction.commit();
        return setSuccessResponse({
            statusCode: 200,
            message: getResponseMessage("ELECTRONICS_FOUND"),
            data: allElectronics,
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