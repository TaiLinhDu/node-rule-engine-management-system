/**
 * Router for /api/users
 */

/** Package imports */
import express from 'express';

/** Module imports */
import { wrapAsync } from '../../middlewares/errorhandler.middleware';
import {
	deleteAllUsers,
	login,
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
userRouter.post('/register', wrapAsync(registerUser));

/** Delete all activities in the database */
userRouter.delete('/delete_all', verifyToken, wrapAsync(deleteAllUsers));

/** READ BY email and address with query ?email=..&&address=.. */
userRouter.post('/login', wrapAsync(login));

/** AUTO LOGIN WITH TOKEN */
userRouter.post('/loginbytoken/', wrapAsync(loginByToken));

// TODO delete unnecessary route
/** UPDATE */
// userRouter.put('/update/:token', logTime, wrapAsync(updateSingleUserWithToken));

// TODO delete unnecessary route
/** DELETE */
// userRouter.delete('/delete/:token', logTime, wrapAsync(deleteSingleUserWithToken));

/** CONFIRM EMAIL */
userRouter.get('/confirm_email/:token', wrapAsync(confirmEmail));

/** READ ALL */
userRouter.get('/', verifyToken, wrapAsync(getUsers));

/** CREATE */
userRouter.post('/', verifyToken, wrapAsync(createUser));

/** READ BY ID */
userRouter.get('/:userid', verifyToken, wrapAsync(getSingleUser));

/** UPDATE */
userRouter.put('/:userid', verifyToken, wrapAsync(updateSingleUser));

/** DELETE */
userRouter.delete('/:userid', verifyToken, wrapAsync(deleteSingleUser));
