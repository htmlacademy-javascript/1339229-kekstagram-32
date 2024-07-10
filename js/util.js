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

export {getRandomInteger, getRandomArrayElement, generateRandomId};
