import express from 'express';

import { taskRouter } from './task/task.router';
import { urlNotFound } from '../middlewares/errorhandler.middleware';

export const globalRouter: express.Router = express.Router();

globalRouter.use('/user', taskRouter);

globalRouter.use('/orderarticle', taskRouter);

globalRouter.use('/order', taskRouter);

globalRouter.use('/article', taskRouter);

globalRouter.use('/*', urlNotFound);

