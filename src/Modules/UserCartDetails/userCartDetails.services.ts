import { sequelize } from "@loaders/database";
import { CreationICartDTO } from "./userCartDetails.dtos";
import { ResponseDto } from "@dtos/reuseableDtos";
import { UsersModel } from "../users/user.model";
import { ProductDetailsModel } from "../Products/productsdetails.model";
import {
  getResponseMessage,
  setErrorResponse,
  setSuccessResponse,
} from "@services/responseServices";
import { CartItemsModel } from "./userCart.model";

export const postUserCartDetails = async (
  cartDetails: CreationICartDTO
): Promise<ResponseDto> => {
  const transaction = await sequelize.transaction();
  try {
    let response: ResponseDto;
    const { user_id, product_id, quantity, unit_price } = cartDetails;
    const doesuserExist = await UsersModel.findOne({
      where: { id: user_id },
    });
    if (doesuserExist) {
      const getProductDetails: any = await ProductDetailsModel.findOne({
        where: { id: product_id },
      });

      if (!getProductDetails) {
        transaction.rollback();
        return (response = setErrorResponse({
          statusCode: 400,
          message: getResponseMessage("INVALID_PRODUCT_ID"),
        }));
      }
      const checkDuplicateProducts: any = await CartItemsModel.findOne({
        where: { product_id },
      });
      if (checkDuplicateProducts) {
        const newQuantity = checkDuplicateProducts.quantity + 1;
        const newPrice = checkDuplicateProducts.unit_price * newQuantity;
        await CartItemsModel.update(
          {
            quantity: newQuantity,
            total_price: newPrice,
          },
          {
            where: { product_id },
            transaction,
          }
        );
        transaction.commit();
        return setSuccessResponse({
          statusCode: 200,
          message: getResponseMessage("ADDED_SUCCESSFULLY"),
        });
      }
      const cartItems: any = await CartItemsModel.create(
        {
          product_id,
          user_id,
          quantity,
          unit_price,
          total_price: unit_price,
        },
        {
          transaction,
        }
      );
      if (!cartItems) {
        transaction.rollback();
        return (response = setErrorResponse({
          statusCode: 400,
          message: getResponseMessage("FAILED_TO_ADD"),
        }));
      }
      transaction.commit();
      return setSuccessResponse({
        statusCode: 200,
        message: getResponseMessage("ADDED_SUCCESSFULLY"),
        data: cartItems,
      });
    } else {
      transaction.rollback();
      return (response = setErrorResponse({
        statusCode: 400,
        message: getResponseMessage("INVALID_USER"),
      }));
    }
  } catch (error) {
    console.log(error, "err");
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

// export  const getUserCartDetails=()=>{

// }