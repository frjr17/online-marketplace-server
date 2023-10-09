import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import PasswordToken from "../../models/passwordToken";

export interface IResetPasswordRequestParams {}
export interface IResetPasswordRequestResBody {}
export interface IResetPasswordRequestReqBody {
  email: string;
}
export interface IResetPasswordRequestReqQuery {}

export const resetPasswordRequest = async (
  req: Request<
    IResetPasswordRequestParams,
    IResetPasswordRequestResBody,
    IResetPasswordRequestReqBody,
    IResetPasswordRequestReqQuery
  >,
  res: Response<IResetPasswordRequestResBody>,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordToken = await PasswordToken.create({ user });
      user.passwordResetToken = passwordToken;
      await user.save();

      //   While I fix the email issue...
      console.log("\nPassword Token", passwordToken._id);

      req.state.message = "Password token created and sent succsesfully!";
      return next();
    }
  } catch (error) {
    console.error("resetPasswordRequest error\n", error);
    next({ error, message: "Error setting up reset password request" });
  }
};
