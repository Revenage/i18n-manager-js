import { observable } from 'mobx';
// import Dictionary from './Dictionaries';

class Document {
    @observable id;
    @observable name;
    @observable owner;
    @observable created_date;
    @observable published_date;
    @observable description;
    @observable data;
}

export default Document;
