import { ResponseDto, FunctionalResponseDto } from "@dtos/reuseableDtos";

export const setSuccessResponse = function (response: ResponseDto) {
  if (!response) {
    return response;
  }

  const successResponse: ResponseDto = {
    status: true,
    statusCode: response.statusCode || 200,
  };

  if (response.message) {
    successResponse["message"] = response.message;
  }
  if (response.data) {
    successResponse["data"] = response.data;
  }

  return successResponse;
};

export const setErrorResponse = function (response: ResponseDto) {
  if (!response) {
    return response;
  }

  const errorResponse: ResponseDto = {
    status: false,
    statusCode: response.statusCode,
    message: response.message || getResponseMessage("SOMETHING_WRONG"),
  };

  if (response.data) {
    errorResponse["data"] = response.data;
  }

  if (response.error) {
    errorResponse["error"] = response.error.message || response.error;
  }

  return errorResponse;
};

export const sendResponse = (responseData: ResponseDto) => {
  let response: FunctionalResponseDto;
  if (responseData.status) {
    response = {
      api_status: responseData.statusCode,
      message: responseData.message,
    };
    if (responseData.data) {
      response = {
        api_status: responseData.statusCode || 200,
        message: responseData.message,
        data: responseData.data,
      };
    }
  } else {
    response = {
      api_status: responseData.statusCode || 500,
      error: responseData.error,
      message: responseData.message,
    };
    if (responseData.data) {
      response.data = responseData.data;
    }
    if (responseData.details) {
      response.detail = responseData.details;
    }
  }
  return response;
};

export const getResponseMessage = (message: string) => {
  const messageConstant: any = {
    SOMETHING_WRONG: "Something went wrong, Please try again",
    VALIDATION_ERROR:
      "Validation error occurred, some required data is missing",
    VALIDATION_SUCCESS: "Validated successfully",
    EMAIL_ALREADY_EXIST: "Email ID Already Exist",
    REGISTRATION_SUCCESS: "User Registration Success",
    REGISTRATION_FAILED: "User Registration Failed",
    USER_NOT_REGISTERED: "User Not Registered",
    INVALID_EMAIL_OR_PASSWORD: "Please Provide Email and Password",
    INVALID_PASSWORD: "Invalid Password",
    LOGIN_SUCCESS: "Login Success",
    ROLE_BITS_FOUND: "Role Bits Found",
    ROlE_TYPE_REQUIRED: "Please Send Role Type",
    USERS_FOUND: "Users found in database",
    USERS_NOT_FOUND: "Users not found",
    REQUIRED_TOKEN: "Required Token",
    REQUIRED_VALID_TOKEN: "Required valid token",
    TEMPLATES_NOT_FOUND: "Templates not found",
    TEMPLATES_FOUND: "Templates found successfully",
    TEMPLATE_CREATION_SUCCESS: "Template created successfully",
    TEMPLATE_CREATION_FAILED: "Failed to Create Template",
    EMAIL_SENT_SUCCESSFULLY: "Sent Email to the Users",
    SENDING_EMAIL_FAILED: "Failed to Send the Email to Users",
    EMAIL_USERS_NOT_FOUND: "Some of the users not found in Database",
    PROVIDED_TEMPLATE_NOT_FOUND: "The Template Requested not Present",
    SMS_SENT_SUCCESSFULLY: "Sms send successfully",
    SMS_NOT_SENT: "Sms Not Sent",
    NOTIFICATION_NOT_SENT: "Notification Not Send",
    NOTIFICATION_SENT: "Notification sent",
    USER_NOT_PRESENT: "User Not Present",
    INVAILD_REFRESH_TOKEN: "Required valid refresh token",
    TOKEN_CREATION_SUCCESS: "Token creation successfully",
    TOKEN_UPDATION_FAILED: "Token updation failed",
    NO_ELECTRONICS_FOUND: "No Electronics Found",
    ELECTRONICS_FOUND: "Electronics Found",
    INVALID_USER: "Invalid User",
    INVALID_PRODUCT_ID: "Invalid Product id",
    FAILED_TO_ADD: "Failed to Add",
    ADDED_SUCCESSFULLY: "Added Sucessfully",
  };

  return messageConstant[message] || null;
};
