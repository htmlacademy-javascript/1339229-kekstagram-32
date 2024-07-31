const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

//генерирует случайное число
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//генерирует случайные идентификаторы со сквозным нумерованием
const createIDGenerator = () => {
  let numberID = 0;

  return () => {
    numberID += 1;
    return numberID;
  };
};
const generateRandomId = createIDGenerator();

//выбирает случайный элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

//сообщение об ошибке при загрузке с сервера
const showAlert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomInteger, getRandomArrayElement, generateRandomId, isEscapeKey, showAlert };
