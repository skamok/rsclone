export default class ChatSeparate {
  constructor(firebase, header, main, parentContainer, chat) {
    this.firebase = firebase;
    this.header = header;
    this.main = main;
    this.parentContainer = parentContainer;
    this.chat = chat;
    this.messages = chat.messages;
    this.messagesKeys = Object.keys(this.messages);
    this.users = [];
  }

  createChat() {
    this.parentContainer.innerHTML = '';

    this.chatContainer = document.createElement('div');
    this.chatContainer.classList.add('chat_container', 'animation');
    this.parentContainer.appendChild(this.chatContainer);
    this.firebase.readUserByID(this.chat.userFirst)
      .then((user) => {
        this.users.push(user);
        return this.firebase.readUserByID(this.chat.userSecond);
      })
      .then((user) => {
        this.users.push(user);
        this.firebase.readMessagesContinues(this.chat.chatID, this.reloadMessages);
      });

    this.inputMessageContainer = document.createElement('div');
    this.inputMessageContainer.classList.add('input_message_container');
    this.chatContainer.appendChild(this.inputMessageContainer);

    this.messageTextarea = document.createElement('textarea');
    this.messageTextarea.classList.add('message_textarea');
    this.inputMessageContainer.appendChild(this.messageTextarea);

    this.sendButton = document.createElement('div');
    this.sendButton.classList.add('send_container');
    this.inputMessageContainer.appendChild(this.sendButton);
    this.sendButton.addEventListener('click', this.sendButtonClick);

    this.sendIcon = document.createElement('img');
    this.sendIcon.src = './assets/images/send.png';
    this.sendIcon.classList.add('send_icon');
    this.sendButton.appendChild(this.sendIcon);
  }

  sendButtonClick = (event) => {
    event.preventDefault();
    if (this.messageTextarea.value !== '') {
      this.firebase.sendMessage(this.chat, this.messageTextarea.value);
    }
  }

  reloadMessages = (dataSnapshot) => {
    const messageObj = dataSnapshot.val();
    if ((messageObj !== undefined) && (messageObj !== null)) {
      const userInfo = this.whosMessage(messageObj.userID);
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
      this.messageImage.src = userInfo.avatarURL;
      this.messageImageContainer.appendChild(this.messageImage);

      this.messageContainerForTextAndDate = document.createElement('div');
      this.messageContainerForTextAndDate.classList.add('message_container_for_text_and_date');
      this.messageContainer.appendChild(this.messageContainerForTextAndDate);

      this.textOfMessage = document.createElement('div');
      this.textOfMessage.classList.add('message_container_for_text');
      this.textOfMessage.innerText = messageObj.message;

      this.messageContainerForTextAndDate.appendChild(this.textOfMessage);

      this.date = document.createElement('div');
      this.date.classList.add('message_container_for_date');
      this.date.innerText = messageObj.dtCreate;
      this.messageContainerForTextAndDate.appendChild(this.date);
    }
  }

  whosMessage(userID) {
    return this.users.find((user) => user.userID === userID);
  }
}
