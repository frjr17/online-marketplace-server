import { sendState } from "../../../../controllers";
import { resetPassword } from "../../../../controllers/auth/resetPassword";
import { resetPasswordRequest } from "../../../../controllers/auth/resetPasswordRequest";

export const post = [resetPasswordRequest, sendState];

export const put = [resetPassword, sendState];
