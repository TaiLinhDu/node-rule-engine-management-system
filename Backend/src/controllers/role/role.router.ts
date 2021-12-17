import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createRole, getRole, updateRole, deleteRole } from "./role.controller";
import { verifyToken } from '../../middlewares/authorization.middleware';

export const roleRouter: express.Router = express.Router();

// get a Role
roleRouter.get('/', timelog, wrapAsync(getRole));

// create new Role
roleRouter.post( '/',verifyToken, timelog, wrapAsync(createRole));

// create update Role
roleRouter.put( '/',verifyToken, timelog, wrapAsync(updateRole));

// delete Role
roleRouter.delete( '/',verifyToken, timelog, wrapAsync(deleteRole));
