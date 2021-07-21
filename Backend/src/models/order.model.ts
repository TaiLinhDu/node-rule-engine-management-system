import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for order.
 * @export
 * @interface IOrderModel
 * @extends {mongoose.Document}
 */
export interface IOrderModel extends mongoose.Document {
    title: string;
    description: string;
    solution: string;
    finish: boolean;
}

/**
 * @description Schema of order for mongoose.
 * @export
 * @Schema OrderSchema
 */
export const OrderSchema: mongoose.Schema = new mongoose.Schema({

        title: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        description: {
            type: String,
            require: true,
            default: ''
        },
        solution: {
            type: String,
            require: true,
            default: ''
        },
        finish:  {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    });

OrderSchema.plugin(uniqueValidator); // prevent replicated unique key:  title


/**
 * @description Export the order mongoose Schema.
 * @export
 * @Model order
 */
export const dbOrder: mongoose.Model<IOrderModel> = mongoose.model<IOrderModel>('Order', OrderSchema);

