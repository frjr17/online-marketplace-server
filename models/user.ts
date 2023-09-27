// User Model

import { Schema, Types, model } from "mongoose";
import Order, { IOrder } from "./order";
import List, { IList } from "./list";
import BillingDetails, { IBillingDetails } from "./billing";
import Review, { IReview } from "./review";
import Cart, { ICart } from "./cart";

/**
 * User data to store:
 * name: string
 * lastName: string
 * email: string
 * password: string (only optional if "isLinkedWithGoogle")
 * isLinkedWithGoogle?: boolean
 * passwordResetToken?: string
 * orders?: [Order]
 * lists: [List] (In that, there must be the favorite list at top.)
 * billingDetails?: BillingDetails (A different schema)
 * profileImage?: string
 * reviews?: [Review]
 * isSubscribed: boolean
 * cart: Cart
 */

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  isLinkedWithGoogle: boolean;
  isVerfied: boolean;
  registerToken?: string;
  password?: string;
  passwordResetToken?: string;
  orders?: Types.Array<IOrder>;
  lists?: Types.Array<IList>;
  billingDetails?: IBillingDetails;
  profileImage?: string;
  reviews?: Types.Array<IReview>;
  isSubscribed: boolean;
  cart: ICart;
}

const userSchema = new Schema<IUser>({
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
  },
  registerToken: String,
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
});

const User = model<IUser>("User", userSchema);

export default User;
