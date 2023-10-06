import { sendState } from "../../../controllers";
import { login } from "../../../controllers/auth/login";
import { checkValidators } from "../../../validators";
import { loginValidator } from "../../../validators/auth";

export const post = [loginValidator(), checkValidators, login, sendState];
