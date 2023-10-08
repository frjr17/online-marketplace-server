import { Document, Schema, model } from "mongoose";

export interface IReview extends Document {
  // Define the properties of the review interface here
}
const reviewSchema = new Schema<IReview>(
  {
    // Define the schema for review here
  },
  { timestamps: true }
);

const Review = model<IReview>("Review", reviewSchema);

export default Review;
