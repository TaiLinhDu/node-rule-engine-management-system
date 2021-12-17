import { dbUserRole } from "../../models/user-role.model";
import { IUserModel } from "../../models/user.model";
import { RoleNumberEnum } from "../global-object-helper/global-object"

export const checkUserRole = async (user : IUserModel, roleNumberToCheck: number ) => {
    if (roleNumberToCheck === RoleNumberEnum.Admin && user.isAdmin){
        return Promise.resolve(true);
    }

    const thisUserRoleList = await dbUserRole.find({userId: user._id});
    if (thisUserRoleList){
        return Promise.resolve(thisUserRoleList.some((userRole) => userRole.roleNumber === roleNumberToCheck));
    }

    return Promise.resolve(false);
}