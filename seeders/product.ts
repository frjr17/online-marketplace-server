import { randProduct } from "@ngneat/falso";
import Product, { IProduct } from "../models/product";
import Category from "../models/category";

export const seedProducts = async () => {
  try {
    const categories = new Set();
    const products: IProduct[] = [];
    for (let i = 0; i < 100; i++) {
      const newProduct = randProduct();

      categories.add(newProduct.category);

      let product: Partial<IProduct> = {};
      product.name = newProduct.title;
      product.description = newProduct.description;
      product.mainImage = newProduct.image;
      product.price = parseFloat(newProduct.price);
      product.salesPrice = product.price - product.price * 0.2;
      product.rating = {
        rate: parseFloat(newProduct.rating.rate),
        count: parseFloat(newProduct.rating.count),
      };
      product.url = newProduct.id;
    }
    console.log("Categories Size:", categories.size);
    await categories.forEach(async (category) => {
      let newCategory = new Category({
        name: category,
      });
      await newCategory.save();
    });
    console.log("Categories Seeded Successfully!!");

    for await (let product of products) {
      let newProduct = new Product({ ...product });
      await newProduct.save();
    }
    console.log("Products Seeded Successfully!!");
  } catch (error) {
    console.log(error);
  }
};
