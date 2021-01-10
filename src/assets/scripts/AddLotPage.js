import { resizeImagesForMiniature } from './resizeImages.js';

export default class AddLotInPage {
  constructor(сontainer) {
    this.container = сontainer;
    this.createAddLotPage();
  }

  createAddLotPage() {
    this.headForm = document.createElement('h2');
    this.headForm.classList.add('add_lot');
    this.headForm.innerText = 'Adding lot';
    this.container.appendChild(this.headForm);

    this.formLot = document.createElement('form');
    this.formLot.setAttribute('name', 'form_lot');
    this.formLot.setAttribute('submit', this.formLotValidation);
    this.container.appendChild(this.formLot);

    this.inputPhotos = document.createElement('input');
    this.inputPhotos.setAttribute('type', 'file');
    this.inputPhotos.setAttribute('class', 'input-file');
    this.inputPhotos.setAttribute('id', 'file');
    this.inputPhotos.setAttribute('name', 'file');
    this.inputPhotos.setAttribute('multiple', 'true');
    this.formLot.appendChild(this.inputPhotos);

    this.labelBtnAddPhotos = document.createElement('label');
    this.labelBtnAddPhotos.setAttribute('for', 'file');
    this.labelBtnAddPhotos.classList.add('btn');
    this.labelBtnAddPhotos.classList.add('btn-tertiary');
    this.labelBtnAddPhotos.classList.add('js-labelFile');
    this.formLot.appendChild(this.labelBtnAddPhotos);
    this.iconBtnPhotos = document.createElement('i');
    this.iconBtnPhotos.classList.add('icon');
    this.iconBtnPhotos.classList.add('fa');
    this.iconBtnPhotos.classList.add('fa-check');
    this.labelBtnAddPhotos.appendChild(this.iconBtnPhotos);
    this.contentBthPhotos = document.createElement('span');
    this.contentBthPhotos.classList.add('js-fileName');
    this.contentBthPhotos.innerText = 'Add photos';
    this.labelBtnAddPhotos.appendChild(this.contentBthPhotos);
    this.wrapPhotos = document.createElement('div');
    this.wrapPhotos.classList.add('wrap_photos');
    this.formLot.appendChild(this.wrapPhotos);

    this.inputPhotos.addEventListener('change', resizeImagesForMiniature);

    this.lotName = document.createElement('span');
    this.lotName.classList.add('name_lot');
    this.lotName.innerText = 'Lot name';
    this.formLot.appendChild(this.lotName);
    // this.lotName.addEventListener('change', () => { console.log('ok')});

    this.inputLotName = document.createElement('input');
    this.inputLotName.setAttribute('type', 'text');
    this.inputLotName.setAttribute('class', 'name_lot_input');
    this.inputLotName.setAttribute('placeholder', 'For example, phone');
    this.formLot.appendChild(this.inputLotName);

    this.lotCategory = document.createElement('span');
    this.lotCategory.classList.add('category_lot');
    this.lotCategory.innerText = 'Category selection';
    this.formLot.appendChild(this.lotCategory);

    this.listCategory = document.createElement('select');
    this.listCategory.setAttribute('name', 'category');
    this.listCategory.classList.add('select_category');
    this.listCategory.innerHTML = `
      <option disabled>Category</option>
      <option value="Appliances">Appliances</option>
      <option value="Bijouterie">Bijouterie</option>
      <option value="Books">Books</option>
      <option value="Сlothes">Сlothes</option>
      <option value="Computer technology">Computer technology</option>
      <option value="Electronics">Electronics</option>
      <option value="Furniture">Furniture</option>
      <option value="Pet">Pet</option>
      <option value="Plants">Plants</option>
      <option value="Tool">Tool</option>
      `;
    this.formLot.appendChild(this.listCategory);

    this.lotDescription = document.createElement('span');
    this.lotDescription.classList.add('description_lot');
    this.lotDescription.innerText = 'Lot Description';
    this.formLot.appendChild(this.lotDescription);

    this.areaDescription = document.createElement('textarea');
    this.areaDescription.setAttribute('name', 'descriptionLot');
    this.areaDescription.setAttribute('placeholder', 'Minimum 20 characters');
    this.areaDescription.classList.add('description_lot_input');
    this.formLot.appendChild(this.areaDescription);

    this.karmaCount = document.createElement('span');
    this.karmaCount.classList.add('karma_count_lot');
    this.karmaCount.innerText = 'Karma amount';
    this.formLot.appendChild(this.karmaCount);

    this.inputKarmaCount = document.createElement('input');
    this.inputKarmaCount.setAttribute('type', 'text');
    this.inputKarmaCount.setAttribute('class', 'karma_count_lot_input');
    this.inputKarmaCount.setAttribute('placeholder', '0');
    this.formLot.appendChild(this.inputKarmaCount);

    this.btnSubmit = document.createElement('input');
    this.btnSubmit.setAttribute('type', 'submit');
    this.btnSubmit.setAttribute('value', 'Add an advert');
    this.btnSubmit.classList.add('lot_submit');
    this.formLot.appendChild(this.btnSubmit);
    // this.btnSubmit.addEventListener('click', this.formLotValidation);
  }

  /* formLotValidation() {
    //e.preventDefault()
    //const form = document.forms["form_lot"].[];
    //console.log(form);
  } */
}
