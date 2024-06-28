import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import ProductService from "../models/Product.service";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductCollection } from "../libs/enum/product.enum";

const productService = new ProductService();

const productController: T = {};

//*                             SPA

//*                                 getProducts

productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    const { page, limit, order, productCollection, search } = req.query;

    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
      
    if (productCollection) {
      inquiry.productCollection = productCollection as ProductCollection;
      };
      
    if (search) inquiry.search = String(search);

    const result = await productService.getProducts(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (error) {
    console.log("Error, getProducts", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                                 getProduct

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");
      const { id } = req.params,
          memberId = req.member?._id ?? null, // aynan kim productni malumotni kormoqchi 
          //   authenticated bolsa memberni ichiga requestni valuesni biriktirib berilgan bolsa 
          result = await productService.getProduct(memberId, id);
      res.status(HttpCode.OK).json(result)
  } catch (error) {
    console.log("Error, getProduct, error");
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                             SSR

//*                                 getAllProducts-Page

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    const data = await productService.getAllProducts();

    res.render("products", { products: data });
  } catch (error) {
    console.log("Error, getAllProducts", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//*                                 createNewProducts-Page

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    // console.log("req",req.files);

    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;

    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    console.log("data", data);
    await productService.createNewProduct(data);
    res.send(
      `<script> alert ("${"Sucssess"}"); window.location.replace('/admin/product/all') </script>`
    );
  } catch (error) {
    console.log("Error, getAllProducts", error);

    const message =
      error instanceof Errors ? error.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/product/all') </script>`
    );
  }
};

//*                                updateChosenProduct-Page

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id;

    const result = await productService.updateChosenProduct(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (error) {
    console.log("Error, getAllProducts", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default productController;
