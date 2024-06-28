import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Response } from "express";
import OrderService from "../models/Order.service";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enum/order.enum";

const orderService = new OrderService();

const orderController: T = {};

//

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("=>: createOrder :<=");
    // biz yuborishimiz kk bolgan argumentlar , memberimizni' req.member: Extended requestdan kelyabti 'dan olamiz , inputlarimizni 'req.body' dan olamiz
    const result = await orderService.createOrder(req.member, req.body);
    res.status(HttpCode.CREATED).json(result);
  } catch (error) {
    console.log("Error, createOrder: ", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

//

orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getMyOrders");
    // querilarni togri kelyatganini tekshirib olamiz biirinchi
    const { page, limit, orderStatus } = req.query,
      inquiry: OrderInquiry = {
        page: Number(page),
        limit: Number(limit),
        orderStatus: orderStatus as OrderStatus,
      };
    console.log(inquiry);
    const result = await orderService.getMyOrders(req.member, inquiry);

    res.status(HttpCode.CREATED).json(result);
  } catch (error) {
    console.log("Error, createOrder: ", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};


orderController.updateOrder = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("=>: updateOrder :<=");

        const input: OrderUpdateInput = req.body;
        console.log(input)
        const result = await orderService.updateOrder(req.member, input);
        
        res.status(HttpCode.CREATED).json(result);
    } catch (error) {
        console.log("Error, updateOrder >: ", error);
        if (error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standart.code).json(Errors.standart);
    }
};


export default orderController;
