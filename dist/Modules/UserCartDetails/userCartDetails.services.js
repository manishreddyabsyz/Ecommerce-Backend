"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUserCartDetails = void 0;
const database_1 = require("@loaders/database");
const user_model_1 = require("../users/user.model");
const productsdetails_model_1 = require("../Products/productsdetails.model");
const responseServices_1 = require("@services/responseServices");
const userCart_model_1 = require("./userCart.model");
const postUserCartDetails = async (cartDetails) => {
    const transaction = await database_1.sequelize.transaction();
    try {
        let response;
        const { user_id, product_id, quantity, unit_price } = cartDetails;
        const doesuserExist = await user_model_1.UsersModel.findOne({
            where: { id: user_id },
        });
        if (doesuserExist) {
            const getProductDetails = await productsdetails_model_1.ProductDetailsModel.findOne({
                where: { id: product_id },
            });
            if (!getProductDetails) {
                transaction.rollback();
                return (response = (0, responseServices_1.setErrorResponse)({
                    statusCode: 400,
                    message: (0, responseServices_1.getResponseMessage)("INVALID_PRODUCT_ID"),
                }));
            }
            const checkDuplicateProducts = await userCart_model_1.CartItemsModel.findOne({
                where: { product_id },
            });
            if (checkDuplicateProducts) {
                const newQuantity = checkDuplicateProducts.quantity + 1;
                const newPrice = checkDuplicateProducts.unit_price * newQuantity;
                await userCart_model_1.CartItemsModel.update({
                    quantity: newQuantity,
                    total_price: newPrice,
                }, {
                    where: { product_id },
                    transaction,
                });
                transaction.commit();
                return (0, responseServices_1.setSuccessResponse)({
                    statusCode: 200,
                    message: (0, responseServices_1.getResponseMessage)("ADDED_SUCCESSFULLY"),
                });
            }
            const cartItems = await userCart_model_1.CartItemsModel.create({
                product_id,
                user_id,
                quantity,
                unit_price,
                total_price: unit_price,
            }, {
                transaction,
            });
            if (!cartItems) {
                transaction.rollback();
                return (response = (0, responseServices_1.setErrorResponse)({
                    statusCode: 400,
                    message: (0, responseServices_1.getResponseMessage)("FAILED_TO_ADD"),
                }));
            }
            transaction.commit();
            return (0, responseServices_1.setSuccessResponse)({
                statusCode: 200,
                message: (0, responseServices_1.getResponseMessage)("ADDED_SUCCESSFULLY"),
                data: cartItems,
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
        console.log(error, "err");
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
// export  const getUserCartDetails=()=>{
// }
//# sourceMappingURL=userCartDetails.services.js.map