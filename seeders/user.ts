import { randUser } from "@ngneat/falso";
import User, { IUser } from "../models/user";
import { hash } from "bcrypt";
import { IList } from "../models/list";
import { Types } from "mongoose";
import Cart from "../models/cart";

export const seedUsers = async () => {
  for (let i = 0; i < 50; i++) {
    const userMainDetails = randUser();
    const user = new User();

    user.firstName = userMainDetails.firstName;
    user.lastName = userMainDetails.lastName;
    user.email = userMainDetails.email;
    user.password = await hash("whateverpassword1", 12);
    user.profileImage = userMainDetails.img;
    user.isSubscribed = false;
    user.isLinkedWithGoogle = false;
    await user.save();

    const cart = new Cart();
    cart.user = user;
    await cart.save();

    user.cart = cart;
    await user.save();
  }
};
