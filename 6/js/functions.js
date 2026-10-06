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

const isMeetingWithinWorkingHours = (
  workStart,
  workEnd,
  meetingStart,
  meetingDuration
) => {
  const getMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = getMinutes(workStart);
  const workEndMinutes = getMinutes(workEnd);
  const meetingStartMinutes = getMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return (
    meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes
  );
};

isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkingHours('8:0', '10:0', '8:0', 120);
isMeetingWithinWorkingHours('08:00', '14:30', '14:00', 90);
isMeetingWithinWorkingHours('14:00', '17:30', '08:0', 90);
isMeetingWithinWorkingHours('8:00', '17:30', '08:00', 900);
