import { registerValidator } from "../../../validators/auth";
import { checkValidators } from "../../../validators";
import { sendState } from "../../../controllers";
import { register } from "../../../controllers/auth/register";

export const post = [registerValidator(), checkValidators, register, sendState];
