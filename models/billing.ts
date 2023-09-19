import { Schema, Types, model } from "mongoose";
import { IUser } from "./user";

export interface IBillingDetails {
  fullName: string;
  companyName: string;
  streetAddress: string;
  apartment?: string;
  townOrCity: string;
  phoneNumber: number;
  email: string;
  user: IUser;
}
const billingDetailsSchema = new Schema<IBillingDetails>({
  fullName: String,
  companyName: String,
  streetAddress: String,
  apartment: String,
  townOrCity: String,
  phoneNumber: Number,
  email: String,
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const BillingDetails = model<IBillingDetails>(
  "BillingDetails",
  billingDetailsSchema
);

export default BillingDetails;
