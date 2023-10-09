import { sendState } from "../../../controllers";
import { getProductById } from "../../../controllers/products/getProductById";

export const get = [getProductById, sendState];
