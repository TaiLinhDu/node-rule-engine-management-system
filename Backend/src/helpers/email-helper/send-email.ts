/**
 * Email controller
 */

import { Request, Response } from 'express';
import { IUserModel, user } from '../../models/user.model';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const mailConfig = require('../email-helper/email-config');
const hbs = require('nodemailer-express-handlebars');
const gmailTransport = mailConfig.GmailTransport;

// need to send email successfully
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// secret key use to create token
const myJWTSecretKey = config.get<string>('jwt.secret-key');

/**
 * this module create a token and put it into email
 * and send email to user
 * @param user
 */
export const sendMailRegister = async (user: IUserModel) => {
	try {
		let urlConfirmEmail = config.get('url.confirm-email');

		if (user && myJWTSecretKey && urlConfirmEmail) {
			const token = jwt.sign(user.toJSON(), myJWTSecretKey);

			mailConfig.ViewOption(gmailTransport, hbs);
			let HelperOptions = {
				from: '"Garbage Hunter Team" <garbage.hunter.2019@gmail.com>',
				to: user.email,
				subject: 'Register Confirm',
				template: 'register-email',
				context: {
					email: user.email,
					token: token,
					url: urlConfirmEmail,
				},
			};

			gmailTransport.sendMail(HelperOptions, (error: any, info: any) => {
				if (error) {
					console.log(error);
				}
				console.log('email is send');
				console.log(info);
			});
		}
	} catch (error) {
		console.log(error);
	}
};

/**
 * send subcribe email
 * @param userId
 * @param messageId
 */
export const sendMailSubscribe = async (userId: string, messageId: string) => {
	try {
		let urlMessage = config.get('url.show-message');
		let singleUser: IUserModel | null = await user.findById(userId);

		if (singleUser) {
			mailConfig.ViewOptionForSubcribeEmail(gmailTransport, hbs);
			let HelperOptions = {
				from: '"Garbage Hunter Team" <garbage.hunter.2019@gmail.com>',
				to: singleUser.email,
				subject: 'New matching Message',
				template: 'subcribe-email',
				context: {
					url: urlMessage,
					messageId: messageId,
				},
			};

			gmailTransport.sendMail(HelperOptions, (error: any, info: any) => {
				if (error) {
					console.log(error);
				}
				console.log('email is send');
				console.log(info);
			});
		}
	} catch (error) {
		console.log(error);
	}
};
