import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


/**
 * @description interface for task.
 * @export
 * @interface ITaskModel
 * @extends {mongoose.Document}
 */
export interface ITaskModel extends mongoose.Document {
    title: string;
    description: string;
    solution: string;
    finish: boolean;
}

/**
 * @description Schema of task for mongoose.
 * @export
 * @Schema TaskSchema
 */
export const TaskSchema: mongoose.Schema = new mongoose.Schema({

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

TaskSchema.plugin(uniqueValidator); // prevent replicated unique key:  title


/**
 * @description Export the task mongoose Schema.
 * @export
 * @Model task
 */
export const dbTask: mongoose.Model<ITaskModel> = mongoose.model<ITaskModel>('Task', TaskSchema);

