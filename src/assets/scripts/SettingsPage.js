/* eslint-disable import/no-cycle */
import MainPageLots from './MainPageLots.js';
// eslint-disable-next-line import/named
import { startMap } from './inputMap.js';
import SignInPage from './SignInPage.js';
import NotificationBlock from './NotificationBlock.js';

export default class SettingsPage {
  constructor(сontainer, firebase, header, main, logo, profileContainer) {
    this.container = сontainer;
    this.firebase = firebase;
    this.header = header;
    this.main = main;
    this.container.innerHTML = '';
    this.logo = logo;
    this.profileContainer = profileContainer;
  }

  changeSettings() {
    this.firebase.readCurrentUser()
      .then((data) => {
        this.formSetting = document.createElement('form');
        this.formSetting.setAttribute('name', 'form_setting');
        this.formSetting.classList.add('form_setting', 'animation');
        this.container.appendChild(this.formSetting);
        this.formSetting.addEventListener('submit', this.formUserValidation);

        this.headForm = document.createElement('h2');
        this.headForm.classList.add('add_lot');
        this.headForm.innerText = 'Settings';
        this.formSetting.appendChild(this.headForm);

        this.wrapAvatarEmail = document.createElement('div');
        this.wrapAvatarEmail.classList.add('wrap_avatar_email');
        this.formSetting.appendChild(this.wrapAvatarEmail);

        this.avatar = document.createElement('div');
        this.avatar.classList.add('avatar-photo');
        this.wrapAvatarEmail.appendChild(this.avatar);

        if (data.avatarURL !== undefined) {
          this.avatarPhoto = document.createElement('img');
          this.avatarPhoto.setAttribute('src', data.avatarURL);
          this.avatar.appendChild(this.avatarPhoto);
        }

        this.emailUser = document.createElement('span');
        this.emailUser.classList.add('email');
        this.emailUser.innerHTML = `${data.email}`;
        this.wrapAvatarEmail.appendChild(this.emailUser);

        this.inputPhotos = document.createElement('input');
        this.inputPhotos.setAttribute('type', 'file');
        this.inputPhotos.setAttribute('class', 'input-file');
        this.inputPhotos.setAttribute('id', 'file');
        this.inputPhotos.setAttribute('name', 'file');
        this.inputPhotos.setAttribute('multiple', 'false');
        this.formSetting.appendChild(this.inputPhotos);

        this.labelBtnAddPhotos = document.createElement('label');
        this.labelBtnAddPhotos.setAttribute('for', 'file');
        this.labelBtnAddPhotos.classList.add('btn');
        this.labelBtnAddPhotos.classList.add('btn-tertiary-photo');
        this.labelBtnAddPhotos.classList.add('js-labelFile');
        this.formSetting.appendChild(this.labelBtnAddPhotos);
        this.iconBtnPhotos = document.createElement('i');
        this.iconBtnPhotos.classList.add('icon');
        this.iconBtnPhotos.classList.add('fa');
        this.iconBtnPhotos.classList.add('fa-check');
        this.labelBtnAddPhotos.appendChild(this.iconBtnPhotos);
        this.contentBthPhotos = document.createElement('span');
        this.contentBthPhotos.classList.add('js-fileName');
        this.contentBthPhotos.innerText = 'change avatar';
        this.labelBtnAddPhotos.appendChild(this.contentBthPhotos);
        this.wrapPhotos = document.createElement('div');
        this.wrapPhotos.classList.add('wrap_photos');
        this.formSetting.appendChild(this.wrapPhotos);

        this.inputPhotos.addEventListener('change', this.changeAvatar);

        this.nickName = document.createElement('span');
        this.nickName.classList.add('name_lot');
        this.nickName.innerText = 'Your name';
        this.formSetting.appendChild(this.nickName);

        this.inputNickName = document.createElement('input');
        this.inputNickName.setAttribute('type', 'text');
        this.inputNickName.setAttribute('name', 'nickName');
        this.inputNickName.setAttribute('class', 'name_lot_input');
        this.inputNickName.setAttribute('value', `${data.nick}`);
        this.formSetting.appendChild(this.inputNickName);

        this.phone = document.createElement('span');
        this.phone.classList.add('name_lot');
        this.phone.innerText = 'Your phone number';
        this.formSetting.appendChild(this.phone);

        this.inputPhone = document.createElement('input');
        this.inputPhone.setAttribute('type', 'text');
        this.inputPhone.setAttribute('name', 'phone');
        this.inputPhone.setAttribute('class', 'name_lot_input');
        if (data.phone !== undefined) {
          this.inputPhone.setAttribute('value', `${data.phone}`);
        }
        this.inputPhone.setAttribute('placeholder', '+375 XX XXX XX XX');
        this.formSetting.appendChild(this.inputPhone);
        this.inputPhone.addEventListener('keyup', this.addSpaceInInputPhone.bind(this));

        this.location = document.createElement('span');
        this.location.classList.add('name_lot');
        this.location.innerText = 'Your location';
        this.formSetting.appendChild(this.location);

        this.wrapInputLocationMap = document.createElement('div');
        this.wrapInputLocationMap.setAttribute('id', 'wrap_input_map');
        this.formSetting.appendChild(this.wrapInputLocationMap);

        this.inputLocationMap = document.createElement('input');
        this.inputLocationMap.setAttribute('type', 'text');
        this.inputLocationMap.setAttribute('id', 'suggest');
        this.inputLocationMap.setAttribute('name', 'location');
        this.inputLocationMap.setAttribute('placeholder', 'City street house number');
        this.inputLocationMap.classList.add('input_map');
        this.wrapInputLocationMap.appendChild(this.inputLocationMap);

        if (data.location !== undefined) {
          this.inputLocationMap.setAttribute('value', `${data.location}`);
        }

        this.errMessage = document.createElement('p');
        this.errMessage.setAttribute('id', 'notice');
        this.formSetting.appendChild(this.errMessage);

        this.mapContainer = document.createElement('div');
        this.mapContainer.setAttribute('id', 'map');
        this.formSetting.appendChild(this.mapContainer);
        startMap();

        this.btnSubmit = document.createElement('input');
        this.btnSubmit.setAttribute('type', 'submit');
        this.btnSubmit.setAttribute('value', 'Save');
        this.btnSubmit.classList.add('lot_submit');
        this.formSetting.appendChild(this.btnSubmit);

        this.btnSignOut = document.createElement('button');
        this.btnSignOut.classList.add('sign_out_button');
        this.btnSignOut.innerText = 'Sign out';
        this.formSetting.appendChild(this.btnSignOut);
        this.btnSignOut.addEventListener('click', this.signOut);
      });
  }

