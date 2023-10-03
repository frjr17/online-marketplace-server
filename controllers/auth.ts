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

    user.registerToken = token;
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

interface IPostRequestParams {
  token: string;
}

export const validateToken = async (
  req: Request<IPostRequestParams>,
  res: Response,
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
    console.error("Register Post error\n", error);
    res.send({ error: "There's some error" });
  }
};
