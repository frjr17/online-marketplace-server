import { Schema, model } from "mongoose";

export interface IRegisterToken {
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
