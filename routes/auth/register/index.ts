import { sendState } from "../../../controllers";
import { register } from "../../../controllers/auth/register";
import { checkValidators } from "../../../validators";
import { registerValidator } from "../../../validators/auth";

export const post = [registerValidator(), checkValidators, register, sendState];
