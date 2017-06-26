import { computed, observable } from "mobx";

class UserStore {
    @observable authed = false;
    @observable email = "";
    @observable displayName = "";
    @observable photoURL = "";
    @observable role = "";

    login() {
        this.authed = true;
    }

    fetchUserInfo(email, displayName, photoURL) {
        this.email = email;
        this.displayName = displayName;
        this.photoURL = photoURL;
    }

    logout() {
        this.authed = false;
        this.email = "";
        this.displayName = "";
        this.photoURL = "";
        this.role = "";
    }
}

const userStore = new UserStore();
export default userStore;