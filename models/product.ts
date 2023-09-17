// Product Model

import { Schema, Types, model } from "mongoose";
import Category, { ICategory } from "./category";

/**
 * Product data to save:
 * name: string
 * description?: string
 * mainImage: string
 * images?: [string]
 * colors?: []
 * sizes: []
 * stockQuatity: number
 * rating: float (0-5)
 * price: float (.2 decimals)
 * salesPrice?: float (.2 decimals)
 * reviews?:[]
 * categories: [Category]
 * url: string
 */
export interface IProduct {
  name: string;
  description?: string;
  mainImage: string;
  images?: string[];
  colors?: string[];
  sizes: string[];
  stockQuantity: number;
  rating: number;
  price: number;
  salesPrice?: number;
  reviews?: any[];
  categories: ICategory[];
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
    rating: Number,
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

const Product = model("Product", productSchema);

export default Product;
