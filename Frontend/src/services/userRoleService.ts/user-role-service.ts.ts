import axios from 'axios-backend';
import { IUserRole } from '../../models/user-role.model';

export const userRoleService = {

    postNewUserRole: (newUserRole: IUserRole) => {
        return axios.post("/userrole", newUserRole);
    },
    getUserRoles: (params: any = {}) => {
        return axios.get(`/userrole`, { params: params });
    },
    updateUserRole: (userRoleId: string, updatedUserRole: IUserRole) => {
        return axios.put(`/userrole?userroleid=${userRoleId}`, updatedUserRole);
    },
    deleteUserRole: (userRoleId: string) => {
        return axios.delete(`/userrole?userroleid=${userRoleId}`);
    }
}