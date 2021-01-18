export default class TakenLotsList {
  constructor(firebase, lotsContainer, header, main) {
    this.firebase = firebase;
    this.lotsContainer = lotsContainer;
    this.main = main;
    this.header = header;
  }

  createTakenList() {
    this.lotsContainer.innerHTML = '';
  }
}
