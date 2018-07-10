// create an instance from a snapshot
import { types, flow } from 'mobx-state-tree';
import { getDocuments, getUser, getDocument } from 'api';
import Document from './Document';
import User from './User';

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
                self.documents[index] = { ...document, newData };
            } else {
                self.documents.push(newData);
            }
        },
        fetchUser: flow(function* fetchUser() {
            self.user = {};
            try {
                self.user = yield getUser();
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
        afterCreate() {
            self.fetchUser();
        },
    }));

const store = Store.create({
    user: {
        username: '',
    },
    documents: [],
    documentsStatus: 'pending',
});

window.store = store;

export default store;
