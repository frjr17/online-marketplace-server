import { registerValidator } from "../../../validators/auth";
import { checkValidators } from "../../../validators";
import { register } from "../../../controllers/auth";

export const post = [registerValidator(), checkValidators, register];
