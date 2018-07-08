import axios, { CancelToken } from 'axios';

const host = 'http://127.0.0.1:8000';
// const host = 'https://i18n-manager.herokuapp.com';
const apiHost = `${host}/api/v1`;

const instance = axios.create({
    baseURL: apiHost,
    responseType: 'json',
    headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
    },
    // headers: {
    //     // 'Access-Control-Allow-Origin': '*',
    // },
    // cancelToken: new CancelToken(function(cancel) {
    //     console.warn('axios request was manualy closed ');
    // }),
});

// const token = localStorage.getItem('token');
// instance.defaults.headers.common['Authorization'] = token;

const unsecureInstance = axios.create({
    baseURL: apiHost,
    responseType: 'json',
    // cancelToken: new CancelToken(function(cancel) {
    //     console.warn('axios request was manualy closed ');
    // }),
});

async function getDocuments() {
    try {
        const { data } = await instance.get('/documents/', {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (e) {
        console.error(e); // 💩
    }
}

export { unsecureInstance, getDocuments };
export default instance;