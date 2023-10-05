import { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";

export const sendValidatorErrors = (errors: FieldValidationError[]) => {
  const errorObj: {
    [name: string]: { message: string; name: string; value: string };
  } = {};

  errors.forEach((error) => {
    errorObj[error.path] = {
      message: error.msg,
      name: error.path,
      value: error.value,
    };
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
