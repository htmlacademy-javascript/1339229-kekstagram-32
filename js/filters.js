const PICTURES__COUNT = 10;
const Filter = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  DEFAULT: 'filter-default'
};

const filtersContainer = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let pictures = [];

//функция сортировки случайных фото
const sortRandomly = () => Math.random() - 0.5;

//функция сортировки по количеству комментариев, по убыванию
const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES__COUNT);//показать десять фото
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const onButtonFilterClick = (callback) => {
  filtersContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filtersContainer
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');

    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFilteredPictures());
  });
};

const init = (loadedPictures, callback) => {
  filtersContainer.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  onButtonFilterClick(callback);
};

export { init, getFilteredPictures };

