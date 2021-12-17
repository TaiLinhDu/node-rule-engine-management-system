import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createUserBusinessrule, getUserBusinessrule, updateUserBusinessrule, deleteUserBusinessrule } from "./user-businessrule.controller";
import { verifyToken } from '../../middlewares/authorization.middleware';

export const userBusinessruleRouter: express.Router = express.Router();

// get a UserBusinessrule
userBusinessruleRouter.get('/', timelog, wrapAsync(getUserBusinessrule));

// create new UserBusinessrule
userBusinessruleRouter.post( '/', timelog, verifyToken, wrapAsync(createUserBusinessrule));

// create update UserBusinessrule
userBusinessruleRouter.put( '/', timelog, verifyToken, wrapAsync(updateUserBusinessrule));

// delete UserBusinessrule
userBusinessruleRouter.delete( '/', timelog, verifyToken, wrapAsync(deleteUserBusinessrule));
