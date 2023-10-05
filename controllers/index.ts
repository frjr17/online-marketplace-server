import { NextFunction, Request, Response } from "express";

export interface IRequestWithState {
  state: any;
}

export const initializeState = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.state = {};

  return next();
};

export const sendState = (req: Request, res: Response) => {
  const { data, httpStatus, message } = req.state;
  console.log(message, data);
  return res
    .status(httpStatus || 200)
    .send({ message, success: true, ...data });
};
