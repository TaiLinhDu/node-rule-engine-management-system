import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for userRole.
 * @export
 * @interface IUserRoleModel
 * @extends {mongoose.Document}
 */
export interface IUserRoleModel extends mongoose.Document {
    roleNumber: Number;
    userId: string;
}

/**
 * @description Schema of userRole for mongoose.
 * @export
 * @Schema UserRoleSchema
 */
export const UserRoleSchema: mongoose.Schema = new mongoose.Schema({

        roleNumber: {
            type: Number,
            required: true,
            index: true
        },
        userId: {
            type: String,
            require: true,
            index: true
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    });

UserRoleSchema.plugin(uniqueValidator); // prevent replicated unique key:  title


/**
 * @description Export the userRole mongoose Schema.
 * @export
 * @Model userRole
 */
export const dbUserRole: mongoose.Model<IUserRoleModel> = mongoose.model<IUserRoleModel>('UserRole', UserRoleSchema);

