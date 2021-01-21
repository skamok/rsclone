/* eslint-disable no-console */
export default class MessagesSection {
  constructor(firebase, parentContainer, main, header) {
    this.firebase = firebase;
    this.parentContainer = parentContainer;
    this.main = main;
    this.header = header;
  }

  createMessagesSection() {
    this.parentContainer.innerHTML = '';
    this.firebase.readCurrentUserChats()
      .then((data) => {
        console.log(data);

        this.messagesContainer = document.createElement('div');
        this.messagesContainer.classList.add('messages_container', 'animation');
        this.parentContainer.appendChild(this.messagesContainer);

        for (let i = 0; i < data.length; i++) {
          this.separateMessageBlock = document.createElement('div');
          this.separateMessageBlock.classList.add('separate_message');
          this.messagesContainer.appendChild(this.separateMessageBlock);
        }
      });
  }
}
