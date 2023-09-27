import { Schema, Types, model } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface IList {
  name: string;
  products: Types.Array<IProduct>;
  total: number;
  user: IUser;
}
const listSchema = new Schema<IList>(
  {
    name: String,
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

const List = model<IList>("List", listSchema);

export default List;
