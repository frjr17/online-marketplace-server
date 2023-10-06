import { sendState } from "../../../controllers";
import { logout } from "../../../controllers/auth/logout";

export const del = [logout, sendState];
