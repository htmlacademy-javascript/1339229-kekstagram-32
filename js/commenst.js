import {photoFull} from './const.js';

const commentsListTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList = photoFull.querySelector('.social__comments');

//создание комментария
const createComment = ({ avatar, name, message }) => {
  const commentElement = commentsListTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

//отображение списка комментариев
const renderListComments = (comments) => {
  //commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  commentsList.append(fragment);
};

//очищение списка комментариев
const resetListComments = () => {
  commentsList.innerHTML = '';
};

export { renderListComments, resetListComments };
