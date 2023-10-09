import { NextFunction, Request, Response } from "express";
import RegisterToken from "../../models/registerToken";
import User from "../../models/user";

export interface IValidateRegisterTokenParams {
  token: string;
}
export interface IValidateRegisterTokenResBody {}
export interface IValidateRegisterTokenReqBody {}
export interface IValidateRegisterTokenReqQuery {}

export const validateRegisterToken = async (
  req: Request<
    IValidateRegisterTokenParams,
    IValidateRegisterTokenResBody,
    IValidateRegisterTokenReqBody,
    IValidateRegisterTokenReqQuery
  >,
  res: Response<IValidateRegisterTokenResBody>,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    const registerToken = await RegisterToken.findById(token);

    if (registerToken) {
      registerToken.isUsed = true;
      await registerToken.save();
    }

    const user = await User.findOne({ registerToken: registerToken?._id });
    if (user) {
      user.isVerfied = true;
      await user.save();
    }

    req.state.user = user?.toClient();
    req.state.message = "Register Token Validated Successfully!";
    return next();
  } catch (error) {
    console.error("validateRegisterToken error\n", error);
    next({ error, message: "Error validating register token." });
  }
};
