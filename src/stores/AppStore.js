import { observable } from "mobx";
class AppStore {
  @observable loading = true;

  finishLoading () {
      this.loading = false
      window.loading = this.loading;
  }
}

const appStore = new AppStore();
export default appStore;