import { Document, Schema, model } from "mongoose";

export interface IPasswordToken extends Document {
  isUsed: boolean;
}
const passwordToken = new Schema<IPasswordToken>(
  {
    isUsed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const PasswordToken = model<IPasswordToken>("PasswordToken", passwordToken);

export default PasswordToken;