  signOut = (e) => {
    e.preventDefault();
    this.firebase.signOUT();
    this.profileContainer.parentNode.removeChild(this.profileContainer);
    this.header.classList.remove('header_entered');
    this.logo.classList.remove('logo_entered');
    const signInPage = new SignInPage(this.firebase, this.main, this.header, this.logo);
    signInPage.createSignInPage();
  }

  addSpaceInInputPhone(e) {
    const numberLength = this.inputPhone.value.length;
    if (e.key !== 'Backspace') {
      if (numberLength === 4 || numberLength === 7 || numberLength === 11 || numberLength === 14) {
        this.inputPhone.value += ' ';
      }
    }
  }

  changeAvatar = (e) => {
    if (e.target.files.length !== 0) {
      this.avatar.innerHTML = '';
      const MAX_WIDTH = 150;
      const MAX_HEIGHT = 150;
      const img = document.createElement('img');
      img.src = window.URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        let { width } = img;
        let { height } = img;
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
        if (height < MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
        img.width = width;
        img.height = height;
        this.avatar.appendChild(img);
        const profileImage = this.header.querySelector('.profile_image');
        profileImage.src = window.URL.createObjectURL(e.target.files[0]);
        if (img.width === 150) {
          const divider = img.width / 40;
          profileImage.style.width = `${img.width / divider}px`;
          profileImage.style.height = `${img.height / divider}px`;
        } else {
          const divider = img.height / 40;
          profileImage.style.width = `${img.width / divider}px`;
          profileImage.style.height = `${img.height / divider}px`;
        }
      };
      this.resizePhotoForServer()
        .then((dataURLs) => this.firebase.addUserAvatar(dataURLs[0]))
        .then(() => {
          const notification = new NotificationBlock(this.header, 'Photo Successfully uploaded');
          notification.showNotification();
        });
    }
  }

  formUserValidation = (e) => {
    e.preventDefault();
    const listMessage = document.querySelectorAll('.message_err');
    let inputError = false;
    listMessage.forEach((elem) => { elem.remove(); });
    if (this.formSetting.nickName.value.length === 0 || this.errMessage.classList.contains('err_message')) {
      inputError = true;
      this.formSetting.nickName.after(this.createMessageError('add your name'));
    }

    if (!(/^[+][\d]{3} [\d]{2} [\d]{3} [\d]{2} [\d]{2}$/.test(this.formSetting.phone.value))) {
      inputError = true;
      this.formSetting.phone.after(this.createMessageError('enter phone number format +XXX XX XXX XX XX'));
    }

    if (this.formSetting.location.value.length === 0) {
      inputError = true;
    }

    if (inputError === false) {
      this.firebase.addUserInfo(this.formSetting.nickName.value, this.formSetting.phone.value,
        this.formSetting.location.value)
        .then(() => {
          const notificationSettings = new NotificationBlock(this.header, 'Settings successfully changed');
          notificationSettings.showNotification();
        });
      const mainPageLots = new MainPageLots(this.firebase, this.container, this.main, this.header,
        this.errorBlock);
      mainPageLots.createMainPageLots();
    }
  }

  createMessageError(str) {
    this.messageError = document.createElement('span');
    this.messageError.classList.add('message_err');
    this.messageError.innerText = str;
    return this.messageError;
  }

  async resizePhotoForServer() {
    this.arrImages = [];
    let MAX_WIDTH = 1024;
    let MAX_HEIGHT = 768;
    let i = 0;
    const arr = [];
    arr.push(this.inputPhotos.files[0]);
    for (let index = 0; index < this.inputPhotos.files.length; index++) {
      arr.push(this.inputPhotos.files[index]);
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of arr) {
      const img = document.createElement('img');
      img.src = window.URL.createObjectURL(elem);
      const contain = document.createElement('div');
      contain.classList.add('contain');
      const canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');
      // eslint-disable-next-line no-loop-func
      const promise = new Promise((res, rej) => {
        img.onload = () => {
          if (i === 0) {
            MAX_WIDTH = 150;
            MAX_HEIGHT = 150;
          } else {
            MAX_WIDTH = 1024;
            MAX_HEIGHT = 768;
          }
          i += 1;
          let { width } = img;
          let { height } = img;
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
          if (height < MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const dataurl = canvas.toDataURL('image/jpeg', 0.9);
          res(dataurl);
          rej(new Error('Photo do not add'));
        };
      });
      // eslint-disable-next-line no-await-in-loop
      const result = await promise;
      this.arrImages.push(result);
    }
    return this.arrImages;
  }
}
