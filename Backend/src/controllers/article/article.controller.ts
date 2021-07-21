import { Request, Response } from 'express';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbArticle, IArticleModel } from "../../models/article.model";


export const getArticle = async (req: Request, res: Response) => {
    const article: IArticleModel | null = await dbArticle.findById(req.query.articleid);
    sendSuccess(res, article);
};

export const createArticle = async (req: Request, res: Response) => {
    const newArticle: IArticleModel | null = await dbArticle.create(req.body);
    sendCreated(res, newArticle);
};

export const updateArticle = async (req: Request, res: Response) => {
    const updateArticleById: IArticleModel | null = await dbArticle.findByIdAndUpdate(req.query.articleid, req.body, {
        new: true
    });
    sendSuccess(res, updateArticleById);
};

export const deleteArticle = async (req: Request, res: Response) => {
    const deleteArticleById: IArticleModel | null = await dbArticle.findByIdAndDelete(req.query.articleid);
    sendSuccess(res, deleteArticleById);
};
