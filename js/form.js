import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import {
  init as initEffects,
  reset as resetEffects
} from './effect.js';
import { pristine, uploadsPicture } from './form-validation.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadForm = document.querySelector('.img-upload__form');
const closeFormButton = document.querySelector('.img-upload__cancel');
const editForm = document.querySelector('.img-upload__overlay');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

//функция открытия окна редактирования файла
function openEditingImageForm() {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

//функция закрытия окна редактирования файла
function closeEditingImageForm() {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetEditingImageForm();
}

function resetEditingImageForm() {
  uploadForm.reset();
  pristine.reset();//сбрасывает значения в форме редактирования
  resetScale();
  resetEffects();
}

//функция проверки фокуса в полях комментария и хэштега
const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageShown()) {
    evt.preventDefault();
    closeEditingImageForm();
  }
}

const onCloseFormButtonClick = () => {
  closeEditingImageForm();
};

const onFieldInputChange = () => {
  uploadsPicture();//добавляет свою фотографию в форму
  openEditingImageForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

//отправка заполненной формы на сервер
const setOnUserFormSubmit = (callback) => {
  uploadForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await callback(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

fileField.addEventListener('change', onFieldInputChange);
closeFormButton.addEventListener('click', onCloseFormButtonClick);
initEffects();

export { setOnUserFormSubmit, closeEditingImageForm, resetEditingImageForm };
