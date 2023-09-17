import { Schema, model } from "mongoose";

export interface IBillingDetails {
  // Define the properties of the BillingDetails interface here
}
const billingDetailsSchema = new Schema<IBillingDetails>({
  // Define the schema for BillingDetails here
});

const BillingDetails = model<IBillingDetails>(
  "BillingDetails",
  billingDetailsSchema
);

export default { BillingDetails };
