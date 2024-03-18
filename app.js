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
    this.mainBtnPrev = getElement('.main-image__btn-prev');
    this.mainBtnNext = getElement('.main-image__btn-next');
    this.miniaturesBtnPrev = getElement('.previews__btn-prev');
    this.miniaturesBtnNext = getElement('.previews__btn-next');
    this.currentSlide = 0;

// Binding
// Set auto openning of modal on click on any of images
    this.closeModal = this.closeModal.bind(this);
    this.setMainImg = this.setMainImg.bind(this);
    this.setHeader = this.setHeader.bind(this);
    this.setMiniaturesList = this.setMiniaturesList.bind(this);
    this.mainPrevImage = this.mainPrevImage.bind(this);
    this.mainNextImage = this.mainNextImage.bind(this);
    this.selectActiveMiniature = this.selectActiveMiniature.bind(this);
    this.miniaturesPrevImages = this.miniaturesPrevImages.bind(this);
    this.miniaturesNextImages = this.miniaturesNextImages.bind(this);
    this.set.addEventListener('click', function(e){
      if(e.target.classList.contains('mini-image-img')){
        this.openModal(e.target, this.itemsList)
      }
    }.bind(this)
    );


  }

  openModal(selectedImg, list){
    this.modal.classList.add('active');
    this.closeBtn.addEventListener('click', this.closeModal);
    this.setMainImg(selectedImg);
    this.setHeader(selectedImg);
    this.setMiniaturesList();
    this.selectActiveMiniature(selectedImg);    

    this.mainBtnPrev.addEventListener('click', this.mainPrevImage);
    this.mainBtnNext.addEventListener('click', this.mainNextImage);
    this.miniaturesBtnPrev.addEventListener('click', this.miniaturesPrevImages);
    this.miniaturesBtnNext.addEventListener('click', this.miniaturesNextImages);
  }

  closeModal(){
    this.modal.classList.remove('active');
    this.closeBtn.removeEventListener('click', this.closeModal);
    this.mainBtnPrev.removeEventListener('click', this.mainPrevImage);
    this.mainBtnNext.removeEventListener('click', this.mainNextImage);
    this.miniaturesBtnPrev.removeEventListener('click', this.miniaturesPrevImages);
    this.miniaturesBtnNext.removeEventListener('click', this.miniaturesNextImages);
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

  mainPrevImage() {
    // 2. In the itemsList find index of selectedElement
    let imageIndex = this.itemsList.findIndex((item) => {
      return item.dataset.id === this.mainImage.dataset.id
    })
    // 3. Get item with position -1/+1 
    // 3.1 If position is smaller than 0, then get index with itemsList length
    // 3.2 If position is larger than itemsList length, then change index to 0    
    if (imageIndex <= 0) {
      imageIndex = this.itemsList.length - 1;
    } else {
      imageIndex = imageIndex - 1;
    }
    // 4. Change selectedElement src data: src, id ... to data from folund element in the array
    this.mainImage.src = this.itemsList[imageIndex].src;
    this.mainImage.dataset.tag = this.itemsList[imageIndex].dataset.tag;
    this.mainImage.dataset.id = this.itemsList[imageIndex].dataset.id;

    // 5. Run selectActiveMiniature
    this.selectActiveMiniature(this.mainImage); 
  } 

  mainNextImage() {
    let imageIndex = this.itemsList.findIndex((item) => {
      return item.dataset.id === this.mainImage.dataset.id
    })
 
    if (imageIndex >= this.itemsList.length - 1) {
      imageIndex = 0;
    } else {
      imageIndex = imageIndex + 1;
    }
    this.mainImage.src = this.itemsList[imageIndex].src;
    this.mainImage.dataset.tag = this.itemsList[imageIndex].dataset.tag;
    this.mainImage.dataset.id = this.itemsList[imageIndex].dataset.id;

    this.selectActiveMiniature(this.mainImage); 
  }

  selectActiveMiniature(selectedImg){
    let previewImages = [...this.miniaturesContainer.querySelectorAll('.preview-image-img')];
    let selectedId = selectedImg.dataset.id;
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

// Carousel for miniatures preview
  miniaturesPrevImages(){
    const containerWidth = this.miniaturesContainer.offsetWidth;
    const moveDistance = containerWidth / 4;

    // Calculate new scroll position
    let newScrollLeft = this.miniaturesContainer.scrollLeft - moveDistance;
    if (newScrollLeft < 0) {
      // If scrolling past the start, move to the end (carousel effect)
      newScrollLeft = this.miniaturesContainer.scrollWidth - containerWidth;
    }

    // Scroll the container
    this.miniaturesContainer.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }

  miniaturesNextImages(){
    const containerWidth = this.miniaturesContainer.offsetWidth;
    const moveDistance = containerWidth / 4;

    // Calculate new scroll position
    let newScrollLeft = this.miniaturesContainer.scrollLeft + moveDistance;
    if (newScrollLeft + containerWidth > this.miniaturesContainer.scrollWidth) {
      // If scrolling past the end, move to the start (carousel effect)
      newScrollLeft = 0;
    }

    // Scroll the container
    this.miniaturesContainer.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }
}



const gallerySetOne = new Gallery(getElement('.container-cats'));
const gallerySetTwo = new Gallery(getElement('.container-dogs'));
