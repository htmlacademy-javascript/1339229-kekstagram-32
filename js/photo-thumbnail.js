import {createPhotosDescription} from './data.js';

const gallery = document.querySelector('.pictures');
const photoThumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoThumbnails = createPhotosDescription(25);
const galleryImageFragment = document.createDocumentFragment();

photoThumbnails.forEach(({ id, url, description, likes, comments }) => {
  const galleryImage = photoThumbnailTemplate.cloneNode(true);
  galleryImage.dataset.id = id;
  galleryImage.querySelector('.picture__img').src = url;
  galleryImage.querySelector('.picture__img').alt = description;
  galleryImage.querySelector('.picture__likes').textContent = likes;
  galleryImage.querySelector('.picture__comments').textContent = comments.length;
  galleryImageFragment.appendChild(galleryImage);
});

gallery.appendChild(galleryImageFragment);
