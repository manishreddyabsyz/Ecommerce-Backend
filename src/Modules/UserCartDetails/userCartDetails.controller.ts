import { ResponseDto, Request } from "@dtos/reuseableDtos";
import { schemaValidation } from "@utils/helperfunction";
import Joi from "joi";
import * as productsServices from "./userCartDetails.services";
import {
  getResponseMessage,
  sendResponse,
  setErrorResponse,
} from "@services/responseServices";
import { CreationICartDTO } from "./userCartDetails.dtos";
import { Response } from "express";
export const postUserCartDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let response: ResponseDto;
    console.log(req.user);
    const cartDetails: CreationICartDTO = req.body;
    const schema = Joi.object().options({}).keys({
      user_id: Joi.number().required(),
      product_id: Joi.number().required(),
    });
    const validateResult: ResponseDto = await schemaValidation(
      cartDetails,
      schema
    );
    if (!validateResult) {
      response = sendResponse(validateResult);
      return res.json(response);
    } else {
      response = await productsServices.postUserCartDetails(cartDetails);
      response = sendResponse(response);
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

// export const getUserCartDetails= async(req:Request ,res:Response):Promise<any>=>{
//   try{
//     let response : ResponseDto;
//     const id = req.params;
//     response = await productsServices.getUserCartDetails(id);
//     response=sendResponse(response);
//     return res.json(response);


//   }catch(error){
//     console.log("Eroor getting usercart details",error);
//     let result: ResponseDto = setErrorResponse({
//       statusCode: 500,
//       message: getResponseMessage("SOMETHING_WRONG"),
//       error: error,
//       details: error,
//     });
//     result = sendResponse(result);
//     return res.json(result);

//   }

// }