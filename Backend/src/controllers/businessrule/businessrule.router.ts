import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createBusinessrule, getBusinessrule, updateBusinessrule, deleteBusinessrule, updateBusinessruleFromJsonFile } from "./businessrule.controller";
import { verifyToken } from '../../middlewares/authorization.middleware';

import multer from 'multer';
var upload = multer();

export const businessruleRouter: express.Router = express.Router();

// get a Businessrule
businessruleRouter.get('/', timelog, verifyToken, wrapAsync(getBusinessrule));

// create new Businessrule
businessruleRouter.post( '/', timelog, verifyToken, wrapAsync(createBusinessrule));

// create update Businessrule
businessruleRouter.put( '/', timelog, verifyToken, wrapAsync(updateBusinessrule));

// delete Businessrule
businessruleRouter.delete( '/', timelog, verifyToken, wrapAsync(deleteBusinessrule));

// // get a Businessrule
// businessruleRouter.get('/jsonfile', timelog, wrapAsync(getBusinessruleAsJson));

// update Businessrule from Json File
businessruleRouter.put( '/jsonfile', timelog, verifyToken, upload.single('jsonfile'), wrapAsync(updateBusinessruleFromJsonFile));
