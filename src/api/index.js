import axios, { CancelToken } from 'axios';

const host =
    process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8000'
        : 'https://i18n-manager.herokuapp.com';

const apiHost = `${host}/api/v1`;

const instance = axios.create({
    baseURL: apiHost,
    responseType: 'json',
    headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
        // 'Access-Control-Allow-Origin': '*',
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
        console.error(e);
    }
}

async function getDocument(id) {
    try {
        const { data } = await instance.get(`/documents/${id}`, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function updateDocument(id, params) {
    try {
        const { data } = await instance.put(`/documents/${id}`, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
            params,
        });
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function removeDocumentById(id) {
    try {
        const { data } = await instance.delete(`/documents/${id}`, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function createDocumentItem(document = {}) {
    try {
        const { data } = await instance.post('/documents/', {
            ...document,
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function getUser() {
    try {
        const { data } = await instance.get('/rest-auth/user/', {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
        });
        return data;
    } catch (e) {
        console.error(e);
    }
}

async function logout() {
    try {
        await unsecureInstance.post('/rest-auth/logout/');
    } catch (e) {
        console.error(e);
    }
}

export {
    unsecureInstance,
    getDocuments,
    getUser,
    getDocument,
    updateDocument,
    removeDocumentById,
    createDocumentItem,
    logout,
};
export default instance;
