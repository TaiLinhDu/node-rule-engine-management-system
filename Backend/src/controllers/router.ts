import express from 'express';

import { taskRouter } from './task/task.router';
import { urlNotFound } from '../middlewares/errorhandler.middleware';

export const globalRouter: express.Router = express.Router();

globalRouter.use('/task', taskRouter);

globalRouter.use('/*', urlNotFound);

