import AddLotInPage from './AddLotPage.js';

export default class MainPage {
  constructor(firebase) {
    this.main = document.querySelector('main');
    this.header = document.querySelector('header');
    this.logo = document.querySelector('.logo');
    this.firebase = firebase;
  }

  createMainPage() {
    this.firebase.readCurrentUser()
      .then((userData) => {
        console.log('MainPage.createMainPage userData=', userData);
        this.main.innerHTML = '';

        this.header.classList.add('header_entered');
        this.logo.classList.add('logo_entered');

        this.profileContainer = document.createElement('div');
        this.profileContainer.classList.add('profile_container');

        this.profileImage = document.createElement('img');
        this.profileImage.classList.add('profile_image');
        this.profileImage.src = './assets/images/default-profile.png';
        this.profileContainer.appendChild(this.profileImage);

        this.profileSubcontainer = document.createElement('div');
        this.profileSubcontainer.classList.add('profile_subcontainer');
        this.profileContainer.appendChild(this.profileSubcontainer);

        this.username = document.createElement('span');
        this.username.classList.add('username_header');
        this.username.innerText = `${userData.nick}`;
        this.profileSubcontainer.appendChild(this.username);

        this.karmaPoints = document.createElement('span');
        this.karmaPoints.classList.add('karma_header');
        this.karmaPoints.innerText = `${3} karma`;
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
        this.burgerMenuAddLot.addEventListener('click', () => { new AddLotInPage(this.burgerMenuAddLot); });

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

        this.burgerMenu.appendChild(this.burgerMenuSettings);
      });
  }
}
