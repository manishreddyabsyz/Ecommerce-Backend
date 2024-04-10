"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlideElectronics = exports.getAllElectronics = void 0;
const database_1 = require("@loaders/database");
const electronicsdetails_model_1 = require("./electronicsdetails.model");
const electronics_model_1 = require("./electronics.model");
const responseServices_1 = require("@services/responseServices");
const getAllElectronics = async (electronics_id) => {
    const transaction = await database_1.sequelize.transaction();
    try {
        let response;
        const { id } = electronics_id;
        const allElectronics = await electronicsdetails_model_1.ElectronicDetailsModel.findAll({
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
exports.getAllElectronics = getAllElectronics;
const getSlideElectronics = async () => {
    const transaction = await database_1.sequelize.transaction();
    try {
        let response;
        const allElectronics = await electronics_model_1.ElectronicModel.findAll({
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
exports.getSlideElectronics = getSlideElectronics;
//# sourceMappingURL=electronics.services.js.map