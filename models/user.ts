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

interface IUser {
  name: string;
  lastName: string;
  email: string;
  password?: string;
  isLinkedWithGoogle?: boolean;
  passwordResetToken?: string;
  orders?: Types.Array<IOrder>;
  lists: Types.Array<IList>;
  billingDetails?: IBillingDetails;
  profileImage?: string;
  reviews?: Types.Array<IReview>;
  isSubscribed: boolean;
  cart: ICart;
}

const userSchema = new Schema<IUser>({
  name: String,
  lastName: String,
  email: String,
  password: String,
  isLinkedWithGoogle: Boolean,
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
