export function resizeImagesForMiniature() {
  const MAX_WIDTH = 150;
  const MAX_HEIGHT = 150;
  for (let i = 0; i < this.files.length; i += 1) {
    const img = document.createElement('img');
    img.src = window.URL.createObjectURL(this.files[i]);
    const contain = document.createElement('div');
    contain.classList.add('contain_photo');
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('btn_delete_photo');
    contain.appendChild(deleteBtn);
    const canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    img.onload = () => {
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
        ctx.drawImage(img, 0, -((height - 200) / 2), width, height);
      } else {
        ctx.drawImage(img, -((width - 200) / 2), 0, width, height);
      }
    };
    const wrapPhotos = document.querySelector('.wrap_photos');
    wrapPhotos.appendChild(contain);
    contain.appendChild(canvas);
  }
  const arrBtnDeletePhoto = document.querySelectorAll('.btn_delete_photo');
  arrBtnDeletePhoto.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const containPhoto = e.target.closest('.contain_photo');
      containPhoto.remove();
    });
  });
}

export function resizeImagesForServer() {
  let arrImages = [];
  const MAX_WIDTH = 800;
  const MAX_HEIGHT = 600;
  for (let i = 0; i < this.files.length; i += 1) {
    const img = document.createElement('img');
    img.src = window.URL.createObjectURL(this.files[i]);
    const contain = document.createElement('div');
    contain.classList.add('contain');
    const canvas = document.createElement('CANVAS');
    const ctx = canvas.getContext('2d');
    img.onload = () => {
      let { width } = img;
      let { height } = img;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      arrImages.push(canvas);
    };
  }
  return arrImages;
}