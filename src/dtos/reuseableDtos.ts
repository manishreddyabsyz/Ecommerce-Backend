import { Request as ExpressRequest } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserJwtDetailsDTO } from "../Modules/users/users.dtos";
export interface ResponseDto {
  status?: boolean;
  data?: any;
  message?: string;
  error?: any;
  details?: string;
  statusCode?: number;
  errorMessage?: any;
  errorDetails?: any;
}

export interface Request extends ExpressRequest {
  user?: string | JwtPayload | UserJwtDetailsDTO;
}
export { ExpressRequest };
export interface FunctionalResponseDto {
  api_status?: number;
  message?: string;
  data?: any;
  error?: [
    {
      error_code?: number;
      error_msg?: string;
    }
  ];
  detail?: any;
  errorMessage?: any;
}
