import { Document, Schema, Types, model } from "mongoose";
import { IUser } from "./user";

export interface IPasswordToken extends Document {
  isUsed: boolean;
  user: IUser;
}
const passwordToken = new Schema<IPasswordToken>(
  {
    isUsed: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const PasswordToken = model<IPasswordToken>("PasswordToken", passwordToken);

export default PasswordToken;
