import {observable } from "mobx";
class PeerReviewStore {
  @observable EditMode = true;

  @observable Answers = {};

  switchEditMode () {
    this.EditMode = !this.EditMode;
  }
}


const peerReviewStore = new PeerReviewStore();
export default peerReviewStore;