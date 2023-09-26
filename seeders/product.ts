import { randProduct } from "@ngneat/falso";
import Product, { IProduct } from "../models/product";
import Category from "../models/category";

export const seedProducts = async () => {
  try {
    const categories = new Set();
    const products: Partial<IProduct & { possibleCategory: string }>[] = [];
    for (let i = 0; i < 100; i++) {
      const newProduct = randProduct();

      categories.add(newProduct.category);

      let product: Partial<IProduct & { possibleCategory: string }> = {};
      product.name = newProduct.title;
      product.description = newProduct.description;
      product.mainImage = newProduct.image;
      product.price = parseFloat(newProduct.price);
      product.stockQuantity = Math.floor(Math.random() * 100);
      product.salesPrice = product.price - product.price * 0.2;
      product.possibleCategory = newProduct.category;
      product.rating = {
        rate: parseFloat(newProduct.rating.rate),
        count: parseFloat(newProduct.rating.count),
      };
      products.push(product);
    }

    await categories.forEach(async (category) => {
      let newCategory = new Category({
        name: category,
      });
      await newCategory.save();
    });
    console.log("Categories Seeded Successfully!!");

    await products.forEach(async (product) => {
      const newProduct = new Product({ ...product });
      newProduct.url = newProduct._id.toString();

      const category = await Category.findOne({
        name: product.possibleCategory,
      });

      newProduct.categories.push(category);
      await newProduct.save();

      if (category) {
        category?.products.push(newProduct);
        await category.save();
      }
    });

    console.log("Products seeded successfully!!");
  } catch (error) {
    console.log(error);
  }
};
