import { isEscapeKey } from './util.js';
import {resetScale } from './scale.js';
import {
  init as initEffects,
  reset as resetEffects
} from './effect.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const INVALID_MAX_COMMENT_LENGTH = 'длина комментария не может быть больше 140 символов';

const errorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_HASHTAG: 'Неправильный хэштег'
};

const uploadForm = document.querySelector('.img-upload__form');
const closeFormButton = document.querySelector('.img-upload__cancel');
const editForm = document.querySelector('.img-upload__overlay');
const fileField = document.querySelector('.img-upload__input');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

function openEditingImageForm() {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeEditingImageForm() {
  uploadForm.reset();
  pristine.reset();//сбрасывает значения в форме редактирования
  resetScale();
  resetEffects();
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const isCommentValid = (value) => value.length <= MAX_COMMENT_LENGTH;

//нормализуем символы хэштега для последующей проверки
const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

//принимаем хэштеги, проверяем каждый из них на валидность и если ходя бы один не валидный, функция становится false:
const isValidTags = (tags) => normalizeTags(tags).every((tag) => VALID_HASHTAG.test(tag));

const isValidCountTags = (tags) => normalizeTags(tags).length <= MAX_HASHTAG_COUNT;

const isUniqueTags = (tags) => {
  const lowerCaseTags = normalizeTags(tags).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeEditingImageForm();
  }
}

pristine.addValidator(
  commentField,
  isCommentValid,
  INVALID_MAX_COMMENT_LENGTH
);

pristine.addValidator(
  hashtagField,
  isValidCountTags,
  errorText.INVALID_COUNT,
  3,//вес: на сколько важная ошибка, то есть это первая по важности валидация, сначала проверяем количество хэштегов...
  true
);

pristine.addValidator(
  hashtagField,
  isUniqueTags,
  errorText.NOT_UNIQUE,
  2,//...потом проверяем уникальность...
  true
);

pristine.addValidator(
  hashtagField,
  isValidTags,
  errorText.INVALID_HASHTAG,
  1,//...потом правильный ли хэштег...
  true
);

const onCloseFormButton = () => {
  closeEditingImageForm();
};

const onFieldInputChange = () => {
  openEditingImageForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();//не отправляем форму
  pristine.validate();//валидируем форму
};

fileField.addEventListener('change', onFieldInputChange);
closeFormButton.addEventListener('click', onCloseFormButton);
uploadForm.addEventListener('submit', onFormSubmit);
initEffects();
