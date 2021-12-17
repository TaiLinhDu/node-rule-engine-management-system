import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for role.
 * @export
 * @interface IRoleModel
 * @extends {mongoose.Document}
 */
export interface IRoleModel extends mongoose.Document {
    roleNumber: number;
    name: string;
    description: string;
}

/**
 * @description Schema of role for mongoose.
 * @export
 * @Schema RoleSchema
 */
export const RoleSchema: mongoose.Schema = new mongoose.Schema({

        roleNumber: {
            type: Number,
            required: true,
            unique: true,
            index: true
        },
        name: {
            type: String,
            require: true,
            default: ''
        },
        description: {
            type: String,
            require: true,
            default: ''
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    });

RoleSchema.plugin(uniqueValidator); // prevent replicated unique key:  title


/**
 * @description Export the role mongoose Schema.
 * @export
 * @Model role
 */
export const dbRole: mongoose.Model<IRoleModel> = mongoose.model<IRoleModel>('Role', RoleSchema);

