import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`
});

// instance.interceptors.request...
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
instance.defaults.headers.post['Content-Type'] = 'application/json';


export default instance;