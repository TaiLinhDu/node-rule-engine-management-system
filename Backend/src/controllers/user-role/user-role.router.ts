import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createUserRole, getUserRole, updateUserRole, deleteUserRole } from "./user-role.controller";
import { verifyToken } from '../../middlewares/authorization.middleware';

export const userRoleRouter: express.Router = express.Router();

// get a UserRole
userRoleRouter.get('/', timelog,verifyToken, wrapAsync(getUserRole));

// create new UserRole
userRoleRouter.post( '/', timelog, verifyToken, wrapAsync(createUserRole));

// create update UserRole
userRoleRouter.put( '/', timelog, verifyToken, wrapAsync(updateUserRole));

// delete UserRole
userRoleRouter.delete( '/', timelog, verifyToken, wrapAsync(deleteUserRole));
