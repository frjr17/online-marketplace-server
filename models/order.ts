import { Schema, model } from "mongoose";

export interface IOrder {
  // Define the properties of the Order interface here
}
const orderSchema = new Schema<IOrder>({
  // Define the schema for Order here
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
