import axios from 'axios-backend';
import { IBusinessrule } from '../../models/businessrule.model';

export const businessruleService = {

    postNewBusinessrule: (newBusinessrule: IBusinessrule) => {
        return axios.post("/businessrule", newBusinessrule);
    },
    getBusinessrules: (params: any = {}) => {
        return axios.get(`/businessrule`, { params: params });
    },
    updateBusinessrule: (businessruleId: string, updatedBusinessrule: IBusinessrule) => {
        return axios.put(`/businessrule/?businessruleid=${businessruleId}`, updatedBusinessrule);
    },
    deleteBusinessrule: (businessruleId: string) => {
        return axios.delete(`/businessrule/?businessruleid=${businessruleId}`);
    },
    getBusinessrulesAsJson: (params: any = {}) => {
        return axios.get(`businessrule/jsonfile/`, { params: params });
    },
    updateBusinessruleFromJson: (businessruleId: string, file: File) => {
        const formData = new FormData();
        formData.append('jsonfile', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.put(`/businessrule/jsonfile?businessruleid=${businessruleId}`, formData, config);
    },
}