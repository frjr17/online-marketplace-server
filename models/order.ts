import { Document, Schema, model } from "mongoose";

export interface IOrder extends Document {
  // Define the properties of the Order interface here
}
const orderSchema = new Schema<IOrder>(
  {
    // Define the schema for Order here
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
