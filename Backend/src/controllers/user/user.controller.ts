/**
 * Controller for /api/users
 */

/** Package imports */
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { IUserModel, user } from '../../models/user.model';
import * as jwt from 'jsonwebtoken';
import { sendMailRegister } from '../../helpers/email-helper/send-email';
import config from 'config';
import {
	sendSuccess,
	sendBadRequest,
	sendCreated,
	sendNotFound,
	sendUnauthorized,
	sendForbidden,
} from '../../helpers/request-response-helper/response-status';

import { checkJwt } from '../../helpers/json-web-token/json-web-token-helper'
import { checkUserRole } from '../../helpers/check-userrole/check-userrole';
import { RoleNumberEnum } from '../../helpers/global-object-helper/global-object';

// secret key use to create token
const myJWTSecretKey = config.get<string>('jwt.secret-key');

/**
 * Get all users.
 * @param req
 * @param res
 */
export const getUsers = async (req: Request, res: Response) => {
	jwt.verify(req.body.token, myJWTSecretKey, async (error: any, userData: any) => {

		console.log("CHECK ADMIN RESULT", await checkUserRole(userData, RoleNumberEnum.Admin));
		
		if (error) {
			sendForbidden(res, error.message);
		} else if (userData && !(userData.isAdmin) && !(await checkUserRole(userData, RoleNumberEnum.Admin))) {
			sendForbidden(res, 'you must be an admin, to access this API');
		} else {
			const users: IUserModel[] = await user.find(req.query);
			sendSuccess(res, users);
		}
	});
};

/**
 * Create new user
 * @param req
 * @param res
 */
export const createUser = async (req: Request, res: Response) => {
	jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
		if (error) {
			sendForbidden(res, error.message);
		} else {
			const newUser: IUserModel = await user.create(req.body);
			sendCreated(res, newUser);
		}
	});
};

/**
 * Get a single user by id
 * @param req
 * @param res
 */
export const getSingleUser = async (req: Request, res: Response) => {
	jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
		if (error) {
			sendForbidden(res, error.message);
		} else {
			const singleUser: IUserModel | null = await user.findById(req.params.userid);
			if (singleUser) {
				// TODO what for send mail?
				// sendMailRegister(singleUser);
			}
			sendSuccess(res, singleUser);
		}
	});
};

/**
 * Update a single user by id
 * @param req
 * @param res
 */
export const updateSingleUser = async (req: Request, res: Response) => {
	jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
		if (error) {
			sendForbidden(res, error.message);
		} else {
			const updateUser: IUserModel | null = await user.findByIdAndUpdate(req.params.userid, req.body, {
				new: true,
			});
			sendSuccess(res, updateUser);
		}
	});
};

/**
 * Delete a single user by id
 * @param req
 * @param res
 */
export const deleteSingleUser = async (req: Request, res: Response) => {
	jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
		if (error) {
			sendForbidden(res, error.message);
		} else {
			const deleteUser: IUserModel | null = await user.findByIdAndDelete(req.params.userid);
			sendSuccess(res, deleteUser);
		}
	});
};

/**
 * Create new user
 * @param req
 * @param res
 */
export const registerUser = async (req: Request, res: Response) => {
	const singleUser: IUserModel | null = await user.findOne({ email: req.body.email });
	if (!singleUser) {
		// create hash with salt 10
		const hash = bcrypt.hashSync(req.body.password, 10);
		if (hash) {
			req.body.passwordHash = hash;
			const newUser: IUserModel = await user.create(req.body);
			//sendMailRegister(newUser);
			sendCreated(res, newUser);
		}
	} else {
		sendBadRequest(res, 'this email is already registered');
	}
};


/**
 * Delete all users
 * @param req
 * @param res
 */
export const deleteAllUsers = async (req: Request, res: Response) => {
		jwt.verify(req.body.token, myJWTSecretKey, async (error: any, userData: any) => {
			if (error) {
				sendForbidden(res, error.message);
			} else if (userData && !userData.isAdmin && !(await checkUserRole(userData, RoleNumberEnum.Admin))) {
				sendForbidden(res, 'you must be an admin, to access this API');
			} else {
				await user.deleteMany({});
				sendSuccess(res, null, 'all users are deleted');
			}
		});
};

/**
 * Get a single user by id
 * get email and password from request query
 * @param req
 * @param res
 */
export const login = async (req: Request, res: Response) => {
		const singleUser: IUserModel | null = await user.findOne({ email: req.body.email });
		// compare password with hashpassword
		if (myJWTSecretKey && singleUser) {
			if (bcrypt.compareSync(req.body.password, singleUser.passwordHash)) {
				// create a token. With this token, client can communite with server of the user
					// sign with default (HMAC SHA256)
					const token = jwt.sign(singleUser.toJSON(), myJWTSecretKey);
					res.status(200).send({
						status: 'success',
						docs: singleUser,
						token: token,
					});
				// if (singleUser.isConfirm) {
					
				// } else {
				// 	sendBadRequest(res, 'please confirm the email');
				// }
			} else {
				sendBadRequest(res, 'wrong password, please try again');
			}
		} else {
			// user does not exist
			sendNotFound(res, 'user does not exist');
		}
};

/**
 * Get a single user by token
 * get email and password from request query
 * @param req
 * @param res
 */
export const loginByToken = async (req: Request, res: Response) => {
	const checkedUser = checkJwt(req.body.token);
	if (checkedUser) {
		sendSuccess(res, checkedUser);
	} else {
		sendUnauthorized(res, 'token are not available, please log in again');
	}
};


/**
 * change user information after user confirm email
 * @param req
 * @param res
 */
export const confirmEmail = async (req: Request, res: Response) => {
	const checkedUser: any = checkJwt(req.params.token);
	req.body.isConfirm = true;

	if (checkedUser) {
		const updateUser: IUserModel | null = await user.findByIdAndUpdate(checkedUser._id, req.body, {
			new: true,
		});
		sendSuccess(res, updateUser, 'email is confirmed');
	}
};
