import Cart from "../models/cart";
import Category from "../models/category";
import Product from "../models/product";
import User from "../models/user";
import { seedProducts } from "./product";
import { seedUsers } from "./user";

export const seedDb = async () => {
  await User.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();
  await Cart.deleteMany();
  await seedUsers();
  await seedProducts();
};
