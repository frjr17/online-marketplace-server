import { IUser, IUserToClient } from "../../models/user";

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      state: Partial<{
        user: string | IUser | IUserToClient;
        data: any;
        error: any;
        httpStatus: any;
        message: string;
      }>;
    }
  }
}
