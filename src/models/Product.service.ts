import { Product, ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors, { Message } from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
class ProductService {
    private readonly productModel;

    constructor() {
        this.productModel = ProductModel
    }

//**                            SPA 




//*                             SSR


public async getAllProducts(
  ): Promise<Product[]> {

      const result = await this.productModel.find()
      .exec();
      if(!result) throw new Errors(HttpCode.NOT_MODIFIED,Message.UPDATE_FAILED);

      // console.log(result);
      return result
      
  }





public async createNewProduct(input:ProductInput): Promise<Product> {
    try {
        return await this.productModel.create(input);
    } catch (error) {
        console.error("Error: createNewProduct", error);
        
        throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
    }
}


  public async updateChosenProduct(
      id: string,
      input: ProductInput,
    ): Promise<Product> {
        id = shapeIntoMongooseObjectId(id)
        const result = await this.productModel
        .findByIdAndUpdate({ _id : id }, input, { new:true })
        .exec();
        if(!result) throw new Errors(HttpCode.NOT_MODIFIED,Message.UPDATE_FAILED);

        // console.log(result);
        return result
        
    }
}

export default ProductService