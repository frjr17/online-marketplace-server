import { Schema, Types, model } from "mongoose";

export interface ILoginToken {
  user: Types.ObjectId;
}
const loginTokenSchema = new Schema<ILoginToken>(
  {
    user: Types.ObjectId,
  },
  { timestamps: true }
);

const LoginToken = model<ILoginToken>("LoginToken", loginTokenSchema);

export default LoginToken;
