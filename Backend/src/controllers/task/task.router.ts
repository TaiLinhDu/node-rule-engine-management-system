import express from 'express';
import { timelog } from "../../middlewares/timelogger.middleware";
import { wrapAsync } from "../../middlewares/errorhandler.middleware";
import { createTask, getTask, updateTask, deleteTask } from "./task.controller";

export const taskRouter: express.Router = express.Router();

// get a Task
taskRouter.get('/getTask', timelog, wrapAsync(getTask));

// create new Task
taskRouter.post( '/createTask', timelog, wrapAsync(createTask));

// create update Task
taskRouter.put( '/updateTask', timelog, wrapAsync(updateTask));

// delete Task
taskRouter.delete( '/deleteTask', timelog, wrapAsync(deleteTask));
