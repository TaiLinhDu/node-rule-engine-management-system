import { Request, Response } from 'express';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbOrder, IOrderModel } from "../../models/order.model";


export const getOrder = async (req: Request, res: Response) => {
    const order: IOrderModel | null = await dbOrder.findById(req.query.orderid);
    sendSuccess(res, order);
};

export const createOrder = async (req: Request, res: Response) => {
    const newOrder: IOrderModel | null = await dbOrder.create(req.body);
    sendCreated(res, newOrder);
};

export const updateOrder = async (req: Request, res: Response) => {
    const updateOrderById: IOrderModel | null = await dbOrder.findByIdAndUpdate(req.query.orderid, req.body, {
        new: true
    });
    sendSuccess(res, updateOrderById);
};

export const deleteOrder = async (req: Request, res: Response) => {
    const deleteOrderById: IOrderModel | null = await dbOrder.findByIdAndDelete(req.query.orderid);
    sendSuccess(res, deleteOrderById);
};
