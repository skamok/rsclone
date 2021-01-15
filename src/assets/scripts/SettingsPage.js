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
    this.avatar.classList.add('avatar');
    this.avatar.innerText = 'No photo';
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
    this.labelBtnAddPhotos.classList.add('btn-tertiary');
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

    this.btnSubmit = document.createElement('input');
    this.btnSubmit.setAttribute('type', 'submit');
    this.btnSubmit.setAttribute('value', 'Change settings');
    this.btnSubmit.classList.add('lot_submit');
    this.formSetting.appendChild(this.btnSubmit);
  }

  // eslint-disable-next-line class-methods-use-this
  changeAvatar(e) {
    if (e.target.files.length !== 0) {

      console.log(this.inputPhotos.file);
      this.avatar.style.backgroundImage = `url(${this.inputPhotos.file})`;
    }
  }
}
