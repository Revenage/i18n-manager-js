import {
    getDocuments,
    getDocument,
    updateDocument,
    getUser,
    removeDocumentById,
    createDocumentItem,
    logout,
} from 'api';
import User from './User';
import { observable, action, ObservableMap, toJS } from 'mobx';

const emptytext = 'Empty document ';

class Store {
    constructor() {
        if (localStorage.getItem('token')) {
            this.fetchUser();
        }
    }

    @observable user = new User();
    @observable documents = new ObservableMap();
    @observable documentsStatus = 'pending';

    @action updateDocument = async (id, props) => {
        const document = this.getDocumentByID(id);
        // const { data, ...newData } = props; // data: null
        if (document) {
            const mergedDocument = {
                ...document,
                ...props,
            };
            const newDocument = await updateDocument(_id, mergedDocument);
            this.documents.set(id, newDocument);
            return newDocument;
        }
    };

    @action fetchUser = async () => {
        // this.user = {};
        try {
            const user = await getUser();
            console.log('user', user);

            if (user) {
                this.updateUser(user);
            } else {
                throw new Error('user is undefined');
            }
        } catch (error) {
            console.error('Failed to fetch user', error);
            localStorage.removeItem('token');
            window.location = '/login';
        }
    };

    @action updateUser = props => {
        this.user = new User({ ...this.user, ...props });
    };

    @action fetchDocuments = async () => {
        this.documentsStatus = 'pending';
        try {
            const documents = await getDocuments();
            documents.forEach(d => {
                this.documents.set(d.id, d);
            });
            this.documentsStatus = 'done';
        } catch (error) {
            console.error('Failed to fetch documents', error);
            this.documentsStatus = 'error';
        }
    };
    @action fetchDocument = async id => {
        try {
            const newDocument = await getDocument(id);
            this.documents.set(+id, newDocument);
            return newDocument;
        } catch (error) {
            console.error('Failed to fetch documents', error);
        }
    };
    @action removeDocument = async id => {
        try {
            await removeDocumentById(id);
            this.documents.delete(id);
        } catch (error) {
            console.error('Failed to remove document', error);
        }
    };
    @action createDocument = async ({ name, description } = {}) => {
        try {
            const { length } = this.documents;
            // const lastNum = this.documents.filter(({name}) => name.includes(emptytext)).reduce((acc, {name}) => {name}, 0);
            const document = await createDocumentItem({
                name: name || `${emptytext}${length ? length + 1 : ''}`,
                description: description || 'please fill the document',
            });
            this.documents.set(document.id, document);
        } catch (error) {
            console.error('Failed to remove document', error);
        }
    };

    @action logout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            window.location = '/login';
        } catch (error) {
            console.error('Failed to log out user', error);
        }
    };

    getDocumentByID = id => {
        return this.documents.get(+id) || null;
    };
}

const store = new Store();
window.store = toJS(store);

export default store;
