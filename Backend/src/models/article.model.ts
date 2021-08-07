import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for article.
 * @export
 * @interface IArticleModel
 * @extends {mongoose.Document}
 */
export interface IArticleModel extends mongoose.Document {
    name: string;
    description: string;
    price: Number;
    numberOfArticle: number;
}

/**
 * @description Schema of article for mongoose.
 * @export
 * @Schema ArticleSchema
 */
export const ArticleSchema: mongoose.Schema = new mongoose.Schema({

        name: {
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

        price: {
            type: Number,
            require: true,
            default: ''
        },

        numberOfArticle: {
            type: Number,
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

ArticleSchema.plugin(uniqueValidator); // prevent replicated unique key:  title


/**
 * @description Export the article mongoose Schema.
 * @export
 * @Model article
 */
export const dbArticle: mongoose.Model<IArticleModel> = mongoose.model<IArticleModel>('Article', ArticleSchema);

