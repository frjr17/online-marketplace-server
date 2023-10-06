import { NextFunction, Request, Response } from "express";
import RegisterToken from "../../models/registerToken";
import User from "../../models/user";

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
    console.error("validateToken error\n", error);
    next({ error, message: "Error validating register token." });
  }
};
