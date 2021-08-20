import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for order.
 * @export
 * @interface IOrderModel
 * @extends {mongoose.Document}
 */
export interface IOrderModel extends mongoose.Document {
    price: Number;
    oderDate: Date;
    status: Number; // 1 order 2// unterwegs 3//zugestellt
}

/**
 * @description Schema of order for mongoose.
 * @export
 * @Schema OrderSchema
 */
export const OrderSchema: mongoose.Schema = new mongoose.Schema({

        oderDate: {
            type: Date,
            required: true,
            unique: false,
        },
        price: {
            type: Number,
            require: true,
            default: ''
        },
        status:  {
            type: Number,
            require: true,
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

