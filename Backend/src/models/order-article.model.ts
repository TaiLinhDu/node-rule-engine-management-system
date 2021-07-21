import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for orderArticle.
 * @export
 * @interface IOrderArticleModel
 * @extends {mongoose.Document}
 */
export interface IOrderArticleModel extends mongoose.Document {
    articleId: string;
    orderId: string;
    numberOfArticle: number;
}

/**
 * @description Schema of orderArticle for mongoose.
 * @export
 * @Schema OrderArticleSchema
 */
export const OrderArticleSchema: mongoose.Schema = new mongoose.Schema({

        articleId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        orderId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        numberOfArticle: {
            type: Number,
            require: true,
            default: 0
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    });

OrderArticleSchema.plugin(uniqueValidator); // prevent replicated unique key:  title


/**
 * @description Export the orderArticle mongoose Schema.
 * @export
 * @Model orderArticle
 */
export const dbOrderArticle: mongoose.Model<IOrderArticleModel> = mongoose.model<IOrderArticleModel>('OrderArticle', OrderArticleSchema);

