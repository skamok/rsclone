/* eslint-disable no-console */
import CurrentLotPage from './CurrentLotPage.js';

export default class TakenLotsList {
  constructor(firebase, lotsContainer, header, main) {
    this.firebase = firebase;
    this.lotsContainer = lotsContainer;
    this.main = main;
    this.header = header;
  }

  createTakenList() {
    this.lotsContainer.innerHTML = '';
    this.firebase.readCurrentUserWinLots().then((data) => {
      if (!data.length) {
        this.lotsContainer.innerText = 'You have no lots here';
        return;
      }
      for (let i = 0; i < data.length; i++) {
        this.lotCard = document.createElement('div');
        this.lotCard.classList.add('lot_card', 'animation');
        this.lotCard.addEventListener('click', () => {
          const lotPage = new CurrentLotPage(data[i], this.header, this.main, this.firebase, true);
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

        this.lotsContainer.appendChild(this.lotCard);
      }
    });
  }
}
