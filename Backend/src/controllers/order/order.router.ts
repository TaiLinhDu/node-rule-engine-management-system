import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createOrder, getOrder, updateOrder, deleteOrder } from "./order.controller";

export const orderRouter: express.Router = express.Router();

// get a Order
orderRouter.get('/', timelog, wrapAsync(getOrder));

// create new Order
orderRouter.post( '/', timelog, wrapAsync(createOrder));

// create update Order
orderRouter.put( '/', timelog, wrapAsync(updateOrder));

// delete Order
orderRouter.delete( '/', timelog, wrapAsync(deleteOrder));
