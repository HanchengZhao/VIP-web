import {observable } from "mobx";
class PeerReviewStore {
  @observable EditMode = false;
}
const peerReviewStore = new PeerReviewStore();
export default peerReviewStore;