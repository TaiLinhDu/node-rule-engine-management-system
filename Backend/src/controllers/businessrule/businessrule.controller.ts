import { Request, Response } from 'express';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbBusinessrule, IBusinessruleModel } from "../../models/businessrule.model";

import * as jwt from 'jsonwebtoken';
import config from 'config';
import { sendBadRequest, sendUnprocessable } from '../../helpers/request-response-helper/response-status';
// secret key use to create token
const myJWTSecretKey = config.get<string>('jwt.secret-key');


export const getBusinessrule = async (req: Request, res: Response) => {
    const businessrule: IBusinessruleModel[] = await dbBusinessrule.find(req.query);
    sendSuccess(res, businessrule);
};

export const createBusinessrule = async (req: Request, res: Response) => {
    const newBusinessrule: IBusinessruleModel | null = await dbBusinessrule.create(req.body);
    sendCreated(res, newBusinessrule);
};

export const updateBusinessrule = async (req: Request, res: Response) => {
    const updateBusinessruleById: IBusinessruleModel | null = await dbBusinessrule.findByIdAndUpdate(req.query.businessruleid, req.body, {
        new: true
    });
    sendSuccess(res, updateBusinessruleById);
};

export const deleteBusinessrule = async (req: Request, res: Response) => {
    const deleteBusinessruleById: IBusinessruleModel | null = await dbBusinessrule.findByIdAndDelete(req.query.businessruleid);
    sendSuccess(res, deleteBusinessruleById);
};

// export const getBusinessruleAsJson = async (req: Request, res: Response) => {
//     const businessrule: IBusinessruleModel | null = await dbBusinessrule.findById(req.query.businessruleid);
    
//     res.setHeader('Content-disposition', `attachment; filename=${businessrule?.name}.json`);
//     res.set('Content-Type', 'text/json');
//     res.send(businessrule?.rules);
// };

interface MulterRequest extends Request {
    file: any;
}

export const updateBusinessruleFromJsonFile = async (req: MulterRequest, res: Response) => {
    // console.log(req)
    console.log(req.file)
    //console.log(req.body)
    let newBusinessRule: string;
    if (req.file){

        newBusinessRule = req.file.buffer.toString();

        const updateBusinessruleById: IBusinessruleModel | null = await dbBusinessrule.findByIdAndUpdate(req.query.businessruleid, {rules: newBusinessRule}, {
            new: true
        });
        sendSuccess(res, updateBusinessruleById);
    } else {
        sendBadRequest(res, "invalied json file uploaded");
    }


};