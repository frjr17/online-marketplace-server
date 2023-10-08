import { Document, FilterQuery, Model, Schema, Types, model } from "mongoose";
import Category, { ICategory } from "./category";
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

export interface IProductRest extends Model<IProduct> {
  // eslint-disable-next-line no-unused-vars
  getToClient(options?: FilterQuery<IProduct>): Promise<IProduct>;
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

productSchema.static(
  "getToClient",
  async function (options: FilterQuery<IProduct>) {
    const products = await this.find(options)
      .populate({
        path: "categories",
        model: Category,
        select: "id name",
      })
      .select("-__v -createdAt -updatedAt");
    return products;
  }
);

const Product = model<IProduct, IProductRest>("Product", productSchema);

export default Product;
