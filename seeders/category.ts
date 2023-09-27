import Category from "../models/category";

export const seedCategories = async () => {
  const categories = [
    "Woman's Fashion",
    "Men's Fahsion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  for (const category of categories) {
    const categoryObj = new Category({ name: category });
    await categoryObj.save();
  }
};
