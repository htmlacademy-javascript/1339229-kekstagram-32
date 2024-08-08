const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

const onMessageElementClick = () => {
  hideMessage();
};

const showMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  messageElement
    .querySelector(closeButtonClass)
    .addEventListener('click', onMessageElementClick);
};

function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

const showUploadSuccessMessage = () => {
  showMessage(successMessageTemplate, '.success__button');
};

const showUploadErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__button');
};

export { showUploadSuccessMessage, showUploadErrorMessage };
