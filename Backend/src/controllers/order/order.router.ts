import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createOrder, getOrder, updateOrder, deleteOrder, calculationPrice } from "./order.controller";
import { verifyToken } from '../../middlewares/authorization.middleware';

export const orderRouter: express.Router = express.Router();

// get a Order
orderRouter.get('/', timelog, wrapAsync(getOrder));

// create new Order
orderRouter.post( '/', verifyToken, wrapAsync(createOrder));

// create update Order
orderRouter.put( '/', timelog, wrapAsync(updateOrder));

// delete Order
orderRouter.delete( '/', timelog, wrapAsync(deleteOrder));


// get a Order
orderRouter.post('/calculation', verifyToken, wrapAsync(calculationPrice));