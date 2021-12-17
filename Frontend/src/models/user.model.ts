export interface IUser {
	_id?: string;
    email?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
    address?: string;
	passwordHash?: string;
	isAdmin: boolean;
	isConfirm?: boolean;
	profileImageUrl?: string;
	created_at?: Date;
}