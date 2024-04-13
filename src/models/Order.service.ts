import { Order, OrderItemInput } from "../libs/types/order";
import { Member } from "../libs/types/member";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ObjectId } from "mongoose";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;

  constructor() {
    this.orderItemModel = OrderItemModel;
    this.orderModel = OrderModel;
  }

  // kim hosil qilyabti orderni shuni parametrlariga bervolamiz: va Promiseda <Order> interfacei korinishda hosil boladi
  public async createOrder(
    member: Member,
    input: OrderItemInput[]
  ): Promise<Order> {
    console.log(input);
    const memberId = shapeIntoMongooseObjectId(member._id);
    const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
    const delivery = amount < 100 ? 5 : 0;
    console.log(amount, delivery);
    try {
      const newOrder: Order = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDelivery: delivery,
        memberId: memberId,
      });
      const orderId = newOrder._id;
      console.log(newOrder._id);
      await this.recordOrderItem(orderId, input);

      return newOrder;
    } catch (error) {
      console.log("Error, modelCreateOrder:", error);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  private async recordOrderItem(
    orderId: ObjectId,
    input: OrderItemInput[]
  ): Promise<void> {
    // mapni iwlata olemiz async bilan for each filter async bn iwlamidi; Pending bu
    const promisedList = input.map(async (item: OrderItemInput) => {
      item.orderId = orderId;
      item.productId = shapeIntoMongooseObjectId(item.productId);
        await this.orderItemModel.create(item);
        return "Inserted"
    });

    console.log(promisedList);
    //   arraydagi har bitta iwni toliq amalga oshirib beradi
    const orderItemState = await Promise.all(promisedList); // ichidegi har bitta operasiyani toliq bajarmagunisha javob bermaydi 
    console.log(orderItemState);
  }
}

export default OrderService;
