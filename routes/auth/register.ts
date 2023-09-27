import { Request, Response } from "express";
import User from "../../models/user";
import Cart from "../../models/cart";

export const post = async (req: Request, res: Response) => {
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
    });

    const cart = new Cart({
      user,
    });

    const token = RegisterToken;

    await user.save();
    await cart.save();

    return res
      .status(200)
      .json({ message: "User created!", success: true, user });
  } catch (error) {
    console.error("Register Post error\n", error);
    res.send({ error: "There's some error" });
  }
};
