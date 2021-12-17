import { Request, Response } from 'express';
import { checkJwt } from '../../helpers/json-web-token/json-web-token-helper';
import { sendForbidden, sendUnauthorized } from '../../helpers/request-response-helper/response-status';
import { sendSuccess, sendCreated } from "../../helpers/response.helper";
import { dbUserRole, IUserRoleModel } from "../../models/user-role.model";
import { RoleNumberEnum } from "../../helpers/global-object-helper/global-object";
import { checkUserRole } from "../../helpers/check-userrole/check-userrole"

export const getUserRole = async (req: Request, res: Response) => {
    const checkedUser = checkJwt(req.body.token);
    if (checkedUser){
        if ( (await checkUserRole(checkedUser, RoleNumberEnum.Admin))
            || (req.query.userId && req.query.userId === checkedUser._id)) 
        {
            const userRole = await dbUserRole.find(req.query);
            sendSuccess(res, userRole);
        } else {
            sendForbidden(res, "your account has no right for this action")
        }
    } else {
        sendUnauthorized(res, "please log in to to this action")
    }
};

export const createUserRole = async (req: Request, res: Response) => {
    const checkedUser = checkJwt(req.body.token);
    if (checkedUser ){
        if (await checkUserRole(checkedUser, RoleNumberEnum.Admin)) {
            const newUserRole: IUserRoleModel | null = await dbUserRole.create(req.body);
            sendCreated(res, newUserRole);
        }
        else {
            sendForbidden(res, "just admin is allowed to do this action")
        }
    } else {
        sendUnauthorized(res, "please log in to to this action")
    }
};

export const updateUserRole = async (req: Request, res: Response) => {
    const checkedUser = checkJwt(req.body.token);
    if (checkedUser ){
        if (await checkUserRole(checkedUser, RoleNumberEnum.Admin)) {
            const updateUserRoleById: IUserRoleModel | null = await dbUserRole.findByIdAndUpdate(req.query.userroleid, req.body, {
                new: true
            });
            sendSuccess(res, updateUserRoleById);
        }
        else {
            sendForbidden(res, "just admin is allowed to do this action")
        }
    } else {
        sendUnauthorized(res, "please log in to to this action")
    }
};

export const deleteUserRole = async (req: Request, res: Response) => {
    const checkedUser = checkJwt(req.body.token);
    if (checkedUser ){
        if (await checkUserRole(checkedUser, RoleNumberEnum.Admin)){
            const deleteUserRoleById: IUserRoleModel | null = await dbUserRole.findByIdAndDelete(req.query.userroleid);
            sendSuccess(res, deleteUserRoleById);
        }
        else {
            sendForbidden(res, "just admin is allowed to do this action")
        }
    } else {
        sendUnauthorized(res, "please log in to to this action")
    }
};
