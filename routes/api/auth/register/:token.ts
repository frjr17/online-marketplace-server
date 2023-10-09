import { sendState } from "../../../../controllers";
import { validateRegisterToken } from "../../../../controllers/auth/validateRegisterToken";
import { checkValidators } from "../../../../validators";
import { validateRegisterTokenValidator } from "../../../../validators/auth";

export const put = [
  validateRegisterTokenValidator(),
  checkValidators,
  validateRegisterToken,
  sendState,
];
