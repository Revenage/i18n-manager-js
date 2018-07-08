// create an instance from a snapshot
import { types, flow } from 'mobx-state-tree';
import { getDocuments } from 'api';
import Document from './Document';

// create an instance from a snapshot
const Store = types
    .model({
        documents: types.array(Document),
        documentsStatus: types.string,
    })
    .actions(self => ({
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
    }));

const store = Store.create({
    documents: [],
    documentsStatus: 'pending',
});

window.store = store;

export default store;
