import {renderFullPhoto} from './photo-full.js';

const galleryContainer = document.querySelector('.pictures');
const photoThumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderGalleryThumbnails = (thumbnails) => {
  const galleryImageFragment = document.createDocumentFragment();

  thumbnails.forEach(({ id, url, description, likes, comments }) => {
    const galleryImage = photoThumbnailTemplate.cloneNode(true);
    galleryImage.dataset.id = id;
    galleryImage.querySelector('.picture__img').src = url;
    galleryImage.querySelector('.picture__img').alt = description;
    galleryImage.querySelector('.picture__likes').textContent = likes;
    galleryImage.querySelector('.picture__comments').textContent = comments.length;
    galleryImage.addEventListener('click', () => {
      renderFullPhoto({url, description, comments, likes});
    });
    galleryImageFragment.appendChild(galleryImage);
  });
  galleryContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  galleryContainer.appendChild(galleryImageFragment);
};

export { renderGalleryThumbnails };


