import { NextFunction, Request, Response } from "express";
import PasswordToken from "../../models/passwordToken";
import User, { IUser } from "../../models/user";
import { hash } from "bcrypt";

export interface IResetPasswordParams {}
export interface IResetPasswordResBody {}
export interface IResetPasswordReqBody {
  token: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface IResetPasswordReqQuery {}

export const resetPassword = async (
  req: Request<
    IResetPasswordParams,
    IResetPasswordResBody,
    IResetPasswordReqBody,
    IResetPasswordReqQuery
  >,
  res: Response<IResetPasswordResBody>,
  next: NextFunction
) => {
  try {
    const { token, newPassword } = req.body;
    const passwordToken = await PasswordToken.findById(token);

    if (passwordToken) {
      const user = (await User.findById(passwordToken.user)) as IUser;
      user.password = await hash(newPassword, 12);
      user.save();

      passwordToken.isUsed = true;
      passwordToken.save();

      req.state.message = "Password changed successfully!";
      return next();
    }
  } catch (error) {
    console.error("resetPassword error\n", error);
    next({ error, message: "Error reseting password" });
  }
};
