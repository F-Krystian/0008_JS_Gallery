const getElement = function(selection) {
  const element = document.querySelector(selection);

  if(element){
    return element;
  }
  throw new Error(
    `Please check ${selection} selector`
  );
}

class Gallery {
  constructor(itemsSet) {
    this.set  = itemsSet;
    this.itemsList = [...itemsSet.querySelectorAll('.mini-image-img')];

    this.modal = getElement('.overlay');
    this.header = getElement('.enlarged-gallery__header');
    this.mainImage = getElement('.main-image-img__src');
    this.miniaturesContainer = getElement('.enlarged-gallery__previews__content');
    
    this.closeBtn = getElement('.enlarged-gallery__btn-close');
    this.largeBtnPrev = getElement('.main-image__btn-prev');
    this.largeBtnNext = getElement('.main-image__btn-next');

// Binding
// Set auto openning of modal on click on any of images
    this.closeModal = this.closeModal.bind(this);
    this.setMainImg = this.setMainImg.bind(this);
    this.setHeader = this.setHeader.bind(this);
    this.setMiniaturesList = this.setMiniaturesList.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.selectActiveMiniature = this.selectActiveMiniature;
    this.set.addEventListener('click', function(e){
      if(e.target.classList.contains('mini-image-img')){
        console.log(e.target)
        this.openModal(e.target, this.itemsList)
      }
    }.bind(this)
    );


  }

  openModal(selectedImg, list){
    console.log(this.itemsList)
    this.modal.classList.add('active');
    this.closeBtn.addEventListener('click', this.closeModal);
    this.setMainImg(selectedImg);
    this.setHeader(selectedImg);
    this.setMiniaturesList();
    this.selectActiveMiniature(selectedImg);    

    this.largeBtnPrev.addEventListener('click', this.prevImage);
    this.largeBtnNext.addEventListener('click', this.nextImage);
  }

  closeModal(){
    this.modal.classList.remove('active');
    this.closeBtn.removeEventListener('click', this.closeModal);
    this.largeBtnPrev.removeEventListener('click', this.prevImage);
    this.largeBtnNext.removeEventListener('click', this.nextImage);
  }

  setMainImg(selectedImg){
    this.mainImage.src = selectedImg.src;
    this.mainImage.dataset.tag = selectedImg.dataset.tag;
    this.mainImage.dataset.id = selectedImg.dataset.id;
    this.selectActiveMiniature(selectedImg); 
  }

  setHeader(selectedImg){
    this.header.innerText = selectedImg.dataset.tag;
  }

  setMiniaturesList(){
    let imagesHTML = this.itemsList.map((img) => {
      return `<img src="${img.src}" alt="" srcset="" data-tag="${img.dataset.tag}" data-id="${img.dataset.id}" class="preview-image-img non-active">`
    }).join('');
    this.miniaturesContainer.insertAdjacentHTML('afterbegin', imagesHTML);
  }

  prevImage() {

  } 

  nextImage() {
  }

  selectActiveMiniature(selectedImg){
    let previewImages = [...this.miniaturesContainer.querySelectorAll('.preview-image-img')];
    let selectedId = selectedImg.dataset.id;
    console.log(selectedId);
    previewImages.forEach((img) => {
      img.addEventListener('click', () => this.setMainImg(img))
      if(img.dataset.id == selectedId) {
        img.classList.add('active');
        img.classList.remove('non-active');
      } else {
        img.classList.remove('active');
        img.classList.add('non-active');
      }
    })
  }
}



const gallerySetOne = new Gallery(getElement('.container-cats'));
const gallerySetTwo = new Gallery(getElement('.container-dogs'));
