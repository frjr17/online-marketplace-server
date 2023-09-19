import { Schema, Types, model } from "mongoose";
import { IProduct } from "./product";

export interface IList {
  name: string;
  products: Types.Array<IProduct>;
  total: number;
}
const listSchema = new Schema<IList>({
  name: String,
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
  total: Number,
});

const List = model<IList>("List", listSchema);

export default List;
