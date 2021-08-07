import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createArticle, getArticle, updateArticle, deleteArticle } from "./article.controller";

export const articleRouter: express.Router = express.Router();

// get a Article
articleRouter.get('/', wrapAsync(getArticle));

// create new Article
articleRouter.post( '/', wrapAsync(createArticle));

// create update Article
articleRouter.put( '/', wrapAsync(updateArticle));

// delete Article
articleRouter.delete( '/', wrapAsync(deleteArticle));
