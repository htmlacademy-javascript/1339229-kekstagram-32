import {photoFull} from './const.js';

const commentsListTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList = photoFull.querySelector('.social__comments');
//const commentsCount = photoFull.querySelector('.social__comment-count');
const commentsShowCount = photoFull.querySelector('.social__comment-shown-count');
const commentsTotalCount = photoFull.querySelector('.social__comment-total-count');
const commentsLoader = photoFull.querySelector('.comments-loader');
const COMMENTS_STEP = 5;
let currentComments = [];

//создание комментария
const createListComment = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = commentsListTemplate.cloneNode(true);
    commentElement.dataset.id = comment.id;
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.append(commentElement);
  });
  commentsList.append(commentsListFragment);
};

function onCommentsLoaderClick() {
  const shownComments = commentsList.childElementCount;
  let endOfSlice = shownComments + COMMENTS_STEP;
  const isAllCommentsShown = endOfSlice >= currentComments.length;
  endOfSlice = isAllCommentsShown ? currentComments.length : endOfSlice;
  const commentsSlice = currentComments.slice(shownComments, endOfSlice);
  createListComment(commentsSlice);
  commentsShowCount.textContent = endOfSlice;
  commentsLoader.classList.toggle('hidden', isAllCommentsShown);
}

const renderListComments = (comments) => {
  commentsList.textContent = '';
  commentsTotalCount.textContent = comments.length;
  currentComments = comments;
  commentsLoader.click();
};

//очищение списка комментариев
const resetListComments = () => {
  commentsList.innerHTML = '';
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { renderListComments, resetListComments, onCommentsLoaderClick };
