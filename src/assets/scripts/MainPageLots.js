export default class MainPageLots {
  constructor(firebase) {
    this.firebase = firebase;
    this.lotsContainer = document.querySelector('.lots_container');
  }

  createMainPageLots() {
    this.firebase.readLots()
      .then((data) => {
        // eslint-disable-next-line no-console
        console.log(data);
      });
  }
}
