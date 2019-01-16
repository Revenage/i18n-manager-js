// create an instance from a snapshot
import { types, flow } from 'mobx-state-tree';
import {
    getDocuments,
    getDocument,
    getUser,
    removeDocumentById,
    createDocumentItem,
} from 'api';
import Document from './Document';
import User from './User';

const emptytext = 'Empty document ';

// create an instance from a snapshot
const Store = types
    .model({
        user: User,
        documents: types.array(Document),
        documentsStatus: types.string,
    })
    .actions(self => ({
        updateDocument(_id, props) {
            const index = self.documents.findIndex(({ id }) => id === _id);
            const { data, ...newData } = props; // data: null
            if (index !== -1) {
                const document = self.documents[index];
                self.documents[index] = document;
            } else {
                self.documents.push(newData);
            }
        },
        fetchUser: flow(function* fetchUser() {
            // self.user = {};
            try {
                const user = yield getUser();
                if (user) {
                    self.user = user;
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        }),
        fetchDocuments: flow(function* fetchDocuments() {
            self.documents = [];
            self.documentsStatus = 'pending';
            try {
                self.documents = yield getDocuments();
                self.documentsStatus = 'done';
            } catch (error) {
                console.error('Failed to fetch documents', error);
                self.documentsStatus = 'error';
            }
        }),
        fetchDocument: flow(function* fetchDocument(id) {
            try {
                const newDocument = yield getDocument(id);
                self.updateDocument(id, newDocument);
            } catch (error) {
                console.error('Failed to fetch documents', error);
            }
        }),
        removeDocument: flow(function* removeDocument(id) {
            try {
                yield removeDocumentById(id);
                const document = self.getDocumentByID(id);
                self.documents.remove(document);
            } catch (error) {
                console.error('Failed to remove document', error);
            }
        }),
        createDocument: flow(function* createDocument({
            name,
            description,
        } = {}) {
            try {
                const { length } = self.documents;
                // const lastNum = self.documents.filter(({name}) => name.includes(emptytext)).reduce((acc, {name}) => {name}, 0);
                const document = yield createDocumentItem({
                    name: name || `${emptytext}${length ? length + 1 : ''}`,
                    description: description || 'please fill the document',
                });
                self.documents.push(document);
            } catch (error) {
                console.error('Failed to remove document', error);
            }
        }),
        afterCreate() {
            if (localStorage.getItem('token')) {
                self.fetchUser();
            }
        },
    }))
    .views(self => ({
        getDocumentByID(documentId) {
            return self.documents.find(({ id }) => id === +documentId) || null;
        },
    }));

const store = Store.create({
    user: {
        username: null,
    },
    documents: [],
    documentsStatus: 'pending',
});

window.store = store;

export default store;
