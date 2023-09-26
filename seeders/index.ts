import Cart from "../models/cart";
import Category from "../models/category";
import Product from "../models/product";
import User from "../models/user";
import { seedProducts } from "./product";
import { seedUsers } from "./user";

export const seedDb = async () => {
  console.log("Deleting users...");
  await User.deleteMany();
  console.log("Deleting categories...");
  await Category.deleteMany();
  console.log("Deleting products...");
  await Product.deleteMany();
  console.log("Deleting carts...");
  await Cart.deleteMany();
  console.log("Creating new users...");
  await seedUsers();
  console.log("Creating new products and categories...");
  await seedProducts();
};
