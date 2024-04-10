"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlideProducts = exports.getAllProducts = void 0;
const database_1 = require("@loaders/database");
const productsdetails_model_1 = require("./productsdetails.model");
const products_model_1 = require("./products.model");
const responseServices_1 = require("@services/responseServices");
const getAllProducts = async (electronics_id) => {
    const transaction = await database_1.sequelize.transaction();
    try {
        let response;
        const { id } = electronics_id;
        console.log(id, "id");
        const allElectronics = await productsdetails_model_1.ProductDetailsModel.findAll({
            where: {
                category_id: id,
            },
            transaction,
        });
        if (!allElectronics) {
            transaction.rollback();
            return (response = (0, responseServices_1.setErrorResponse)({
                statusCode: 400,
                message: (0, responseServices_1.getResponseMessage)("NO_ELECTRONICS_FOUND"),
            }));
        }
        transaction.commit();
        return (0, responseServices_1.setSuccessResponse)({
            statusCode: 200,
            message: (0, responseServices_1.getResponseMessage)("REGISTRATION_SUCCESS"),
            data: allElectronics,
        });
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
exports.getAllProducts = getAllProducts;
const getSlideProducts = async () => {
    const transaction = await database_1.sequelize.transaction();
    try {
        let response;
        const allElectronics = await products_model_1.ElectronicModel.findAll({
            transaction,
        });
        console.log(allElectronics, "electronics");
        if (!allElectronics) {
            transaction.rollback();
            return (response = (0, responseServices_1.setErrorResponse)({
                statusCode: 400,
                message: (0, responseServices_1.getResponseMessage)("NO_ELECTRONICS_FOUND"),
            }));
        }
        transaction.commit();
        return (0, responseServices_1.setSuccessResponse)({
            statusCode: 200,
            message: (0, responseServices_1.getResponseMessage)("ELECTRONICS_FOUND"),
            data: allElectronics,
        });
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
exports.getSlideProducts = getSlideProducts;
//# sourceMappingURL=products.services.js.map