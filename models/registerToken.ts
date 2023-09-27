import { Schema, model } from "mongoose";

export interface IRegiterToken {
  isUsed: boolean;
}
const registerTokenSchema = new Schema<IRegiterToken>(
  {
    isUsed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const RegiterToken = model<IRegiterToken>("RegiterToken", registerTokenSchema);

export default RegiterToken;
