import { sendState } from "../../../controllers";
import { login } from "../../../controllers/auth/login";

export const post = [login, sendState];
