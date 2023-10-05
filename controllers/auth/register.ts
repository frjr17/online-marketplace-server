import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import { hash } from "bcrypt";
import Cart from "../../models/cart";
import RegisterToken from "../../models/registerToken";

export interface IRegisterParams {}
export interface IRegisterResBody {}
export interface IRegisterReqBody {
  firstName: string;
  lastName: string;
  isSubscribed: boolean;
  isLinkedWithGoogle: boolean;
  email: string;
  password: string;
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
    let hashedPassword;
    if (!req.body.isLinkedWithGoogle) {
      hashedPassword = await hash(req.body.password, 12);
    }

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      isSubscribed: req.body.isSubscribed,
      isLinkedWithGoogle: req.body.isLinkedWithGoogle,
      isVerified: false,
    });

    const cart = await Cart.create({ user });
    user.cart = cart;

    const registerToken = await RegisterToken.create({});
    user.registerToken = registerToken;

    await user.save();
    req.state.httpStatus = 200;
    req.state.message = "User registered successfully";
    req.state.data = {
      user: user.toClient(),
    };

    return next();
  } catch (error) {
    console.error("register error\n", error);
    next({ error, message: "Error registering Person" });
  }
};
