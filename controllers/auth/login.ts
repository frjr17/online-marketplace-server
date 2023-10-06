import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import LoginToken from "../../models/loginToken";
import jwt from "jsonwebtoken";
export interface ILoginParams {}
export interface ILoginResBody {}
export interface ILoginReqBody {
  email: string;
  password: string;
  isLinkedWithGoogle?: boolean;
}
export interface ILoginReqQuery {}

export const login = async (
  req: Request<ILoginParams, ILoginResBody, ILoginReqBody, ILoginReqQuery>,
  res: Response<ILoginResBody>,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const loginToken = await LoginToken.create({ user });
    const token = await jwt.sign({ token: loginToken }, process.env.JWT_SECRET);

    loginToken.lastJwt = token;
    await loginToken.save();

    req.state.data = { token };
    req.state.message = "User logged in successfully!";
    return next();
  } catch (error) {
    console.error("login error\n", error);
    next({ error, message: "Error login user" });
  }
};
