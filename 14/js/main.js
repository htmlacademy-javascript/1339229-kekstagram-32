import { renderGalleryThumbnails } from './photo-thumbnail.js';
import { getData, sendData } from './api.js';
import { showAlert, debounce } from './util.js';
import { setOnUserFormSubmit, closeEditingImageForm } from './form.js';
import { showUploadSuccessMessage, showUploadErrorMessage } from './responses.js';
import { init as initFilter, getFilteredPictures } from './filters.js';

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
  const debounceRenderGallary = debounce(renderGalleryThumbnails);
  initFilter(data, debounceRenderGallary);
  renderGalleryThumbnails(getFilteredPictures());
} catch {
  showAlert();
}
