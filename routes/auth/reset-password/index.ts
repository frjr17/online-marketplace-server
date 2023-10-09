import { sendState } from "../../../controllers";
import { resetPasswordRequest } from "../../../controllers/auth/resetPasswordRequest";

export const post = [resetPasswordRequest, sendState];
