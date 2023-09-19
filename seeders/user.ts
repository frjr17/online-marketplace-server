import { randUser } from "@ngneat/falso";
import { IUser } from "../models/user";
import { hash } from "bcrypt";
import { IList } from "../models/list";
import { Types } from "mongoose";
export const seedUsers = async () => {
  for (let i = 0; i < 50; i++) {
    const userMainDetails = randUser();
    const user: Partial<IUser> = {};
    user.firstName = userMainDetails.firstName;
    user.lastName = userMainDetails.lastName;
    user.email = userMainDetails.email;
    user.password = await hash("whateverpassword1", 12);
    user.profileImage = userMainDetails.img;
    user.isSubscribed = false;
    if (i === 1) {
      console.log(user);
    }
  }
};
