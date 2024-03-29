import { Request, ResponseDto, SearchBarDto } from "@dtos/reuseableDtos";
import { CreationIUsersDTO } from "../users/users.dtos";
import Joi from "joi";
import { Response } from "express";
import { schemaValidation } from "@utils/helperfunction";
import * as ElectronicsServices from "./electronics.services";
import {
    getResponseMessage,
    sendResponse,
    setErrorResponse,
} from "@services/responseServices";



export const getAllElectronics = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        const id: any = req.body;
        response = await ElectronicsServices.getAllElectronics(id);
        response = sendResponse(response);
        return res.json(response);
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


export const getSlideElectronics = async (req: Request, res: Response): Promise<any> => {
    try {
        let response: ResponseDto;
        response = await ElectronicsServices.getSlideElectronics();
        response = sendResponse(response);
        return res.json(response);
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