import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { renderGalleryThumbnails } from './photo-thumbnail.js';
import { setOnUserFormSubmit, closeEditingImageForm } from './form.js';
import { showUploadSuccessMessage, showUploadErrorMessage } from './responses.js';

setOnUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeEditingImageForm();
    showUploadSuccessMessage();
  } catch {
    showUploadErrorMessage();
  }
});

try {
  const data = await getData();
  renderGalleryThumbnails(data);
} catch {
  showAlert();
}

