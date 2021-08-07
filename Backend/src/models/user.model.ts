/**
 * Model for User
 */

/** Package imports */
import * as mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

/**
 * @description interface for user.
 * @export
 * @interface IUserModel
 * @extends {mongoose.Document}
 */
export interface IUserModel extends mongoose.Document {
	email: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
    company?: string;
	passwordHash: string;
	userRole: Number; //1.Admin 2.Editing Rule 3.Normal User
	isConfirm: boolean;
	profileImageUrl?: string;
	created_at: Date;
}

/**
 * @description Schema of user for mongoose.
 * @export
 * @Schema UserSchema
 */
export const UserSchema: mongoose.Schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		firstName: {
			type: String,
			required: false,
		},
		lastName: {
			type: String,
			required: false,
		},
		phoneNumber: {
			type: String,
			required: false,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		userRole: {
			type: Number,
			required: true,
			default: false,
		},
		isConfirm: {
			type: Boolean,
			required: true,
			default: false,
		},
		profileImageUrl: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

UserSchema.plugin(uniqueValidator); // prevent identical username

/**
 * @description Export the user mongoose Schema.
 * @export
 * @Model user
 */
export const user: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);
