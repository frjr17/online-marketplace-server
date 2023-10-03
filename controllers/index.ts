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
};
