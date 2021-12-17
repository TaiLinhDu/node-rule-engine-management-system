import axios from 'axios-backend';
import { IUserBusinessrule } from '../../models/user-businessrule.model';

export const userBusinessruleService = {

    postNewUserBusinessrule: (newUserBusinessrule: IUserBusinessrule) => {
        return axios.post("/userbusinessrule", newUserBusinessrule);
    },
    getUserBusinessrules: (params: any = {}) => {
        return axios.get(`/userbusinessrule`, { params: params });
    },
    updateUserBusinessrule: (userBusinessruleId: string, updatedUserBusinessrule: IUserBusinessrule) => {
        return axios.put(`/userbusinessrule?userbusinessruleid=${userBusinessruleId}`, updatedUserBusinessrule);
    },
    deleteUserBusinessrule: (userBusinessruleId: string) => {
        return axios.delete(`/userbusinessrule?userbusinessruleid=${userBusinessruleId}`);
    }
}