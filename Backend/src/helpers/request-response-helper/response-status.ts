/**
 *  Helper functions for send response status data.
 */

import { Response } from 'express';

export /**
 * @description 200 OK
 * @param {Response} res
 * @param {*} docs
 * @param {string} [message]
 */
const sendSuccess = (res: Response, docs: any, message?: string): void => {
	res.status(200).send({
		data: {
			status: 'success',
			message: message,
			docs: docs,
		},
	});
};

export /**
 * @description 201 CREATED
 * @param {Response} res
 * @param {*} docs
 */
const sendCreated = (res: Response, docs: any): void => {
	res.status(201).send({
		data: {
			status: 'success',
			docs: docs,
		},
	});
};

export /**
 * @description 400 BAD REQUEST
 * @param {Response} res
 * @param {string} message
 */
const sendBadRequest = (res: Response, message: string): void => {
	res.status(400).send({
		data: {
			status: 'error',
			message: message,
		},
	});
};

export /**
 * @description 401 UNAUTHORIZED
 * @param {Response} res
 * @param {string} message
 */
const sendUnauthorized = (res: Response, message: string): void => {
	res.status(401).send({
		data: {
			status: 'error',
			message: message,
		},
	});
};

export /**
 * @description 403 FORBIDDEN
 * @param {Response} res
 * @param {string} message
 */
const sendForbidden = (res: Response, message: string): void => {
	res.status(403).send({
		data: {
			status: 'error',
			message: message,
		},
	});
};

export /**
 * @description 404 NOT FOUND
 * @param {Response} res
 * @param {string} message
 */
const sendNotFound = (res: Response, message: string): void => {
	res.status(404).send({
		data: {
			status: 'error',
			message: message,
		},
	});
};

export /**
 * @description 422 UNPROCCESSABLE ENTITY
 * @param {Response} res
 * @param {string} message
 */
const sendUnprocessable = (res: Response, message: string): void => {
	res.status(422).send({
		data: {
			status: 'error',
			message: message,
		},
	});
};

export /**
 * @description 500 INTERNAL SERVER ERROR
 * @param {Response} res
 * @param {string} message
 */
const sendInternalError = (res: Response, message: string): void => {
	res.status(500).send({
		data: {
			status: 'error',
			message: message,
		},
	});
};
