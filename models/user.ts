// User Model

import { Document, Schema, Types, model } from "mongoose";
import { IOrder } from "./order";
import { IList } from "./list";
import { IBillingDetails } from "./billing";
import { IReview } from "./review";
import { ICart } from "./cart";
import { IRegisterToken } from "./registerToken";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  isLinkedWithGoogle: boolean;
  isVerfied: boolean;
  registerToken?: IRegisterToken;
  password?: string;
  passwordResetToken?: string;
  orders?: Types.Array<IOrder>;
  lists?: Types.Array<IList>;
  billingDetails?: IBillingDetails;
  profileImage?: string;
  reviews?: Types.Array<IReview>;
  isSubscribed: boolean;
  cart: ICart;
  toClient(): IUserToClient;
}

export interface IUserToClient {
  firstName: string;
  lastName: string;
  email: string;
  orders?: Types.Array<IOrder>;
  lists?: Types.Array<IList>;
  billingDetails?: IBillingDetails;
  profileImage?: string;
  reviews?: Types.Array<IReview>;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isLinkedWithGoogle: {
      type: Boolean,
      required: true,
    },
    isVerfied: {
      type: Boolean,
      required: true,
      default: false,
    },
    registerToken: {
      type: Types.ObjectId,
      ref: "RegisterToken",
    },
    passwordResetToken: String,
    orders: [
      {
        type: Types.ObjectId,
        ref: "Order",
      },
    ],
    lists: [
      {
        type: Types.ObjectId,
        ref: "List",
      },
    ],
    billingDetails: {
      type: Types.ObjectId,
      ref: "BillingDetails",
    },
    profileImage: String,
    reviews: [
      {
        type: Types.ObjectId,
        ref: "Review",
      },
    ],
    isSubscribed: Boolean,
    cart: {
      type: Types.ObjectId,
      ref: "Cart",
    },
  },
  {
    timestamps: true,
    methods: {
      toClient() {
        const {
          _id,
          orders,
          lists,
          reviews,
          firstName,
          lastName,
          email,
          profileImage,
        } = this.toObject();

        return {
          _id,
          orders,
          lists,
          reviews,
          firstName,
          lastName,
          email,
          profileImage,
        };
      },
    },
  }
);

const User = model<IUser>("User", userSchema);

export default User;
