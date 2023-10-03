import { IUser } from "../../models/user";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      state?: {
        user?: string | IUser;
      };
    }
  }
}
