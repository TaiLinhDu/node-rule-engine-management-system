import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createOrder, getOrder, updateOrder, deleteOrder } from "./order.controller";

export const orderRouter: express.Router = express.Router();

// get a Order
orderRouter.get('/getOrder', timelog, wrapAsync(getOrder));

// create new Order
orderRouter.post( '/createOrder', timelog, wrapAsync(createOrder));

// create update Order
orderRouter.put( '/updateOrder', timelog, wrapAsync(updateOrder));

// delete Order
orderRouter.delete( '/deleteOrder', timelog, wrapAsync(deleteOrder));
