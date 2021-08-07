import express from 'express';

import { taskRouter } from './task/task.router';
import { userRouter } from './user/user.router';
import { orderRouter } from './order/order.router';
import { articleRouter } from './article/article.router';
import { orderArticleRouter } from './orderarticle/orderarticle.router';
import { urlNotFound } from '../middlewares/errorhandler.middleware';

export const globalRouter: express.Router = express.Router();

globalRouter.use('/user', userRouter);

globalRouter.use('/orderarticle', orderArticleRouter);

globalRouter.use('/order', orderRouter);

globalRouter.use('/article', articleRouter);

globalRouter.use('/*', urlNotFound);

