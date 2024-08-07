import {getRandomInteger, getRandomArrayElement, generateRandomId} from './util.js';

const PHOTO_COUNT = 25;
const COMMENT_COUNT_MIN = 0;
const COMMENT_COUNT_MAX = 30;
const AVATAR_COUNT_MIN = 1;
const AVATAR_COUNT_MAX = 6;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;

const ID = [];
const DESCRIPTION = [
  'Горное озеро',
  'Звёздное небо',
  'Темная лунная ночь',
  'Пантера на охоте',
  'Летний луг',
  'Закат на море',
  'Голубое озеро',
  'Пушистая сирень',
  'Чистое небо',
  'Снежные горы',
  'Розарий',
  'Загадочный лес',
  'Величественный вид',
  'Девушка на лугу',
  'Волшебный лес',
  'Игра теней',
  'Горная река',
  'Деревня в горах',
  'Лавандовое поле',
  'Лунная дорожка',
  'Лучший день',
  'Вид на остров',
  'Багровый закат',
  'Рыжий котёнок',
];

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTS_NAME = [
  'Вера',
  'Мирослава',
  'Данила',
  'Олег',
  'Милана',
  'Владислав',
  'Стефания',
  'Ярослав',
  'Злата',
  'Рогнеда',
  'Богдан',
  'Забава',
  'Любава',
  'Руслан',
  'Елисей',
  'Ростислав',
  'Добрыня',
  'Лада'
];

let randomId;
const getRandomId = () => {
  if (ID.length > PHOTO_COUNT) {
    return 'Фотографии закончились';
  }

  randomId = getRandomInteger(1, PHOTO_COUNT);

  while (ID.includes(randomId)) {
    randomId = getRandomInteger(1, PHOTO_COUNT);
  }
  ID.push(randomId);
  return randomId;
};

const createMessage = () => Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENTS_MESSAGE)).join(' ');

const createComments = () => ({
  id:  generateRandomId(),
  avatar:  `img/avatar-${getRandomInteger(AVATAR_COUNT_MIN, AVATAR_COUNT_MAX)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(COMMENTS_NAME),
});

const createPhotoDescription = () => ({
  id: getRandomId(),
  url:  `photos/${randomId}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
  comments: Array.from({length: getRandomInteger(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX)}, createComments),
});

//запишем создание массива в функцию, чтобы экспортировать функцию
const createPhotosDescription = () => Array.from({length: PHOTO_COUNT}, createPhotoDescription);

export {createPhotosDescription, AVATAR_COUNT_MIN, AVATAR_COUNT_MAX, PHOTO_COUNT};
