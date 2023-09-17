import { Schema, model } from "mongoose";

export interface IList {
  // Define the properties of the List interface here
}
const listSchema = new Schema<IList>({
  // Define the schema for List here
});

const List = model<IList>("List", listSchema);

export default { List };
