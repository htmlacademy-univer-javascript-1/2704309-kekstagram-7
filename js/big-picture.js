const COMMENTS_PER_BATCH = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsShownCount = bigPicture.querySelector('.comments-shown-count');
const commentsList = bigPicture.querySelector('.social__comments');
const pictureCaption = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let shownComments = 0;

const renderNextComments = () => {
  const nextComments = currentComments.slice(
    shownComments,
    shownComments + COMMENTS_PER_BATCH
  );
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = 35;
    avatar.height = 35;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentElement.append(avatar, commentText);
    fragment.appendChild(commentElement);
  });

  commentsList.appendChild(fragment);
  shownComments += nextComments.length;
  commentsShownCount.textContent = shownComments;
  commentsLoader.classList.toggle('hidden', shownComments >= currentComments.length);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

const showBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;
  likesCount.textContent = photo.likes;
  pictureCaption.textContent = photo.description;

  currentComments = photo.comments;
  shownComments = 0;
  commentsCount.textContent = currentComments.length;
  commentsList.innerHTML = '';
  commentCount.classList.remove('hidden');
  renderNextComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

commentsLoader.addEventListener('click', renderNextComments);
closeButton.addEventListener('click', closeBigPicture);

export {showBigPicture};
