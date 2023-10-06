import { body, param } from "express-validator";
import User from "../models/user";
import RegisterToken from "../models/registerToken";

const email = body("email")
  .notEmpty()
  .withMessage("Email can't be empty")
  .isEmail()
  .withMessage("This isn't a valid email address")
  .custom(async (value) => {
    const emailIsTaken = await User.findOne({ email: value });
    if (emailIsTaken) {
      return Promise.reject("This email address is already taken");
    }

    return true;
  })
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

const isLinkedWithGoogle = body("isLinkedWithGoogle")
  .notEmpty()
  .withMessage("You must set if the user is linked with google or not.")
  .isBoolean()
  .withMessage("Linked with google value must be boolean");

export const registerValidator = () => {
  const name = body("firstName")
    .notEmpty()
    .withMessage("First name can't be empty")
    .trim();

  const lastName = body("lastName")
    .notEmpty()
    .withMessage("Last Name can't be empty")
    .trim();

  const isSubscribed = body("isSubscribed")
    .notEmpty()
    .withMessage("You must set if the user is subscribed or not.")
    .isBoolean()
    .withMessage("Subscribed value must be boolean");

  return [name, lastName, email, password, isSubscribed, isLinkedWithGoogle];
};

export const loginValidator = () => {
  return [email, password, isLinkedWithGoogle];
};

export const validateTokenValidator = () => {
  const token = param("token")
    .notEmpty()
    .withMessage("You must provide a valid registration token.")
    .custom(async (value) => {
      const foundToken = await RegisterToken.findById(value);

      if (!foundToken) {
        return Promise.reject("The provided token doesn't exist here.");
      }

      if (foundToken.isUsed) {
        return Promise.reject("This token is already used.");
      }
    })
    .trim();

  return [token];
};
