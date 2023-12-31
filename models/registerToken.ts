import { Document, Schema, model } from "mongoose";

export interface IRegisterToken extends Document {
  isUsed: boolean;
}
const registerTokenSchema = new Schema<IRegisterToken>(
  {
    isUsed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const RegisterToken = model<IRegisterToken>(
  "RegisterToken",
  registerTokenSchema
);

export default RegisterToken;
