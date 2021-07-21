/**
 * Router for /api/users
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { logTime } from '../../middlewares/timelogger.middleware';
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import {
	deleteAllUsers,
	login,
	exportUsersAsCsv,
	registerUser,
	confirmEmail,
	createUser,
	getSingleUser,
	updateSingleUser,
	deleteSingleUser,
	getUsers,
    loginByToken,
} from './user.controller';
import { verifyToken } from '../../middlewares/authorization.middleware';

export const userRouter: express.Router = express.Router({ mergeParams: true });

// TODO delete unnecessary route
/** READ ALL but check admin before send response req: ?id=... */
// userRouter.get('/get_all/:token', logTime, wrapAsync(getAllUsers));

/** CREATE */
userRouter.post('/register', logTime, wrapAsync(registerUser));

/** Download as CSV data */
userRouter.get('/download', logTime, wrapAsync(exportUsersAsCsv));

/** Delete all activities in the database */
userRouter.delete('/delete_all', logTime, verifyToken, wrapAsync(deleteAllUsers));

/** READ BY email and address with query ?email=..&&address=.. */
userRouter.post('/login', logTime, wrapAsync(login));

/** AUTO LOGIN WITH TOKEN */
userRouter.get('/login/:token', logTime, wrapAsync(loginByToken));

// TODO delete unnecessary route
/** UPDATE */
// userRouter.put('/update/:token', logTime, wrapAsync(updateSingleUserWithToken));

// TODO delete unnecessary route
/** DELETE */
// userRouter.delete('/delete/:token', logTime, wrapAsync(deleteSingleUserWithToken));

/** CONFIRM EMAIL */
userRouter.get('/confirm_email/:token', logTime, wrapAsync(confirmEmail));

/** READ ALL */
userRouter.get('/', logTime, verifyToken, wrapAsync(getUsers));

/** CREATE */
userRouter.post('/', logTime, verifyToken, wrapAsync(createUser));

/** READ BY ID */
userRouter.get('/:userid', logTime, verifyToken, wrapAsync(getSingleUser));

/** UPDATE */
userRouter.put('/:userid', logTime, verifyToken, wrapAsync(updateSingleUser));

/** DELETE */
userRouter.delete('/:userid', logTime, verifyToken, wrapAsync(deleteSingleUser));
