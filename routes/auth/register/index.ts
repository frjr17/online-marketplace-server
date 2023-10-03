import { registerValidator } from "../../../validators/auth";
import { checkValidators } from "../../../validators";
import { register } from "../../../controllers/auth";
import { sendState } from "../../../controllers";

export const post = [registerValidator(), checkValidators, register, sendState];
