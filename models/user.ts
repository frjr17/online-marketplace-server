// User Model

import { Schema, Types, model } from "mongoose";

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
interface IBillingDetails {
  // Define the properties of the BillingDetails interface here
}

interface IReview {
  // Define the properties of the Review interface here
}

interface IOrder {
  // Define the properties of the Order interface here
}

interface IList {
  // Define the properties of the List interface here
}

interface ICart {
  // Define the properties of the Cart interface here
}

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

const billingDetailsSchema = new Schema<IBillingDetails>({
  // Define the schema for BillingDetails here
});

const reviewSchema = new Schema<IReview>({
  // Define the schema for Review here
});

const orderSchema = new Schema<IOrder>({
  // Define the schema for Order here
});

const listSchema = new Schema<IList>({
  // Define the schema for List here
});

const cartSchema = new Schema<ICart>({
  // Define the schema for Cart here
});

const userSchema = new Schema<IUser>({
  name: String,
  lastName: String,
  email: String,
  password: String,
  isLinkedWithGoogle: Boolean,
  passwordResetToken: String,
  orders: [orderSchema],
  lists: [listSchema],
  billingDetails: billingDetailsSchema,
  profileImage: String,
  reviews: [reviewSchema],
  isSubscribed: Boolean,
  cart: cartSchema,
});

const UserModel = model<IUser>("User", userSchema);

export { IUser, UserModel };
