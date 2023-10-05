import { NextFunction, Request, Response } from "express";

export interface IRegisterParams {}
export interface IRegisterResBody {}
export interface IRegisterReqBody {}
export interface IRegisterReqQuery {}

export const register = async (
  req: Request<
    IRegisterParams,
    IRegisterResBody,
    IRegisterReqBody,
    IRegisterReqQuery
  >,
  res: Response<IRegisterResBody>,
  next: NextFunction
) => {
  try {
    // Extract body
    // Create new user
    // Create new Cart
    // Create verification body

    return next();
  } catch (error) {
    console.error("register error\n", error);
    next({ error, message: "Error registering Person" });
  }
};
