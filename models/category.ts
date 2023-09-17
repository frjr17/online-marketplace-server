import { Schema, model } from "mongoose";

export interface ICategory {
  // Define the properties of the Category interface here
}
const categorySchema = new Schema<ICategory>({
  // Define the schema for Category here
});

const Category = model<ICategory>("Category", categorySchema);

export default Category;
