export default class Chat {
  constructor(firebase, header, main, parentContainer, messages) {
    this.firebase = firebase;
    this.header = header;
    this.main = main;
    this.parentContainer = parentContainer;
    this.messages = messages;
    this.messagesKeys = Object.keys(this.messages);
  }

  createChat() {
    this.parentContainer.innerHTML = '';

    this.chatContainer = document.createElement('div');
    this.chatContainer.classList.add('chat_container', 'animation');
    this.parentContainer.appendChild(this.chatContainer);

    for (let i = 0; i < this.messagesKeys.length; i++) {
      this.firebase.readUserByID(this.messages[this.messagesKeys[i]].userID)
        .then((userData) => {
          this.chatMessageWrapper = document.createElement('div');
          this.chatMessageWrapper.classList.add('chat_message_wrapper');
          this.chatContainer.appendChild(this.chatMessageWrapper);

          this.messageContainer = document.createElement('div');
          this.messageContainer.classList.add('message_container');
          this.chatMessageWrapper.appendChild(this.messageContainer);

          this.messageImageContainer = document.createElement('div');
          this.messageImageContainer.classList.add('message_image_container');
          this.messageContainer.appendChild(this.messageImageContainer);

          this.messageImage = document.createElement('img');
          this.messageImage.classList.add('message_image');
          this.messageImage.src = userData.avatarURL;
          this.messageImageContainer.appendChild(this.messageImage);

          this.messageContainerForTextAndDate = document.createElement('div');
          this.messageContainerForTextAndDate.classList.add('message_container_for_text_and_date');
          this.messageContainer.appendChild(this.messageContainerForTextAndDate);

          this.textOfMessage = document.createElement('div');
          this.textOfMessage.classList.add('message_container_for_text');
          this.textOfMessage.innerText = this.messages[this.messagesKeys[i]].message;

          this.messageContainerForTextAndDate.appendChild(this.textOfMessage);

          this.date = document.createElement('div');
          this.date.classList.add('message_container_for_date');
          this.date.innerText = '22.01.2021 | 19:22';
          this.messageContainerForTextAndDate.appendChild(this.date);
        });
    }
    this.inputMessageContainer = document.createElement('div');
    this.inputMessageContainer.classList.add('input_message_container');
    this.chatContainer.appendChild(this.inputMessageContainer);

    this.messageTextarea = document.createElement('textarea');
    this.messageTextarea.classList.add('message_textarea');
    this.inputMessageContainer.appendChild(this.messageTextarea);

    this.sendButton = document.createElement('div');
    this.sendButton.classList.add('send_container');
    this.inputMessageContainer.appendChild(this.sendButton);

    this.sendIcon = document.createElement('img');
    this.sendIcon.src = './assets/images/send.png';
    this.sendIcon.classList.add('send_icon');
    this.sendButton.appendChild(this.sendIcon);
  }
}
