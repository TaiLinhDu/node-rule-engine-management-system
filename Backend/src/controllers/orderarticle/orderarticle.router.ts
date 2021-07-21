import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createOrderArticle, getOrderArticle, updateOrderArticle, deleteOrderArticle } from "./orderarticle.controller";

export const orderArticleRouter: express.Router = express.Router();

// get a OrderArticle
orderArticleRouter.get('/getOrderArticle', timelog, wrapAsync(getOrderArticle));

// create new OrderArticle
orderArticleRouter.post( '/createOrderArticle', timelog, wrapAsync(createOrderArticle));

// create update OrderArticle
orderArticleRouter.put( '/updateOrderArticle', timelog, wrapAsync(updateOrderArticle));

// delete OrderArticle
orderArticleRouter.delete( '/deleteOrderArticle', timelog, wrapAsync(deleteOrderArticle));
