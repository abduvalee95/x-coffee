import { Product, ProductInput, ProductInquiry } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors, { Message } from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enum/product.enum";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  //**                            SPA

  /**
   **                              getProducts
   */
  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    const match: T = { productStatus: ProductStatus.PROCESS };

    if (inquiry.productCollection)
      match.ProductCollection = inquiry.productCollection; // buni manosi bizga Product priceni hosil qilib beradi dynamic key Drink yoki dish topib berv deyabti

    if (inquiry.search) {
      match.productName = { $regex: new RegExp(inquiry.search, "i") };
    }

    const sort: T =
      inquiry.order === "productPrice" // eng arzon bolgan narhdan yuqoriga sort qilib ber diyabmiz
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };

    const result = await this.productModel
      .aggregate([
        { $match: match }, // Productda bolgan Processlarnigina olib beryabti
        { $sort: sort },
        // Paginationni hosil qilib beradi
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit }, // boshlangich nechtadir documentni ignore qilgin  1chiu pagedan 3tani otkazib yubor 1,2,3 tashlanadi
        { $limit: inquiry.limit * 1 }, // nechta dokument kerek bolsa limit v 3 ta doc ni olib ber 4,5,6
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  // **                              getProducts

  public async getProduct(
    memberId: ObjectId | null,
    id: string
  ): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);

    let result = this.productModel.findOne({
      _id: productId,
      productStatus: ProductStatus.PROCESS,
    });

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    // ToDo : if authenticated user => view log creation

    return result;
  }

  //*                             SSR

  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    // console.log(result);
    return result;
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (error) {
      console.error("Error: createNewProduct", error);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProductInput
  ): Promise<Product> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findByIdAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    // console.log(result);
    return result;
  }
}

export default ProductService;
