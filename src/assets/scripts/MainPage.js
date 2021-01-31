/* eslint-disable import/no-cycle */
import MainPageLots from './MainPageLots.js';
import AddLotPage from './AddLotPage.js';
import WishListLots from './WishListLots.js';
import SettingsPage from './SettingsPage.js';
import TakenLotsList from './TakenLotsList.js';
import MessagesSection from './MessagesSection.js';

export default class MainPage {
  constructor(firebase, mainSection, headerSection, logo) {
    this.main = mainSection;
    this.header = headerSection;
    this.logo = logo;
    this.firebase = firebase;
  }

  createMainPage() {
    this.firebase.readCurrentUserWinLots()
      .then((winLotsData) => {
        this.firebase.readCurrentUser()
          .then((userData) => {
            this.main.innerHTML = '';

            this.header.innerHTML = '';

            this.header.appendChild(this.logo);

            this.header.classList.add('header_entered');
            this.logo.classList.add('logo_entered');

            this.profileContainer = document.createElement('div');
            this.profileContainer.classList.add('profile_container');

            this.wrapProfileImage = document.createElement('div');
            this.wrapProfileImage.classList.add('wrap_profile_img');
            this.profileContainer.appendChild(this.wrapProfileImage);

            this.profileImage = document.createElement('img');
            this.profileImage.classList.add('profile_image');
            if (userData.avatarURL !== undefined) {
              this.profileImage.src = userData.avatarURL;
            } else {
              this.profileImage.src = '';
            }
            this.wrapProfileImage.appendChild(this.profileImage);
            this.profileImage.onload = () => {
              if (this.profileImage.width === 150) {
                const divider = this.profileImage.width / 40;
                this.profileImage.width /= divider;
              } else {
                const divider = this.profileImage.height / 40;
                this.profileImage.width /= divider;
              }
            };

            this.profileSubcontainer = document.createElement('div');
            this.profileSubcontainer.classList.add('profile_subcontainer');
            this.profileContainer.appendChild(this.profileSubcontainer);

            this.username = document.createElement('span');
            this.username.classList.add('username_header');
            this.username.innerText = `${userData.nick}`;
            this.profileSubcontainer.appendChild(this.username);

            this.karmaPoints = document.createElement('span');
            this.karmaPoints.classList.add('karma_header');
            this.karmaPoints.innerText = `${userData.karmaCount} karma`;
            this.profileSubcontainer.appendChild(this.karmaPoints);

            this.header.appendChild(this.profileContainer);

            this.mainContainer = document.createElement('div');
            this.mainContainer.classList.add('main_container');
            this.main.appendChild(this.mainContainer);

            this.burgerMenu = document.createElement('div');
            this.burgerMenu.classList.add('burger_menu');
            this.mainContainer.appendChild(this.burgerMenu);

            this.lotsContainer = document.createElement('div');
            this.lotsContainer.classList.add('lots_container');
            this.mainContainer.appendChild(this.lotsContainer);

            // burger-menu markup

            this.burgerMenuAddLot = document.createElement('div');
            this.burgerMenuAddLot.classList.add('burger_menu_element');
            this.burgerMenuAddLot.addEventListener('click', this.addLotClick);

            this.burgerMenuAddLotIcon = document.createElement('img');
            this.burgerMenuAddLotIcon.classList.add('add_lot_img');
            this.burgerMenuAddLotIcon.src = './assets/images/add-lot.png';
            this.burgerMenuAddLot.appendChild(this.burgerMenuAddLotIcon);

            this.burgerMenuAddLotText = document.createElement('div');
            this.burgerMenuAddLotText.classList.add('add_lot_text');
            this.burgerMenuAddLotText.innerText = 'Add lot';
            this.burgerMenuAddLot.appendChild(this.burgerMenuAddLotText);

            this.burgerMenu.appendChild(this.burgerMenuAddLot);
            // ___________________
            this.burgerMenuChart = document.createElement('div');
            this.burgerMenuChart.classList.add('burger_menu_element');
            this.burgerMenuChart.addEventListener('click', () => {
              const mainPageLots = new MainPageLots(this.firebase, this.lotsContainer, this.main, this.header,
                this.errorBlock, userData);
              mainPageLots.createMainPageLots();
            });

            this.burgerMenuChartIcon = document.createElement('img');
            this.burgerMenuChartIcon.classList.add('add_lot_img');
            this.burgerMenuChartIcon.src = './assets/images/chart.png';
            this.burgerMenuChart.appendChild(this.burgerMenuChartIcon);

            this.burgerMenuChartText = document.createElement('div');
            this.burgerMenuChartText.classList.add('add_lot_text');
            this.burgerMenuChartText.innerText = 'Chart';
            this.burgerMenuChart.appendChild(this.burgerMenuChartText);

            this.burgerMenu.appendChild(this.burgerMenuChart);
            // ___________________
            this.burgerMenuWishes = document.createElement('div');
            this.burgerMenuWishes.classList.add('burger_menu_element');
            this.burgerMenuWishes.addEventListener('click', () => {
              const wishList = new WishListLots(this.firebase, this.lotsContainer, this.header, this.main, userData);
              wishList.createWishList();
            });

            this.burgerMenuWishesIcon = document.createElement('img');
            this.burgerMenuWishesIcon.classList.add('add_lot_img');
            this.burgerMenuWishesIcon.src = './assets/images/wishes.png';
            this.burgerMenuWishes.appendChild(this.burgerMenuWishesIcon);

            this.burgerMenuWishesText = document.createElement('div');
            this.burgerMenuWishesText.classList.add('add_lot_text');
            this.burgerMenuWishesText.innerText = 'Wishes';
            this.burgerMenuWishes.appendChild(this.burgerMenuWishesText);

            this.burgerMenu.appendChild(this.burgerMenuWishes);
            // ___________________

            // ___________________
            this.burgerMenuTaken = document.createElement('div');
            this.burgerMenuTaken.classList.add('burger_menu_element');
            this.burgerMenuTaken.addEventListener('click', () => {
              const takenList = new TakenLotsList(this.firebase, this.lotsContainer, this.header, this.main, userData);
              takenList.createTakenList();
            });

            this.burgerMenuTakenIcon = document.createElement('img');
            this.burgerMenuTakenIcon.classList.add('add_lot_img');
            this.burgerMenuTakenIcon.src = './assets/images/take.png';
            this.burgerMenuTaken.appendChild(this.burgerMenuTakenIcon);

            this.burgerMenuTakenText = document.createElement('div');
            this.burgerMenuTakenText.classList.add('add_lot_text');
            this.burgerMenuTakenText.innerText = 'Taken';
            this.burgerMenuTaken.appendChild(this.burgerMenuTakenText);

            this.burgerMenu.appendChild(this.burgerMenuTaken);
            // ___________________
            this.burgerMenuMessages = document.createElement('div');
            this.burgerMenuMessages.classList.add('burger_menu_element');

            this.burgerMenuMessagesIcon = document.createElement('img');
            this.burgerMenuMessagesIcon.classList.add('add_lot_img');
            this.burgerMenuMessagesIcon.src = './assets/images/messages.png';
            this.burgerMenuMessages.appendChild(this.burgerMenuMessagesIcon);

            this.burgerMenuMessagesText = document.createElement('div');
            this.burgerMenuMessagesText.classList.add('add_lot_text');
            this.burgerMenuMessagesText.innerText = 'Messages';
            this.burgerMenuMessages.appendChild(this.burgerMenuMessagesText);

            this.burgerMenu.appendChild(this.burgerMenuMessages);

            this.burgerMenuMessages.addEventListener('click', () => {
              const messages = new MessagesSection(this.firebase, this.lotsContainer, this.main, this.header, userData,
                winLotsData);
              messages.createMessagesSection();
            });
            // ___________________
            this.burgerMenuSettings = document.createElement('div');
            this.burgerMenuSettings.classList.add('burger_menu_element');

            this.burgerMenuSettingsIcon = document.createElement('img');
            this.burgerMenuSettingsIcon.classList.add('add_lot_img');
            this.burgerMenuSettingsIcon.src = './assets/images/settings.png';
            this.burgerMenuSettings.appendChild(this.burgerMenuSettingsIcon);

            this.burgerMenuSettingsText = document.createElement('div');
            this.burgerMenuSettingsText.classList.add('add_lot_text');
            this.burgerMenuSettingsText.innerText = 'Settings';
            this.burgerMenuSettings.appendChild(this.burgerMenuSettingsText);
            this.burgerMenuSettings.addEventListener('click', this.goToSettings);

            this.burgerMenu.appendChild(this.burgerMenuSettings);

            const mainPageLots = new MainPageLots(this.firebase, this.lotsContainer, this.main, this.header,
              this.errorBlock);
            mainPageLots.createMainPageLots();
          });
      });
  }

  addLotClick = (event) => {
    event.preventDefault();
    this.addLotPage = new AddLotPage(this.lotsContainer, this.firebase, this.header, this.main);
    this.addLotPage.createAddLotPage();
  }

  goToSettings = (event) => {
    event.preventDefault();
    const settings = new SettingsPage(this.lotsContainer, this.firebase, this.header, this.main, this.logo,
      this.profileContainer);
    settings.changeSettings();
  }
}
