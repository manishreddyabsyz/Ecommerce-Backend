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
exports.postUserCartDetails = void 0;
const helperfunction_1 = require("@utils/helperfunction");
const joi_1 = __importDefault(require("joi"));
const productsServices = __importStar(require("./userCartDetails.services"));
const responseServices_1 = require("@services/responseServices");
const postUserCartDetails = async (req, res) => {
    try {
        let response;
        console.log(req.user);
        const cartDetails = req.body;
        const schema = joi_1.default.object().options({}).keys({
            user_id: joi_1.default.number().required(),
            product_id: joi_1.default.number().required(),
        });
        const validateResult = await (0, helperfunction_1.schemaValidation)(cartDetails, schema);
        if (!validateResult) {
            response = (0, responseServices_1.sendResponse)(validateResult);
            return res.json(response);
        }
        else {
            response = await productsServices.postUserCartDetails(cartDetails);
            response = (0, responseServices_1.sendResponse)(response);
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
exports.postUserCartDetails = postUserCartDetails;
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
//# sourceMappingURL=userCartDetails.controller.js.map