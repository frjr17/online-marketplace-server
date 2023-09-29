import { Request, Response } from "express";
import User from "../../../models/user";
import Cart from "../../../models/cart";
import RegisterToken from "../../../models/registerToken";

interface IPostRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  isLinkedWithGoogle: boolean;
}

export const post = async (
  req: Request<any, any, IPostRequestBody>,
  res: Response
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
      // Verification comes with token...
      isVerified: false,
    });

    const cart = new Cart({
      user,
    });

    const token = new RegisterToken();

    // Email part... for the moment, i'll just send the email token in the response (not secure)

    await user.save();
    await cart.save();

    return res
      .status(200)
      .json({ message: "User created!", success: true, user, token });
  } catch (error) {
    console.error("Register Post error\n", error);
    res.send({ error: "There's some error" });
  }
};
