import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import Cart from "../models/cart";
import RegisterToken from "../models/registerToken";

interface IPostRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  isLinkedWithGoogle: boolean;
}

export const register = async (
  req: Request<any, any, IPostRequestBody>,
  res: Response,
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

    const cart = new Cart({
      user,
    });

    const token = new RegisterToken();
    await token.save();

    // Email part... for the moment, i'll just send the email token in the response (not secure)

    await user.save();
    await cart.save();

    req.state.data = {
      message: "User created!",
      success: true,
      user,
      token: token._id.toString(),
    };
    req.state.httpStatus = 200;
    req.state.message = "User created successfully!";

    return next();
  } catch (error) {
    console.error("Register Post error\n", error);
    res.send({ error: "There's some error" });
  }
};
