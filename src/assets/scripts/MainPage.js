export default class MainPage {
  constructor() {
    this.main = document.querySelector('main');
    this.header = document.querySelector('header');
    this.logo = document.querySelector('.logo');
  }

  createMainPage() {
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
    this.username.innerText = 'John Smith';
    this.profileSubcontainer.appendChild(this.username);

    this.karmaPoints = document.createElement('span');
    this.karmaPoints.classList.add('karma_header');
    this.karmaPoints.innerText = '15 karma';
    this.profileSubcontainer.appendChild(this.karmaPoints);

    this.header.appendChild(this.profileContainer);
  }
}
