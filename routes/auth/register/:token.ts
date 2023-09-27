import { Request, Response } from "express";
import RegisterToken from "../../../models/registerToken";

interface IPostRequestParams {
  token: string;
}

export const post = async (req: Request<IPostRequestParams>, res: Response) => {
  try {
    const { token } = req.params;
    const registerToken = await RegisterToken.findById(token);

    if (!registerToken) {
      return res.status(400).send({ error: "Token does not exist" });
    }

    if (registerToken?.isUsed) {
      return res.status(400).send({ error: "This token is used" });
    }
  } catch (error) {
    console.error("Register Post error\n", error);
    res.send({ error: "There's some error" });
  }
};
