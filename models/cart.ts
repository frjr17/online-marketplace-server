import { Schema, model } from "mongoose";

export interface ICart {
  // Define the properties of the Cart interface here
}
const cartSchema = new Schema<ICart>({
  // Define the schema for Cart here
});

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
