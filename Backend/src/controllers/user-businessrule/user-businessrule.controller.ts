import { Request, Response } from 'express';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbUserBusinessrule, IUserBusinessruleModel } from "../../models/user-businessrule.model";

import * as jwt from 'jsonwebtoken';
import config from 'config';
// secret key use to create token
const myJWTSecretKey = config.get<string>('jwt.secret-key');


export const getUserBusinessrule = async (req: Request, res: Response) => {
    const userBusinessrule: IUserBusinessruleModel[] = await dbUserBusinessrule.find(req.query);
    sendSuccess(res, userBusinessrule);
};

export const createUserBusinessrule = async (req: Request, res: Response) => {
    const newUserBusinessrule: IUserBusinessruleModel | null = await dbUserBusinessrule.create(req.body);
    sendCreated(res, newUserBusinessrule);
};

export const updateUserBusinessrule = async (req: Request, res: Response) => {
    const updateUserBusinessruleById: IUserBusinessruleModel | null = await dbUserBusinessrule.findByIdAndUpdate(req.query.userbusinessruleid, req.body, {
        new: true
    });
    sendSuccess(res, updateUserBusinessruleById);
};

export const deleteUserBusinessrule = async (req: Request, res: Response) => {
    const deleteUserBusinessruleById: IUserBusinessruleModel | null = await dbUserBusinessrule.findByIdAndDelete(req.query.userbusinessruleid);
    sendSuccess(res, deleteUserBusinessruleById);
};
