import { NextFunction, Request, Response } from "express";
import Product from "../../models/product";
import Category from "../../models/category";

export interface IGetProductsParams {}
export interface IGetProductsResBody {}
export interface IGetProductsReqBody {}
export interface IGetProductsReqQuery {}

export const getProducts = async (
  req: Request<
    IGetProductsParams,
    IGetProductsResBody,
    IGetProductsReqBody,
    IGetProductsReqQuery
  >,
  res: Response<IGetProductsResBody>,
  next: NextFunction
) => {
  try {
    const products = await Product.find()
      .populate({
        path: "categories",
        model: Category,
        select: "id name",
      })
      .select("-__v -createdAt -updatedAt");

    req.state.data = {
      products,
    };
    req.state.message = "Products sent successfully!";
    return next();
  } catch (error) {
    console.error("getProducts error\n", error);
    next({ error, message: "Error getting products" });
  }
};
