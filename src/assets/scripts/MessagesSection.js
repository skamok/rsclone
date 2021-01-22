import ChatSeparate from './ChatSeparate.js';

/* eslint-disable no-console */
export default class MessagesSection {
  constructor(firebase, parentContainer, main, header) {
    this.firebase = firebase;
    this.parentContainer = parentContainer;
    this.main = main;
    this.header = header;
    this.lotsDataArray = [];
    this.lots = [];
  }

  createMessagesSection() {
    this.parentContainer.innerHTML = '';
    this.firebase.readLots()
      .then((allLots) => {
        this.firebase.readCurrentUserChats()
          .then((messagesData) => {
            this.messagesContainer = document.createElement('div');
            this.messagesContainer.classList.add('messages_container', 'animation');
            this.parentContainer.appendChild(this.messagesContainer);

            for (let i = 0; i < messagesData.length; i++) {
              this.separateMessageBlock = document.createElement('div');
              this.separateMessageBlock.classList.add('separate_message');
              this.messagesContainer.appendChild(this.separateMessageBlock);
              this.separateMessageBlock.addEventListener('click', () => {
                const chat = new ChatSeparate(this.firebase, this.header, this.main, this.parentContainer,
                  messagesData[i]);
                chat.createChat();
              });

              this.lotDescription = document.createElement('div');
              this.lotDescription.classList.add('lot_description_block');
              this.separateMessageBlock.appendChild(this.lotDescription);

              this.message = document.createElement('div');
              this.message.classList.add('message_text_container');
              this.separateMessageBlock.appendChild(this.message);

              this.messageDate = document.createElement('div');
              this.messageDate.classList.add('message_date');
              this.separateMessageBlock.appendChild(this.messageDate);

              this.lotDescriptionTitle = document.createElement('div');
              this.lotDescriptionTitle.classList.add('lot_description_title');
              this.lotDescriptionTitle.innerText = allLots[messagesData[i].lotID].title;
              this.lotDescription.appendChild(this.lotDescriptionTitle);

              this.messagesKeys = Object.keys(messagesData[i].messages);

              this.messageText = document.createElement('div');
              this.messageText.classList.add('lot_description_message');
              // eslint-disable-next-line prefer-destructuring
              this.messageText.innerText = messagesData[i].messages[this.messagesKeys[0]].message;
              this.message.appendChild(this.messageText);

              this.date = new Date(messagesData[i].messages[this.messagesKeys[0]].dtCreate);

              this.dateDay = document.createElement('div');
              this.dateDay.classList.add('message_date_day');

              this.day = (this.date.getDate()).toString().padStart(2, '0');
              this.month = (this.date.getMonth() + 1).toString().padStart(2, '0');
              this.fullYear = this.date.getFullYear();
              this.dateDay.innerText = `${this.day}.${this.month}.${this.fullYear}`;
              this.messageDate.appendChild(this.dateDay);

              this.dateTime = document.createElement('div');
              this.dateTime.classList.add('message_date_day');

              this.hours = this.date.getHours().toString().padStart(2, '0');
              this.minutes = this.date.getMinutes().toString().padStart(2, '0');
              this.dateTime.innerText = `${this.hours}:${this.minutes}`;
              this.messageDate.appendChild(this.dateTime);
            }
          });
      });
  }
}
