import { Schema, Types, model } from "mongoose";
import { IProduct } from "./product";

export interface ICategory {
  name: string;
  products: Types.Array<IProduct>;
}
const categorySchema = new Schema<ICategory>(
  {
    name: String,
    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", categorySchema);

export default Category;
