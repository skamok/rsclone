import NotificationBlock from './NotificationBlock.js';

export default class MessageFromPopup {
  constructor(header, main, parentContainer, firebase, lotInfo, userData) {
    this.header = header;
    this.main = main;
    this.parentContainer = parentContainer;
    this.firebase = firebase;
    this.lotInfo = lotInfo;
    this.userData = userData;
  }

  createMessageWindow() {
    if (this.userData.lots.includes(this.lotInfo.lotID)) {
      const error = new NotificationBlock(this.header, 'You can not write message to yourself', true);
      error.showNotification();
      return;
    }
    this.messageBlackout = document.createElement('div');
    this.messageBlackout.classList.add('message_blackout');
    this.parentContainer.appendChild(this.messageBlackout);

    this.messageFormContainer = document.createElement('div');
    this.messageFormContainer.classList.add('message_popup_container');
    this.messageBlackout.appendChild(this.messageFormContainer);

    this.popupMessageBlockHeader = document.createElement('div');
    this.popupMessageBlockHeader.classList.add('popup_message_block_header');
    this.messageFormContainer.appendChild(this.popupMessageBlockHeader);

    this.closeButton = document.createElement('img');
    this.closeButton.classList.add('close_popup_message_button');
    this.closeButton.src = './assets/images/white-cross.png';
    this.popupMessageBlockHeader.appendChild(this.closeButton);

    this.closeButton.addEventListener('click', () => {
      this.messageFormContainer.classList.add('hide_message_animation');
      setTimeout(() => { this.messageBlackout.parentNode.removeChild(this.messageBlackout); }, 800);
    });

    this.popupMessageBlockMain = document.createElement('div');
    this.popupMessageBlockMain.classList.add('popup_message_block_main');
    this.messageFormContainer.appendChild(this.popupMessageBlockMain);

    this.textArea = document.createElement('textarea');
    this.textArea.classList.add('popup_message_textarea');
    this.textArea.setAttribute('placeholder', 'Type your message here');
    this.popupMessageBlockMain.appendChild(this.textArea);

    this.popupMessageBlockFooter = document.createElement('div');
    this.popupMessageBlockFooter.classList.add('popup_message_block_footer');
    this.messageFormContainer.appendChild(this.popupMessageBlockFooter);

    this.sendMessageButton = document.createElement('button');
    this.sendMessageButton.classList.add('send_message_from_popup_button');
    this.sendMessageButton.innerText = 'Send message';
    this.popupMessageBlockFooter.appendChild(this.sendMessageButton);
  }
}
