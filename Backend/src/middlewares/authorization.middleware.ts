/**
 * Middleware for checking authorization
 */

/** Package imports */
import { Request, Response, NextFunction } from 'express';
import { sendForbidden } from '../helpers/request-response-helper/response-status';

/**
 * Check the header for Bearer <access_token> and move it to req.token
 * @param req
 * @param res
 * @param next
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		const token = bearerHeader.split(' ')[1];
		req.body.token = token;
		next();
	} else {
		sendForbidden(res, 'API call is forbidden! Must provide token!');
	}
};
