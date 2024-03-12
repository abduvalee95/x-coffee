import ProductModel from "../schema/Product.model";
class ProductServce {
    private readonly productModel;

    constructor(){
        this.productModel = ProductModel
    }
}

export default ProductServce