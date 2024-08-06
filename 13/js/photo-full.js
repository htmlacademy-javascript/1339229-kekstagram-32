import { isEscapeKey, getRandomInteger } from './util.js';
import {AVATAR_COUNT_MIN, AVATAR_COUNT_MAX} from './data.js';
import { renderListComments, resetListComments } from './commenst.js';

const photoFull = document.querySelector('.big-picture');
const photoFullCloseButton = photoFull.querySelector('.big-picture__cancel');
const socialPicture = photoFull.querySelector('.social__picture');
const fullPhotoImage = photoFull.querySelector('.big-picture__img img');
const descriptionText = photoFull.querySelector('.social__caption');
const likesCount = photoFull.querySelector('.likes-count');
const commentsShowCount = photoFull.querySelector('.social__comment-shown-count');
const commentsTotalCount = photoFull.querySelector('.social__comment-total-count');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

function dataFullPhoto(dataPicture) {
  socialPicture.src = `img/avatar-${getRandomInteger(AVATAR_COUNT_MIN, AVATAR_COUNT_MAX)}.svg`;
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
