import { Request, Response } from 'express';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbTask, ITaskModel } from "../../models/task.model";


export const getTask = async (req: Request, res: Response) => {
    const task: ITaskModel | null = await dbTask.findById(req.query.taskid);
    sendSuccess(res, task);
};

export const createTask = async (req: Request, res: Response) => {
    const newTask: ITaskModel | null = await dbTask.create(req.body);
    sendCreated(res, newTask);
};

export const updateTask = async (req: Request, res: Response) => {
    const updateTaskById: ITaskModel | null = await dbTask.findByIdAndUpdate(req.query.taskid, req.body, {
        new: true
    });
    sendSuccess(res, updateTaskById);
};

export const deleteTask = async (req: Request, res: Response) => {
    const deleteTaskById: ITaskModel | null = await dbTask.findByIdAndDelete(req.query.taskid);
    sendSuccess(res, deleteTaskById);
};
