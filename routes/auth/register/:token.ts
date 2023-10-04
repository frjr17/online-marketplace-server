import { sendState } from "../../../controllers";
import { validateToken } from "../../../controllers/auth/validateToken";

export const post = [validateToken, sendState];
