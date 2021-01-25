/* eslint-disable no-console */
import CurrentLotPage from './CurrentLotPage.js';

export default class MainPageLots {
  constructor(firebase, lotsContainer, main, header, errorBlock, userData) {
    this.firebase = firebase;
    this.container = lotsContainer;
    this.main = main;
    this.header = header;
    this.errorBlock = errorBlock;
    this.userData = userData;
  }

  createMainPageLots() {
    this.container.innerHTML = '';
    this.firebase.readCurrentUser()
      .then((userData) => {
        this.firebase.readLots()
          .then((allLotsData) => {
            const keys = Object.keys(allLotsData);
            for (let i = 0; i < keys.length; i++) {
              this.lotCard = document.createElement('div');
              this.lotCard.classList.add('lot_card', 'animation');
              this.lotCard.addEventListener('click', () => {
                const lotPage = new CurrentLotPage(allLotsData[keys[i]], this.header, this.main,
                  this.firebase, false, userData);
                lotPage.createCurrentLotPage();
              });

              this.lotCardHeader = document.createElement('div');
              this.lotCardHeader.classList.add('lot_card_header');
              this.lotCardHeader.innerText = `${allLotsData[keys[i]].price} Karma`;
              this.lotCard.appendChild(this.lotCardHeader);

              this.lotCardMain = document.createElement('div');
              this.lotCardMain.classList.add('lot_card_main');
              this.lotCard.appendChild(this.lotCardMain);

              this.lotCardImage = document.createElement('img');
              this.lotCardImage.classList.add('lot_card_image');
              this.lotCardImage.src = `${allLotsData[keys[i]].imgURLs[0]}`;
              this.lotCardMain.appendChild(this.lotCardImage);

              this.lotCardFooter = document.createElement('div');
              this.lotCardFooter.classList.add('lot_card_footer');
              this.lotCard.appendChild(this.lotCardFooter);

              this.lotTitle = document.createElement('div');
              this.lotTitle.innerText = allLotsData[keys[i]].title;
              this.lotCardFooter.appendChild(this.lotTitle);

              this.toWishesButton = document.createElement('img');

              if (userData.wishLots !== undefined) {
                if (userData.wishLots.includes(keys[i])) {
                  this.toWishesButton.src = './assets/images/red-heart.png';
                } else {
                  this.toWishesButton.src = './assets/images/heart.png';
                }
              } else {
                this.toWishesButton.src = './assets/images/heart.png';
              }

              this.lotCardFooter.appendChild(this.toWishesButton);
              this.toWishesButton.classList.add('to_wishes_button');

              this.container.appendChild(this.lotCard);
            }
          });
      });
  }
}
