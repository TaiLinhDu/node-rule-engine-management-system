import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for businessrule.
 * @export
 * @interface IBusinessruleModel
 * @extends {mongoose.Document}
 */
export interface IBusinessruleModel extends mongoose.Document {
    name: string;
    description: string;
    rules: string;
}

/**
 * @description Schema of businessrule for mongoose.
 * @export
 * @Schema BusinessruleSchema
 */
export const BusinessruleSchema: mongoose.Schema = new mongoose.Schema({

        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        rules: {
            type: String,
            require: true,
            default: ""
        },

        description: {
            type: String,
            require: false,
            default: ""
        },

    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    });

BusinessruleSchema.plugin(uniqueValidator); // prevent replicated unique key:  title


/**
 * @description Export the businessrule mongoose Schema.
 * @export
 * @Model businessrule
 */
export const dbBusinessrule: mongoose.Model<IBusinessruleModel> = mongoose.model<IBusinessruleModel>('Businessrule', BusinessruleSchema);

