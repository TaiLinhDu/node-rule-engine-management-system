import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createArticle, getArticle, updateArticle, deleteArticle } from "./article.controller";

export const articleRouter: express.Router = express.Router();

// get a Article
articleRouter.get('/getArticle', timelog, wrapAsync(getArticle));

// create new Article
articleRouter.post( '/createArticle', timelog, wrapAsync(createArticle));

// create update Article
articleRouter.put( '/updateArticle', timelog, wrapAsync(updateArticle));

// delete Article
articleRouter.delete( '/deleteArticle', timelog, wrapAsync(deleteArticle));
