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
    console.log(this.messages);

    this.chatContainer = document.createElement('div');
    this.chatContainer.classList.add('chat_container', 'animation');
    this.parentContainer.appendChild(this.chatContainer);

    for (let i = 0; i < this.messagesKeys.length; i++) {
      this.firebase.readUserByID(this.messages[this.messagesKeys[i]].userID)
        .then((userData) => {
          console.log(userData);

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
          //   this.textOfMessage.innerText = this.messages[this.messagesKeys[i]].message;
          // eslint-disable-next-line max-len
          this.textOfMessage.innerText = 'Lore ipsum dolor sit amet consectetur adipisicing elit. Cupiditate provident, aut quia tenetur repudiandae laudantium recusandae asperiores vitae facilis explicabo, perferendis alias non? In, magnam ratione reprehenderit modi cupiditate impedit! Lore ipsum dolor sit amet consectetur adipisicing elit. Cupiditate provident, aut quia tenetur repudiandae laudantium recusandae asperiores vitae facilis explicabo, perferendis alias non? In, magnam ratione reprehenderit modi cupiditate impedit!Lore ipsum dolor sit amet consectetur adipisicing elit. Cupiditate provident, aut quia tenetur repudiandae laudantium recusandae asperiores vitae facilis explicabo, perferendis alias non? In, magnam ratione reprehenderit modi cupiditate impedit!';

          this.messageContainerForTextAndDate.appendChild(this.textOfMessage);

          this.date = document.createElement('div');
          this.date.classList.add('message_container_for_date');
          this.date.innerText = '22.01.2021 | 19:22';
          this.messageContainerForTextAndDate.appendChild(this.date);
        });
    }
  }
}
