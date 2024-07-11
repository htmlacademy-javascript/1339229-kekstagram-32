import { isEscapeKey } from './util.js';
import {photoFull} from './const.js';
import { renderListComments, resetListComments } from './commenst.js';

const photoFullCloseButton = photoFull.querySelector('.big-picture__cancel');
const fullPhotoImage = photoFull.querySelector('.big-picture__img img');
const descriptionText = photoFull.querySelector('.social__caption');
const likesCount = photoFull.querySelector('.likes-count');
const commentsCount = photoFull.querySelector('.social__comment-count');
const commentsShowCount = photoFull.querySelector('.social__comment-shown-count');
const commentsTotalCount = photoFull.querySelector('.social__comment-total-count');
const commentsLoader = photoFull.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

function dataFullPhoto(dataPicture) {
  fullPhotoImage.src = dataPicture.url;
  descriptionText.textContent = dataPicture.description;
  likesCount.textContent = dataPicture.likes;
  commentsShowCount.textContent = dataPicture.comments.length;
  commentsTotalCount.textContent = dataPicture.comments.length;
}

function renderFullPhoto(dataPicture){
  dataFullPhoto(dataPicture);
  renderListComments(dataPicture.comments);
  openFullPhoto();
}

function openFullPhoto () {
  photoFull.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hiddenn');
}

function closeFullPhoto () {
  photoFull.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetListComments();
}

photoFullCloseButton.addEventListener('click', () => {
  closeFullPhoto();
});

export { renderFullPhoto };
