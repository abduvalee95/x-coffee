import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Response } from "express";
import OrderService from "../models/Order.service";

const orderService = new OrderService();

const orderController: T = {};

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("=>: createOrder :<=");
    // biz yuborishimiz kk bolgan argumentlar , memberimizni' req.member: Extended requestdan kelyabti 'dan olamiz , inputlarimizni 'req.body' dan olamiz
    const result = await orderService.createOrder(req.member, req.body);
    res.status(HttpCode.CREATED).json({});
  } catch (error) {
    console.log("Error, createOrder: ", error);
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default orderController;
