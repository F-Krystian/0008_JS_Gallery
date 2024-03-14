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
    this.largeImage = getElement('.main-image-img__src');
    this.miniaturesContainer = getElement('.enlarged-gallery__previews__content');
    this.closeBtn = getElement('.enlarged-gallery__btn-close');
    this.largeBtnPrev = getElement('.main-image__btn-prev')
    this.largeBtnNext = getElement('.main-image__btn-next')

// Binding
// Set auto openning of modal on click on any of images
    this.set.addEventListener('click', function(e){
      if(e.target.classList.contains('mini-image-img')){
        this.openModal(e.target, this.itemsList)
      }
    }.bind(this)
    );

    this.closeModal = this.closeModal.bind(this);
    this.setMainImg = this.setMainImg.bind(this);
    this.setHeader = this.setHeader.bind(this);
    this.setMiniaturesList = this.setMiniaturesList.bind(this);
  }

  openModal(selectedImg, list){
    this.modal.classList.add('active');
    this.closeBtn.addEventListener('click', this.closeModal);
    this.setMainImg(selectedImg);
    this.setHeader(selectedImg);
    this.setMiniaturesList()
  }

  closeModal(){
    this.modal.classList.remove('active');
  }

  setMainImg(selectedImg){
    this.largeImage.src = selectedImg.src;
  }

  setHeader(selectedImg){
    this.header.innerText = selectedImg.dataset.tag;
  }

  setMiniaturesList(){
    console.log(this.itemsList);
    let imagesHTML = this.itemsList.map((img) => {
      return `<img src="${img.src}" alt="" srcset="" data-tag="${img.dataset.tag}" class="preview-image-img non-active">`
    }).join('');
    console.log(imagesHTML);
    this.miniaturesContainer.insertAdjacentHTML('afterbegin', imagesHTML);
  }
}



const gallerySetOne = new Gallery(getElement('.container-cats'));
const gallerySetTwo = new Gallery(getElement('.container-dogs'));
