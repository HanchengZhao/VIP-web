import {observable } from "mobx";
class PeerReviewStore {
  @observable EditMode = true;
}
const peerReviewStore = new PeerReviewStore();
export default peerReviewStore;