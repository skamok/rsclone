export default class SettingsPage {
  constructor(сontainer, firebase, header, main) {
    this.container = сontainer;
    this.firebase = firebase;
    this.header = header;
    this.main = main;
    this.container.innerHTML = '';
  }

  changeSettings() {
    this.formSetting = document.createElement('form');
    this.formSetting.setAttribute('name', 'form_setting');
    this.formSetting.classList.add('form_setting');
    this.container.appendChild(this.formSetting);
    this.formSetting.addEventListener('submit', this.formLotValidation);

    this.headForm = document.createElement('h2');
    this.headForm.classList.add('add_lot');
    this.headForm.innerText = 'Settings';
    this.formSetting.appendChild(this.headForm);

    this.avatar = document.createElement('div');
    this.avatar.classList.add('avatar-photo');
    this.formSetting.appendChild(this.avatar);

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

    this.inputPhotos.addEventListener('change', this.changeAvatar.bind(this));

    this.nickName = document.createElement('span');
    this.nickName.classList.add('name_lot');
    this.nickName.innerText = 'Your name';
    this.formSetting.appendChild(this.nickName);

    this.inputNickName = document.createElement('input');
    this.inputNickName.setAttribute('type', 'text');
    this.inputNickName.setAttribute('name', 'nickName');
    this.inputNickName.setAttribute('class', 'name_lot_input');
    this.inputNickName.setAttribute('placeholder', 'John');
    this.formSetting.appendChild(this.inputNickName);

    this.email = document.createElement('span');
    this.email.classList.add('name_lot');
    this.email.innerText = 'Your email';
    this.formSetting.appendChild(this.email);

    this.inputEmail = document.createElement('input');
    this.inputEmail.setAttribute('type', 'text');
    this.inputEmail.setAttribute('name', 'email');
    this.inputEmail.setAttribute('class', 'name_lot_input');
    this.inputEmail.setAttribute('placeholder', 'john@mail.com');
    this.formSetting.appendChild(this.inputEmail);

    this.password = document.createElement('span');
    this.password.classList.add('name_lot');
    this.password.innerText = 'Your password';
    this.formSetting.appendChild(this.password);

    this.inputPassword = document.createElement('input');
    this.inputPassword.setAttribute('type', 'text');
    this.inputPassword.setAttribute('name', 'password');
    this.inputPassword.setAttribute('class', 'name_lot_input');
    this.inputPassword.setAttribute('placeholder', 'password');
    this.formSetting.appendChild(this.inputPassword);

    this.phone = document.createElement('span');
    this.phone.classList.add('name_lot');
    this.phone.innerText = 'Your phone number';
    this.formSetting.appendChild(this.phone);

    this.inputPhone = document.createElement('input');
    this.inputPhone.setAttribute('type', 'text');
    this.inputPhone.setAttribute('name', 'phone');
    this.inputPhone.setAttribute('class', 'name_lot_input');
    this.inputPhone.setAttribute('placeholder', '+375 XX XXX-XX-XX');
    this.formSetting.appendChild(this.inputPhone);

    this.location = document.createElement('span');
    this.location.classList.add('name_lot');
    this.location.innerText = 'Your location';
    this.formSetting.appendChild(this.location);

    this.inputLocation = document.createElement('input');
    this.inputLocation.setAttribute('type', 'text');
    this.inputLocation.setAttribute('name', 'location');
    this.inputLocation.setAttribute('class', 'name_lot_input');
    this.inputLocation.setAttribute('placeholder', 'Homyel');
    this.formSetting.appendChild(this.inputLocation);

    this.btnSubmit = document.createElement('input');
    this.btnSubmit.setAttribute('type', 'submit');
    this.btnSubmit.setAttribute('value', 'Change settings');
    this.btnSubmit.classList.add('lot_submit');
    this.formSetting.appendChild(this.btnSubmit);
  }

  // eslint-disable-next-line class-methods-use-this
  changeAvatar() {
   
    /* const wrapSelectAvatar = document.createElement('div');
    wrapSelectAvatar.classList.add('wrap_s_a');
    this.main.appendChild(wrapSelectAvatar);
    const selectAvatar = document.createElement('div');
    selectAvatar.classList.add('select_avatar');
    wrapSelectAvatar.appendChild(selectAvatar);
 
    // this.avatar.style.backgroundImage = `url()`
    const img = document.createElement('img');
    img.src = window.URL.createObjectURL(e.target.files[0]);
    // console.log(img.src)
    const canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    console.log(img.width, img.height);
    let MAX_WIDTH;
    let MAX_HEIGHT;
    img.onload = () => {
      if (img.width > img.height) {
        MAX_WIDTH = 600;
        MAX_HEIGHT = 340;
      } if (img.width < img.height) {
        MAX_WIDTH = 340;
        MAX_HEIGHT = 600;
      }
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
      if (height > MAX_HEIGHT) {
        ctx.drawImage(img, 0, 0, width, height);
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      // const dataurl = canvas.toDataURL('image/jpeg', 0.9);
      selectAvatar.appendChild(canvas);
    };
    // this.wrapPhotos.appendChild(this.contain);
    // this.contain.appendChild(canvas); */
  } 
}
