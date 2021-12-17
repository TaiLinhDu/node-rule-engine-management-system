import { Request, Response } from 'express';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbRole, IRoleModel } from "../../models/role.model";

import { checkJwt } from '../../helpers/json-web-token/json-web-token-helper';
import { sendForbidden, sendUnauthorized } from '../../helpers/request-response-helper/response-status';


export const getRole = async (req: Request, res: Response) => {
    const role = await dbRole.find(req.query);
    sendSuccess(res, role);
};

export const createRole = async (req: Request, res: Response) => {
    const checkedUser = checkJwt(req.body.token);
    if (checkedUser ){
        if (checkedUser.isAdmin) {
            const newRole: IRoleModel | null = await dbRole.create(req.body);
            sendCreated(res, newRole);
        }
        else {
            sendForbidden(res, "just admin is allowed to do this action")
        }
    } else {
        sendUnauthorized(res, "please log in to to this action")
    }
};

export const updateRole = async (req: Request, res: Response) => {

    const checkedUser = checkJwt(req.body.token);
    if (checkedUser){
        if (checkedUser.isAdmin) {
            const updateRoleById: IRoleModel | null = await dbRole.findByIdAndUpdate(req.query.roleid, req.body, {
                new: true
            });
            sendSuccess(res, updateRoleById);
        } else {
            sendForbidden(res, "just admin is allowed to do this action")
        }
    } else {
        sendUnauthorized(res, "please log in to to this action")
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    const checkedUser = checkJwt(req.body.token);
    if (checkedUser){
        if (checkedUser.isAdmin) {
            const deleteRoleById: IRoleModel | null = await dbRole.findByIdAndDelete(req.query.roleid);
            sendSuccess(res, deleteRoleById);
        } else {
            sendForbidden(res, "just admin is allowed to do this action")
        }
    } else {
        sendUnauthorized(res, "please log in to to this action")
    }
};
