import { sendState } from "../../controllers";
import { getProducts } from "../../controllers/products/getProducts";

export const get = [getProducts, sendState];
