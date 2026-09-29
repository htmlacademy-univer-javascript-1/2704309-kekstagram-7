const DESCRIPTIONS = [
  'Красивый день.',
  'Отличное путешествие.',
  'Мой любимый кадр.',
  'Незабываемый момент.',
  'Прекрасный вид.',
  'Хорошее настроение.',
  'Фото с прогулки.',
  'Отдых с друзьями.',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Иван',
  'Анна',
  'Мария',
  'Сергей',
  'Ольга',
  'Дмитрий',
  'Елена',
];

const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

let commentId = 1;

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createMessage = () => {
  const firstMessage = getRandomArrayElement(COMMENT_MESSAGES);

  if (Math.random() < 0.5) {
    return firstMessage;
  }

  const secondMessage = getRandomArrayElement(COMMENT_MESSAGES);

  return `${firstMessage} ${secondMessage}`;
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => {
  const commentsCount = getRandomInteger(0, MAX_COMMENTS);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }

  return comments;
};

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});

const photos = [];

for (let i = 1; i <= PHOTO_COUNT; i++) {
  photos.push(createPhoto(i));
}

void photos;
