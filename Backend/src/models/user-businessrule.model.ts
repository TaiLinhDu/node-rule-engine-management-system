import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for userBusinessrule.
 * @export
 * @interface IUserBusinessruleModel
 * @extends {mongoose.Document}
 */
export interface IUserBusinessruleModel extends mongoose.Document {
    businessRuleId: string;
    userId: string;
}

/**
 * @description Schema of userBusinessrule for mongoose.
 * @export
 * @Schema UserBusinessruleSchema
 */
export const UserBusinessruleSchema: mongoose.Schema = new mongoose.Schema({

        businessruleId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    });

//UserBusinessruleSchema.plugin(uniqueValidator); // prevent replicated unique key:  title


/**
 * @description Export the userBusinessrule mongoose Schema.
 * @export
 * @Model userBusinessrule
 */
export const dbUserBusinessrule: mongoose.Model<IUserBusinessruleModel> = mongoose.model<IUserBusinessruleModel>('UserBusinessrule', UserBusinessruleSchema);

