let nodemailer = require('nodemailer');
import config from 'config';

/**
 * create Tranport to send email
 */
module.exports.GmailTransport = nodemailer.createTransport({
	service: config.get<string>('email.service-name'),
	host: config.get<string>('email.service-host'),
	secure: config.get<Boolean>('email.service-secure'),
	port: config.get<Number>('email.service-port'),
	auth: {
		user: config.get<string>('email.user-name'),
		pass: config.get<string>('email.user-password'),
	},
});

/**
 * compile hbs file (template) into the created Transport
 *
 */
module.exports.ViewOption = (transport: any, hbs: any) => {
	transport.use(
		'compile',
		hbs({
			viewEngine: {
				extName: '.hbs',
				partialsDir: 'src/helpers/email-helper/email_layout',
				layoutsDir: 'src/helpers/email-helper/email_layout',
				defaultLayout: 'register-email.hbs',
			},
			viewPath: 'src/helpers/email-helper/email_layout',
			extName: '.hbs',
		})
	);
};

/**
 * compile hbs file (template) into the created Transport
 *
 */
module.exports.ViewOptionForSubcribeEmail = (transport: any, hbs: any) => {
	transport.use(
		'compile',
		hbs({
			viewEngine: {
				extName: '.hbs',
				partialsDir: 'src/helpers/email-helper/email_layout',
				layoutsDir: 'src/helpers/email-helper/email_layout',
				defaultLayout: 'subcribe-email.hbs',
			},
			viewPath: 'src/helpers/email-helper/email_layout',
			extName: '.hbs',
		})
	);
};
