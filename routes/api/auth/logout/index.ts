import { sendState } from "../../../../controllers";
import { logout } from "../../../../controllers/auth/logout";
import { checkValidators } from "../../../../validators";
import { logoutValidator } from "../../../../validators/auth";

export const del = [logoutValidator(), checkValidators, logout, sendState];
