import { Document, Schema, Types, model } from "mongoose";

export interface ILoginToken extends Document {
  user: Types.ObjectId;
  lastJwt: string;
}
const loginTokenSchema = new Schema<ILoginToken>(
  {
    user: Types.ObjectId,
    lastJwt: String,
  },
  { timestamps: true }
);

const LoginToken = model<ILoginToken>("LoginToken", loginTokenSchema);

export default LoginToken;
