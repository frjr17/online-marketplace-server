import { Schema, model } from "mongoose";
import { IProduct } from "./product";

const variantSchema = new Schema<IProduct>({}, { timestamps: true });

const Variant = model<IProduct>("Variant", variantSchema);

export default Variant;
