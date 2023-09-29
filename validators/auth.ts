import { body } from "express-validator";

export const registerValidator = () => {
  const name = body("firstName")
    .notEmpty()
    .withMessage("First name can't be empty")
    .trim();

  const lastName = body("lastName")
    .notEmpty()
    .withMessage("Last Name can't be empty")
    .trim();

  const email = body("email")
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("This isn't a valid email address")
    .trim()
    .normalizeEmail();

  const password = body("password")
    .if((_, { req }) => !req.body.isLinkedWithGoogle)
    .notEmpty()
    .withMessage("You must set a password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Your password must have one uppercase letter, one lowercase letter, a number and a symbol"
    );

  return [name, lastName, email, password];
};
