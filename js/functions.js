//Проверка длины строки
//стрелочная функция, принимает строку и число, проверяет длину строки с заданным числом, по умолчанию возвращает true или false.
//Поэтому условие (if-else) в явном виде писать не надо
const ChekStringLength = (string, maxLength) => string.length <= maxLength;

ChekStringLength('моя первая строка', 20);
ChekStringLength('напишем что-нибудь', 10);

//Является ли строка палиндромом
function isPolindrom(string) {
  const normalString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    newString += normalString[i];
  }
  return normalString === newString;
}
//Другая реализация
function isPalindrom(string) {
  //нормализуем строку: убираем пробелы и делаем все символы маленькими
  const normalString = string.replaceAll(' ', '').toLowerCase();
  //строку превращаем в массив, переворачиваем массив, обратно массив превращаем в строку
  const reversed = normalString.split('').reverse().join('');
  //сравниваем перевернутую строку с нормализованной строкой
  return normalString === reversed;
}

isPolindrom('ДовОд');
isPolindrom('Кекс');
isPolindrom('noon');
isPolindrom(' Лёша на полке клопа нашёл ');

isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('noon');
isPalindrom(' Лёша на полке клопа нашёл ');

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа
function getNumber(string) {
  //приводим к строке, если пришли цифры
  const convertingString = string.toString();
  //объявляем переменную, присваиваем ей пустую строку
  let result = '';

  for (let i = 0; i < convertingString.length; i++) {
    if (!Number.isNaN(parseInt(convertingString[i], 10))) {
      result += convertingString[i];
    }
  }

  if (result !== '') {
    return parseInt(result, 10);
  }
  return NaN;
}

getNumber('Я принесла 0.5 литра молока 12 мая');
getNumber(-1);
getNumber(254);
getNumber('Я принесла кефир');
