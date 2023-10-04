import { NextFunction, Request, Response } from "express";

export interface ICreateJWTParams {}
export interface ICreateJWTResBody {}
export interface ICreateJWTReqBody {}
export interface ICreateJWTReqQuery {}

export const createJWT = async (
  req: Request<
    ICreateJWTParams,
    ICreateJWTResBody,
    ICreateJWTReqBody,
    ICreateJWTReqQuery
  >,
  res: Response<ICreateJWTResBody>,
  next: NextFunction
) => {
  try {
    // code
  } catch (error) {
    console.error("createJWT error\n", error);
    next({ error, message: "Error creating JWT" });
  }
};
