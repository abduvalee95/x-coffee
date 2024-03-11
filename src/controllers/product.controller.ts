
import { Request, Response } from "express";
import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import ProductServce from "../models/Product.service";

const productServce = new ProductServce();

const productController: T = {} ;

//*                                 getAllProducts-Page
productController.getAllProducts = async ( req: Request, res:Response) => { 
    try {
        console.log("getAllProducts");
        res.render("products");
 } catch (error) {
        console.log("Error, getAllProducts",error);
        if (error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standart.code).json(Errors.standart);
        }
    };

//*                                 getAllProducts-Page

productController.createNewProduct = async ( req:Request, res:Response) => { 
    try {
        console.log("createNewProduct");

        } catch (error) {
            console.log("Error, getAllProducts",error);
            if (error instanceof Errors) res.status(error.code).json(error);
            else res.status(Errors.standart.code).json(Errors.standart);
        }
    };

//*                                 getAllProducts-Page

productController.updateChosenProduct = async ( req:Request, res:Response) => { 
    try {
        console.log("updateChosenProduct");

        } catch (error) {
            console.log("Error, getAllProducts",error);
            if (error instanceof Errors) res.status(error.code).json(error);
            else res.status(Errors.standart.code).json(Errors.standart);
        }
    };

export default productController;