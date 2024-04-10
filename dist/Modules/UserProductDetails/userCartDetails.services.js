"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUserCartDetails = void 0;
const database_1 = require("@loaders/database");
const user_model_1 = require("../users/user.model");
const productsdetails_model_1 = require("../Products/productsdetails.model");
const responseServices_1 = require("@services/responseServices");
const postUserCartDetails = async (cartDetails) => {
    const transaction = await database_1.sequelize.transaction();
    try {
        let response;
        const { user_id, product_id, category_id } = cartDetails;
        const doesuserExist = await user_model_1.UsersModel.findOne({
            where: { id: user_id },
            transaction,
        });
        if (doesuserExist) {
            const getProductDetails = await productsdetails_model_1.ElectronicDetailsModel.findOne({
                where: { id: product_id },
                transaction,
            });
            if (!getProductDetails) {
                transaction.rollback();
                return (response = (0, responseServices_1.setErrorResponse)({
                    statusCode: 400,
                    message: (0, responseServices_1.getResponseMessage)("INVALID_PRODUCT_ID"),
                }));
            }
            await user_model_1.UsersModel.update({
                cart: getProductDetails,
            }, {
                where: { id: user_id },
                transaction,
            });
        }
        else {
            transaction.rollback();
            return (response = (0, responseServices_1.setErrorResponse)({
                statusCode: 400,
                message: (0, responseServices_1.getResponseMessage)("INVALID_USER"),
            }));
        }
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
exports.postUserCartDetails = postUserCartDetails;
//# sourceMappingURL=userCartDetails.services.js.map