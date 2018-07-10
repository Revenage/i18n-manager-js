import { types } from 'mobx-state-tree';

export default types.model({
    // pk: types.number,
    username: types.maybe(types.string),
    // owner: types.number,
    // created_date: types.maybe(types.string),
    // published_date: types.maybe(types.string),
    // data: types.maybe(types.strin),
});
