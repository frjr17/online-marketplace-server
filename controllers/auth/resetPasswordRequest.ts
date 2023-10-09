import { NextFunction, Request, Response } from "express";
import User from "../../models/user";

export interface IResetPasswordRequestParams {}
export interface IResetPasswordRequestResBody {}
export interface IResetPasswordRequestReqBody {
  email: string;
}
export interface IResetPasswordRequestReqQuery {}

export const resetPasswordRequest = async (
  req: Request<
    IResetPasswordRequestParams,
    IResetPasswordRequestResBody,
    IResetPasswordRequestReqBody,
    IResetPasswordRequestReqQuery
  >,
  res: Response<IResetPasswordRequestResBody>,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      // create password
    }
  } catch (error) {
    console.error("resetPasswordRequest error\n", error);
    next({ error, message: "Error setting up reset password request" });
  }
};
