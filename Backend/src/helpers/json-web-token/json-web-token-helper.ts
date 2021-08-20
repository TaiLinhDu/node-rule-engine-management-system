import config from 'config';
import * as jwt from 'jsonwebtoken';
const myJWTSecretKey = config.get<string>('jwt.secret-key');

/**
 * check Token from user each request
 * @param token
 * @returns return the User or null
 */
 export const checkJwt = (token: string) => {
	if (myJWTSecretKey) {
		const jwtPayload = <any>jwt.verify(token, myJWTSecretKey);
		return jwtPayload;
	}
	return null;
};