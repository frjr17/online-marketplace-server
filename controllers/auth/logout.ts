import { NextFunction, Request, Response } from "express";
import LoginToken from "../../models/loginToken";
import jwt, { JwtPayload } from "jsonwebtoken";
export interface ILogoutParams {}
export interface ILogoutResBody {}
export interface ILogoutReqBody {}
export interface ILogoutReqQuery {
  jwtToken: string;
}

export const logout = async (
  req: Request<ILogoutParams, ILogoutResBody, ILogoutReqBody, ILogoutReqQuery>,
  res: Response<ILogoutResBody>,
  next: NextFunction
) => {
  try {
    const { jwtToken } = req.query;
    const { token } = (await jwt.verify(
      jwtToken,
      process.env.JWT_SECRET
    )) as JwtPayload;

    await LoginToken.findOneAndRemove({ user: token });

    req.state.message = "User logged out successfully!";
    req.state.httpStatus = 200;
    return next();
  } catch (error) {
    console.error("logout error\n", error);
    next({ error, message: "Error logging user out" });
  }
};
