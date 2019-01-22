import { observable } from 'mobx';

class User {
    constructor(props) {
        Object.assign(this, props);
    }
    @observable username;
}

export default User;
