export default class MessagesSection {
  constructor(firebase, parentContainer, main, header) {
    this.firebase = firebase;
    this.parentContainer = parentContainer;
    this.main = main;
    this.header = header;
  }

  createMessagesSection() {
    this.parentContainer.innerHTML = '';
    this.firebase.readCurrentUser()
      .then((data) => {
        console.log(data);
      });
  }
}
