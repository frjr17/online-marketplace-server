import { NextFunction, Request, Response } from "express";
import Product from "../../models/product";

export interface IGetProductByIdParams {
  productId: string;
}
export interface IGetProductByIdResBody {}
export interface IGetProductByIdReqBody {}
export interface IGetProductByIdReqQuery {}

export const getProductById = async (
  req: Request<
    IGetProductByIdParams,
    IGetProductByIdResBody,
    IGetProductByIdReqBody,
    IGetProductByIdReqQuery
  >,
  res: Response<IGetProductByIdResBody>,
  next: NextFunction
) => {
  try {
    const { productId: id } = req.params;
    const product = await Product.findById(id).select(
      "-__v -createdAt -updatedAt"
    );
    if (product) {
      req.state.data = {
        product,
      };
      req.state.message = "Product sent successfully";
      return next();
    }
  } catch (error) {
    console.error("getProductById error\n", error);
    next({ error, message: "Error getting product" });
  }
};
