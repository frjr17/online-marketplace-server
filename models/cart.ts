import { Document, Schema, Types, model } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface ICart extends Document {
  products: Types.Array<IProduct>;
  total: number;
  user: IUser;
}
const cartSchema = new Schema<ICart>(
  {
    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
    total: Number,
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
