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

    // In that case, I prefer to set the validators personally...

    if (!registerToken) {
      return res.status(400).send({ error: "Token does not exist" });
    }

    if (registerToken?.isUsed) {
      return res.status(400).send({ error: "This token was already used" });
    }

    registerToken.isUsed = true;
    await registerToken.save();

    const user = await User.findOne({ registerToken: token });

    if (!user) {
      return res.status(400).send({ error: "User doesn't exist" });
    }

    user.isVerfied = true;
    await user.save();

    req.state.data = {
      user: user.toClient(),
    };
    req.state.message = "User verified successfully";
    return next();
  } catch (error) {
    console.error("validateToken error\n", error);
    next({ error, message: "Error validating token" });
  }
};
