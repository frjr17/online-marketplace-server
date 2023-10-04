import { NextFunction, Request, Response } from "express";
import Cart from "../../models/cart";
import RegisterToken from "../../models/registerToken";
import User from "../../models/user";

export interface IRegisterParams {}
export interface IRegisterResBody {}
export interface IRegisterReqBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  isLinkedWithGoogle: boolean;
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
    const {
      firstName,
      lastName,
      email,
      password,
      isSubscribed,
      isLinkedWithGoogle,
    } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      isSubscribed,
      isLinkedWithGoogle,
      isVerified: false,
    });

    const cart = new Cart({ user });
    await cart.save();

    const token = new RegisterToken();
    await token.save();

    // Email part... for the moment, i'll just send the email token in the response (not secure)

    user.registerToken = token;
    await user.save();

    req.state.user = user.toClient();
    req.state.data = {
      token: token._id.toString(),
    };
    req.state.httpStatus = 200;
    req.state.message = "User created successfully!";

    return next();
  } catch (error) {
    console.error("register error\n", error);
    next({ error, message: "Error registering user." });
  }
};
