import { Document, Schema, Types, model } from "mongoose";
import { ICategory } from "./category";
import { IReview } from "./review";

export interface IProduct extends Document {
  name: string;
  description?: string;
  mainImage: string;
  images?: string[];
  colors?: string[];
  sizes: string[];
  stockQuantity: number;
  rating: {
    rate: number;
    count: number;
  };
  price: number;
  salesPrice?: number;
  reviews?: IReview[];
  categories: Types.Array<ICategory>;
  url: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: String,
    description: String,
    mainImage: String,
    images: [String],
    colors: [String],
    sizes: [String],
    stockQuantity: Number,
    rating: {
      rate: Number,
      count: Number,
    },
    price: Number,
    salesPrice: Number,
    reviews: [],
    categories: [
      {
        type: Types.ObjectId,
        ref: "Category",
      },
    ],
    url: String,
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
