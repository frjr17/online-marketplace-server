import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkValidators = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  res.send({ errors: result.array() });
};
