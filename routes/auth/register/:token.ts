import { NextFunction, Request, Response } from "express";
import RegisterToken from "../../../models/registerToken";
import User from "../../../models/user";

interface IPostRequestParams {
  token: string;
}

export const post = async (
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
      return res.status(400).send({ error: "This token is used" });
    }

    const user = await User.findOne({ registerToken: token });

    if (!user) {
      return res.status(400).send({ error: "User doesn't exist" });
    }

    user.isVerfied = true;
    await user.save();

    // new JWT

    req.state.data = {
      user: {},
    };
    req.state.message = "User verified successfully";
    return next();
  } catch (error) {
    console.error("Register Post error\n", error);
    res.send({ error: "There's some error" });
  }
};
