import { Schema, model } from "mongoose";

export interface IReview {
  // Define the properties of the review interface here
}
const reviewSchema = new Schema<IReview>({
  // Define the schema for review here
});

const Review = model<IReview>("Review", reviewSchema);

export default Review;
