export default class SettingsPage {
  constructor(сontainer, firebase, header, main) {
    this.container = сontainer;
    this.firebase = firebase;
    this.header = header;
    this.main = main;
    this.container.innerHTML = '';
  }

  changeSettings() {
    this.firebase.readCurrentUser()
      .then((data) => {
        this.formSetting = document.createElement('form');
        this.formSetting.setAttribute('name', 'form_setting');
        this.formSetting.classList.add('form_setting');
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
        this.inputPhone.setAttribute('placeholder', '+375 XX XXXXXXX');
        this.formSetting.appendChild(this.inputPhone);

        this.location = document.createElement('span');
        this.location.classList.add('name_lot');
        this.location.innerText = 'Your location';
        this.formSetting.appendChild(this.location);

        this.inputLocation = document.createElement('input');
        this.inputLocation.setAttribute('type', 'text');
        this.inputLocation.setAttribute('name', 'location');
        this.inputLocation.setAttribute('class', 'name_lot_input');
        if (data.location !== undefined) {
          this.inputLocation.setAttribute('value', `${data.location}`);
        }
        this.inputLocation.setAttribute('placeholder', 'Homyel');
        this.formSetting.appendChild(this.inputLocation);

        this.btnSubmit = document.createElement('input');
        this.btnSubmit.setAttribute('type', 'submit');
        this.btnSubmit.setAttribute('value', 'Change settings');
        this.btnSubmit.classList.add('lot_submit');
        this.formSetting.appendChild(this.btnSubmit);
      });
  }

  changeAvatar = (e) => {
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
    };
    this.resizePhotoForServer()
      .then((dataURLs) => this.firebase.addUserAvatar(dataURLs[0]))
      .then(() => alert('photo added'));
  }

  formUserValidation = (e) => {
    e.preventDefault();
    const listMessage = document.querySelectorAll('.message_err');
    let inputError = false;
    listMessage.forEach((elem) => { elem.remove(); });
    /* if (this.wrapPhotos.children.length === 0) {
      inputError = true;
      // this.labelBtnAddPhotos.after(this.createMessageError('add photos'));
    } */
    if (this.formSetting.nickName.value.length === 0) {
      inputError = true;
      this.formSetting.nickName.after(this.createMessageError('add your name'));
    }

    if (!(/^[+][\d]{3} [\d]{2} [\d]{2,3}[\d]{2,3}[\d]{2,3}$/.test(this.formSetting.phone.value))) {
      inputError = true;
      this.formSetting.phone.after(this.createMessageError('enter phone number format +XXX XX XXXXXXX'));
    }

    if (this.formSetting.location.value.length === 0) {
      inputError = true;
      this.formSetting.location.after(this.createMessageError('add your location'));
    }

    if (inputError === false) {
      this.firebase.addUserInfo(this.formSetting.nickName.value, this.formSetting.phone.value,
        this.formSetting.location.value)
        .then(() => alert('info added'));
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
