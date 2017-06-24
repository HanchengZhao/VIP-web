import { computed, observable } from "mobx";

class UserStore {
    @observable authed = false;
    @observable email = "";

    login() {
        this.authed = true;
    }

    logout() {
        this.authed = false;
    }
}

const userStore = new UserStore();
export default userStore;