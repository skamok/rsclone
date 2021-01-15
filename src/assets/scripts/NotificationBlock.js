export default class NotificationBlock {
  constructor(header, notificationText, isError) {
    this.header = header;
    this.notificationText = notificationText;
    this.isError = isError;
  }

  showNotification() {
    this.errorBlock = document.createElement('div');
    this.errorBlock.classList.add('error_block');
    if (this.isError) {
      this.errorBlock.style.color = '#c30a0a';
    } else {
      this.errorBlock.style.color = '#000000';
    }
    this.header.appendChild(this.errorBlock);
    this.errorBlock.innerHTML = this.notificationText;
    this.errorBlock.classList.add('error_block_shown');
    setTimeout(() => {
      this.errorBlock.classList.add('error_block_hidden');
    }, 3000);
    setTimeout(() => {
      this.errorBlock.parentNode.removeChild(this.errorBlock);
    }, 4000);
  }
}
