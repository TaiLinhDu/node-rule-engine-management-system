import { Request, Response } from 'express';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbOrderArticle, IOrderArticleModel } from "../../models/order-article.model";


export const getOrderArticle = async (req: Request, res: Response) => {
    const orderArticle: IOrderArticleModel | null = await dbOrderArticle.findById(req.query.orderArticleid);
    sendSuccess(res, orderArticle);
};

export const createOrderArticle = async (req: Request, res: Response) => {
    const newOrderArticle: IOrderArticleModel | null = await dbOrderArticle.create(req.body);
    sendCreated(res, newOrderArticle);
};

export const updateOrderArticle = async (req: Request, res: Response) => {
    const updateOrderArticleById: IOrderArticleModel | null = await dbOrderArticle.findByIdAndUpdate(req.query.orderArticleid, req.body, {
        new: true
    });
    sendSuccess(res, updateOrderArticleById);
};

export const deleteOrderArticle = async (req: Request, res: Response) => {
    const deleteOrderArticleById: IOrderArticleModel | null = await dbOrderArticle.findByIdAndDelete(req.query.orderArticleid);
    sendSuccess(res, deleteOrderArticleById);
};
