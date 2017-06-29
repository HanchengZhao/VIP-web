import { observable } from "mobx";
class AppStore {
  @observable loading = true;

  finishLoading () {
      this.loading = false
  }
}

const appStore = new AppStore();
export default appStore;