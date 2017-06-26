import { computed, observable } from "mobx";

class UserStore {
    @observable authed = false;
    @observable email = "";
    @observable displayName = "";
    @observable imageURL = "";
    @observable role = "";

    login() {
        this.authed = true;
    }

    logout() {
        this.authed = false;
    }
}

const userStore = new UserStore();
export default userStore;