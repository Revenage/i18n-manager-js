import axios, { CancelToken } from 'axios';

const host = 'https://i18n-manager.herokuapp.com';
const apiHost = `${host}/api/v1/rest-auth`;

const instance = axios.create({
    baseURL: apiHost,
    responseType: 'json',
    // cancelToken: new CancelToken(function(cancel) {
    //     console.warn('axios request was manualy closed ');
    // }),
});

const token = localStorage.getItem('token');
instance.defaults.headers.common['Authorization'] = token;

const unsecureInstance = axios.create({
    baseURL: apiHost,
    responseType: 'json',
    // cancelToken: new CancelToken(function(cancel) {
    //     console.warn('axios request was manualy closed ');
    // }),
});

export { unsecureInstance };
export default instance;
