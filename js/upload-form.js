const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[\p{L}\p{N}]{1,19}$/u;

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');

const pristine = new window.Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error',
}, false);

const getHashtags = (value) => value.split(' ').filter(Boolean);

const hasValidHashtags = (value) =>
  getHashtags(value).every((tag) => HASHTAG_PATTERN.test(tag));

const hasAllowedHashtagCount = (value) =>
  getHashtags(value).length <= MAX_HASHTAGS;

const hasUniqueHashtags = (value) => {
  const tags = getHashtags(value.toLowerCase());
  return new Set(tags).size === tags.length;
};

const hasValidCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtags,
  hasValidHashtags,
  'После # укажите от 1 до 19 букв или цифр. Разделяйте хэш-теги пробелами.'
);

pristine.addValidator(
  hashtags,
  hasAllowedHashtagCount,
  'Можно указать не больше пяти хэш-тегов.'
);

pristine.addValidator(
  hashtags,
  hasUniqueHashtags,
  'Хэш-теги не должны повторяться.'
);

pristine.addValidator(
  description,
  hasValidCommentLength,
  'Комментарий не должен быть длиннее 140 символов.'
);

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && evt.target !== hashtags && evt.target !== description) {
    form.reset();
  }
}

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
  }
});

form.addEventListener('reset', () => {
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
});

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
