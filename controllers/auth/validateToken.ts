import { NextFunction, Request, Response } from "express";

export interface IValidateTokenParams {
  token: string;
}
export interface IValidateTokenResBody {}
export interface IValidateTokenReqBody {}
export interface IValidateTokenReqQuery {}

export const validateToken = async (
  req: Request<
    IValidateTokenParams,
    IValidateTokenResBody,
    IValidateTokenReqBody,
    IValidateTokenReqQuery
  >,
  res: Response<IValidateTokenResBody>,
  next: NextFunction
) => {
  try {
    req.state.message = "Register Token Validated Successfully!";
    return next();
  } catch (error) {
    console.error("validateToken error\n", error);
    next({ error, message: "Error validating register token." });
  }
};
