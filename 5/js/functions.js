const checkStringLength = (string, maxLength) =>
  string.length <= maxLength;

const isPalindrome = (string) => {
  const normalizedString = string
    .replaceAll(' ', '')
    .toLowerCase();

  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
};

const extractNumber = (value) => {
  const string = value.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);

    if (!Number.isNaN(number)) {
      result += string[i];
    }
  }

  return result === '' ? NaN : parseInt(result, 10);
};
checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');
