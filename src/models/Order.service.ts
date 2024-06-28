import {
  Order,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../libs/types/order";
import { Member } from "../libs/types/member";
import OrderModel from "../schema/Order.model";
import OrderItemModel from "../schema/OrderItem.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ObjectId } from "mongoose";
import { relativeTimeThreshold } from "moment";
import MemberService from "./Member.service";
import { OrderStatus } from "../libs/enum/order.enum";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;
  private readonly memberService;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
    this.memberService = new MemberService();
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
      return "Inserted";
    });

    console.log(promisedList);
    //   arraydagi har bitta iwni toliq amalga oshirib beradi
    const orderItemState = await Promise.all(promisedList); // ichidegi har bitta operasiyani toliq bajarmagunisha javob bermaydi
    console.log(orderItemState);
  }

  public async getMyOrders(
    member: Member,
    inquiry: OrderInquiry
  ): Promise<Order[]> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      matches = { memberId: memberId, orderStatus: inquiry.orderStatus };

    const result = await this.orderModel
      .aggregate([
        { $match: matches },
        { $sort: { updatedAt: -1 } }, // Yuqoridan pastga eng ohrgi ozgarish bolganlarni birinchi yuqoridan korstadi
        { $skip: (inquiry.page - 1) * inquiry.limit },
        { $limit: inquiry.limit },
        //orderItemsga dahldor bolgan malumotlarniham olvolishimiz kk
        //Lookup agrigaationni ichida topilgan malumotlarni har birini ichida itarate qiladi:va  topilganda  Boshqa 'Collection'ga borib unga taluqli malumotlarni topib keladi
        {
          $lookup: {
            from: "orderItems", // qaysi !"Collection" dan lookup qilmoqchisiz?
            localField: "_id", //qanday qiymatni "localfield bu hozirgi agrigationda turgan joy Order collectioni"dan ID dini olamiz
            foreignField: "orderId",
            as: "orderItems", // shu nomda saqlab ber . Orderga dahldor orderItemlarni olib beradi
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "productData",
          },
        },
      ])
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async updateOrder(
    member: Member,
    input: OrderUpdateInput
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      orderId = shapeIntoMongooseObjectId(input.orderId),
      orderStatus = input.orderStatus;
    console.log(orderId, orderStatus);

    const result = await this.orderModel

      .findOneAndUpdate(
        {
          memberId: memberId,
          _id: orderId,
        },
        { orderStatus: orderStatus },
        { new: true }
      )
      .exec();
    console.log("result:",result);

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    if (orderStatus === OrderStatus.PROCESS) {

      await this.memberService.addUserPoint(member, 1);
      
    }
    
    return result;
  }
}

export default OrderService;
