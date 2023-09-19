import { Schema, Types, model } from "mongoose";
import { IProduct } from "./product";

export interface ICart {
  products: Types.Array<IProduct>;
  total: number;
}
const cartSchema = new Schema<ICart>({
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
  total: Number,
});

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
