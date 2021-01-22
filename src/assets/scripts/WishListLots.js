/* eslint-disable no-console */
import CurrentLotPage from './CurrentLotPage.js';

export default class WishListLots {
  constructor(firebase, lotsContainer, header, main, userData) {
    this.container = lotsContainer;
    this.firebase = firebase;
    this.header = header;
    this.main = main;
    this.userData = userData;
  }

  createWishList() {
    this.container.innerHTML = '';
    this.firebase.readCurrentUserWishLots()
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          this.lotCard = document.createElement('div');
          this.lotCard.classList.add('lot_card', 'animation');
          this.lotCard.addEventListener('click', () => {
            const lotPage = new CurrentLotPage(data[i], this.header, this.main, this.firebase, false, this.userData);
            lotPage.createCurrentLotPage();
          });

          this.lotCardHeader = document.createElement('div');
          this.lotCardHeader.classList.add('lot_card_header');
          this.lotCardHeader.innerText = `${data[i].price} Karma`;
          this.lotCard.appendChild(this.lotCardHeader);

          this.lotCardMain = document.createElement('div');
          this.lotCardMain.classList.add('lot_card_main');
          this.lotCard.appendChild(this.lotCardMain);

          this.lotCardImage = document.createElement('img');
          this.lotCardImage.classList.add('lot_card_image');
          this.lotCardImage.src = `${data[i].imgURLs[0]}`;
          this.lotCardMain.appendChild(this.lotCardImage);

          this.lotCardFooter = document.createElement('div');
          this.lotCardFooter.classList.add('lot_card_footer');
          this.lotCard.appendChild(this.lotCardFooter);

          this.lotTitle = document.createElement('div');
          this.lotTitle.innerText = data[i].title;
          this.lotCardFooter.appendChild(this.lotTitle);

          this.toWishesButton = document.createElement('img');
          this.toWishesButton.src = './assets/images/red-heart.png';
          this.lotCardFooter.appendChild(this.toWishesButton);
          this.toWishesButton.classList.add('to_wishes_button');

          this.container.appendChild(this.lotCard);
        }
      });
  }
}
