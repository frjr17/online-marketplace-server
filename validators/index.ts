import { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";

export const sendValidatorErrors = (errors: FieldValidationError[]) => {
  const errorObj: {
    [name: string]: string[];
  } = {};

  errors.forEach((error) => {
    if (errorObj[error.path]) {
      errorObj[error.path].push(error.msg);
    } else {
      errorObj[error.path] = [error.msg];
    }
  });

  return errorObj;
};

export const checkValidators = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.send({
    errors: sendValidatorErrors(result.array() as FieldValidationError[]),
  });
};
