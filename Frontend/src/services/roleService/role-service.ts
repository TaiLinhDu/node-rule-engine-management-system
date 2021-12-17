import axios from 'axios-backend';
import { IRole } from '../../models/role.model';

export const roleService = {

    postNewRole: (newRole: IRole) => {
        return axios.post("/role", newRole);
    },
    getRoles: (params: any = {}) => {
        return axios.get(`/role`, { params: params });
    },
    updateRole: (roleId: string, updatedRole: IRole) => {
        return axios.put(`/role?roleid=${roleId}`, updatedRole);
    },
    deleteRole: (roleId: string) => {
        return axios.delete(`/role?roleid=${roleId}`);
    }
}