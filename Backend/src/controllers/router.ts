import express from 'express';

import { taskRouter } from './task/task.router';
import { userRouter } from './user/user.router';
import { orderRouter } from './order/order.router';
import { articleRouter } from './article/article.router';
import { orderArticleRouter } from './orderarticle/orderarticle.router';
import { businessruleRouter } from './businessrule/businessrule.router';
import { userBusinessruleRouter } from './user-businessrule/user-businessrule.router';

import { userRoleRouter } from './user-role/user-role.router';
import { roleRouter } from './role/role.router';
import { urlNotFound } from '../middlewares/errorhandler.middleware';

export const globalRouter: express.Router = express.Router();

globalRouter.use('/user', userRouter);

globalRouter.use('/orderarticle', orderArticleRouter);

globalRouter.use('/order', orderRouter);

globalRouter.use('/article', articleRouter);

globalRouter.use('/businessrule', businessruleRouter);

globalRouter.use('/userbusinessrule', userBusinessruleRouter);

globalRouter.use('/role', roleRouter);

globalRouter.use('/userrole', userRoleRouter);

globalRouter.use('/*', urlNotFound);

