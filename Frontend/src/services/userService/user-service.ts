import axios from 'axios-backend';
import { IUser } from '../../models/user.model';

export const userService = {

    postNewUser: (newUser: IUser) => {
        return axios.post("/user", newUser);
    },
    getUsers: (params: any = {}) => {
        return axios.get(`/user`, { params: params });
    },
    updateUser: (userId: string, updatedUser: IUser) => {
        return axios.put(`/user/${userId}`, updatedUser);
    },
    deleteUser: (userId: string) => {
        return axios.delete(`/user/${userId}`);
    }
}