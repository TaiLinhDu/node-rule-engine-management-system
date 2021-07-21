/**
 * Controller for /api/users
 */

/** Package imports */
import converter from 'json-2-csv';
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

// secret key use to create token
const myJWTSecretKey = config.get<string>('jwt.secret-key');

/**
 * Get all users.
 * @param req
 * @param res
 */
export const getUsers = async (req: Request, res: Response) => {
	try {
		jwt.verify(req.body.token, myJWTSecretKey, async (error: any, userData: any) => {
			if (error) {
				sendForbidden(res, error.message);
			} else if (userData && !userData.isAdmin) {
				sendForbidden(res, 'you must be an admin, to access this API');
			} else {
				const users: IUserModel[] = await user.find(req.query);
				sendSuccess(res, users);
			}
		});
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Create new user
 * @param req
 * @param res
 */
export const createUser = async (req: Request, res: Response) => {
	try {
		jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
			if (error) {
				sendForbidden(res, error.message);
			} else {
				const newUser: IUserModel = await user.create(req.body);
				sendCreated(res, newUser);
			}
		});
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Get a single user by id
 * @param req
 * @param res
 */
export const getSingleUser = async (req: Request, res: Response) => {
	try {
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
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Update a single user by id
 * @param req
 * @param res
 */
export const updateSingleUser = async (req: Request, res: Response) => {
	try {
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
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Delete a single user by id
 * @param req
 * @param res
 */
export const deleteSingleUser = async (req: Request, res: Response) => {
	try {
		jwt.verify(req.body.token, myJWTSecretKey, async (error: any, success: any) => {
			if (error) {
				sendForbidden(res, error.message);
			} else {
				const deleteUser: IUserModel | null = await user.findByIdAndDelete(req.params.userid);
				sendSuccess(res, deleteUser);
			}
		});
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Create new user
 * @param req
 * @param res
 */
export const registerUser = async (req: Request, res: Response) => {
	try {
		const singleUser: IUserModel | null = await user.findOne({ email: req.body.email });
		if (!singleUser) {
			// create hash with salt 10
			const hash = bcrypt.hashSync(req.body.password, 10);
			if (hash) {
				req.body.passwordHash = hash;
				const newUser: IUserModel = await user.create(req.body);
				sendMailRegister(newUser);
				sendCreated(res, newUser);
			}
		} else {
			sendBadRequest(res, 'this email is already registered');
		}
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Download all activities as a csv file
 * @param req
 * @param res
 */
export const exportUsersAsCsv = async (req: Request, res: Response) => {
	try {
		const users: IUserModel[] = await user.find({});
		const documents: object[] = [];
		users.forEach((item) => {
			const data = {
				id: item.id,
				username: item.email,
				created: item.created_at,
			};
			documents.push(data);
		});

		/** Convert to CSV data */
		converter.json2csv(documents, (err, csv) => {
			res.setHeader('Content-disposition', 'attachment; filename="all_users.csv"');
			res.set('Content-Type', 'text/csv');
			res.status(200).send(csv);
		});
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Delete all users
 * @param req
 * @param res
 */
export const deleteAllUsers = async (req: Request, res: Response) => {
	try {
		jwt.verify(req.body.token, myJWTSecretKey, async (error: any, userData: any) => {
			if (error) {
				sendForbidden(res, error.message);
			} else if (userData && !userData.isAdmin) {
				sendForbidden(res, 'you must be an admin, to access this API');
			} else {
				await user.deleteMany({});
				sendSuccess(res, null, 'all users are deleted');
			}
		});
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Get a single user by id
 * get email and password from request query
 * @param req
 * @param res
 */
export const login = async (req: Request, res: Response) => {
	try {
		const singleUser: IUserModel | null = await user.findOne({ email: req.body.email });

		// compare password with hashpassword
		if (myJWTSecretKey && singleUser) {
			if (bcrypt.compareSync(req.body.password, singleUser.passwordHash)) {
				if (singleUser.isConfirm) {
					// create a token. With this token, client can communite with server of the user
					// sign with default (HMAC SHA256)
					const token = jwt.sign(singleUser.toJSON(), myJWTSecretKey);
					res.status(200).send({
						data: {
							status: 'success',
							docs: singleUser,
							token: token,
						},
					});
				} else {
					sendBadRequest(res, 'please confirm the email');
				}
			} else {
				sendBadRequest(res, 'wrong password, please try again');
			}
		} else {
			// user does not exist
			sendNotFound(res, 'user does not exist');
		}
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * Get a single user by token
 * get email and password from request query
 * @param req
 * @param res
 */
export const loginByToken = async (req: Request, res: Response) => {
	try {
		const checkedUser = checkJwt(req.params.token);
		if (checkedUser) {
			sendSuccess(res, checkedUser);
		} else {
			sendUnauthorized(res, 'token are not available, please log in again');
		}
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

/**
 * check Token from user each request
 * @param token
 * @returns return the User or null
 */
export const checkJwt = (token: string) => {
	try {
		if (myJWTSecretKey) {
			const jwtPayload = <any>jwt.verify(token, myJWTSecretKey);
			return jwtPayload;
		}
		return null;
	} catch (error) {
		// If token is not valid
		return null;
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
	try {
		if (checkedUser) {
			const updateUser: IUserModel | null = await user.findByIdAndUpdate(checkedUser._id, req.body, {
				new: true,
			});
			sendSuccess(res, updateUser, 'email is confirmed');
		}
	} catch (error) {
		sendBadRequest(res, error.message);
	}
};

// ! IMPORTANT => see below!

// TODO delete function getAllUsers, see getUsers()
/**
 * Get all users.
 * @param req
 * @param res
 */
// export const getAllUsers = async (req: Request, res: Response) => {
// 	try {
// 		const user = checkJwt(req.params.token);
// 		if (user && user.isAdmin) {
// 			//  this user is admin, so he can get data
// 			const users: IUserModel[] = await user.find();
// 			sendSuccess(res, users);
// 		} else {
// 			// this user is not admin
// 			sendBadRequest(res, 'this user is not admin');
// 		}
// 	} catch (error) {
// 		sendBadRequest(res, error.message);
// 	}
// };

// TODO delete function, see updateSingleUser()
/**
 * Update a single user by id
 * @param req
 * @param res
 */
// export const updateSingleUserWithToken = async (req: Request, res: Response) => {
// 	try {
// 		const checkedUser = checkJwt(req.params.token);
// 		if (checkedUser) {
// 			const updateUser: IUserModel | null = await user.findByIdAndUpdate(checkedUser._id, req.body, {
// 				new: true,
// 			});
// 			sendSuccess(res, updateUser);
// 		}
// 	} catch (error) {
// 		sendBadRequest(res, error.message);
// 	}
// };

// TODO delete function, see deleteSingleUser()
/**
 * Delete a single user by id
 * @param req
 * @param res
 */
// export const deleteSingleUserWithToken = async (req: Request, res: Response) => {
// 	try {
// 		const user = checkJwt(req.params.token);
// 		if (user) {
// 			const deleteUser: IUserModel | null = await user.findByIdAndDelete(user._id);
// 			sendSuccess(res, deleteUser);
// 		}
// 	} catch (error) {
// 		sendBadRequest(res, error.message);
// 	}
// };