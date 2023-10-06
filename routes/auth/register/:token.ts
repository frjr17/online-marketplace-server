import { sendState } from "../../../controllers";
import { validateToken } from "../../../controllers/auth/validateToken";
import { checkValidators } from "../../../validators";
import { validateTokenValidator } from "../../../validators/auth";

export const put = [
  validateTokenValidator,
  checkValidators,
  validateToken,
  sendState,
];
