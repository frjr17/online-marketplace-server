import { NextFunction, Request, Response } from "express";

export interface IRegisterParams {}
export interface IRegisterResBody {}
export interface IRegisterReqBody {
  firstName: string;
  lastName: string;
  isSubscribed: boolean;
  isLinkedWithGoogle: boolean;
  email: string;
  password: boolean;
}
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
    console.log(req.body);
    // Create new user
    // Create new Cart
    // Create verification body

    return next();
  } catch (error) {
    console.error("register error\n", error);
    next({ error, message: "Error registering Person" });
  }
};
