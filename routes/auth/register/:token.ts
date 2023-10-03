import { sendState } from "../../../controllers";
import { validateToken } from "../../../controllers/auth";

export const post = [validateToken, sendState];
