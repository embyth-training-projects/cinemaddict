import {TITLES, POSTERS, SENTENCES, EMOTIONS, AUTHORS, AGE_RATINGS, DIRECTORS, WRITERS, ACTORS, COUNTRIES, GENRES} from '../const';
import {getRandomInteger, generateDate, getRandomElement} from '../utils';

// Функция генерации описания фильма случайным образом
const generateDescription = () => {
  const MAX_DESCRIPTION_LENGTH = 140;
  const MAX_DESCRIPTION_SENTENCES = 5;
  const MIN_DESCRIPTION_SENTENCES = 1;

  const sentencesAmount = getRandomInteger(MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES);
  let randomDescriptions = [];

  for (let i = 0; i < sentencesAmount; i++) {
    randomDescriptions.push(getRandomElement(SENTENCES));
  }

  const description = randomDescriptions.join(` `);

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + `...`;
  }

  return description;
};

// Функция генерации комментариев к фильми случайным образом
const generateComments = () => {
  const MIN_COMMENTS_AMOUNT = 0;
  const MAX_COMMENTS_AMOUNT = 5;

  const commentsAmount = getRandomInteger(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT);
  const randomComments = [];

  for (let i = 0; i < commentsAmount; i++) {
    const emoji = getRandomElement(EMOTIONS);
    const date = generateDate();
    const author = getRandomElement(AUTHORS);
    const comment = getRandomElement(SENTENCES);

    const commentItem = {emoji, date, author, comment};
    randomComments.push(commentItem);
  }

  return randomComments;
};

// Функция генерации рейтинга фильма случайным образом
const generateRating = () => getRandomInteger(10, 100) / 10;

// Функция генерации сценаристов фильма случайным образом
const generateWriters = () => {
  const MIN_WRITERS_AMOUNT = 1;
  const MAX_WRITERS_AMOUNT = 4;

  const writersAmount = getRandomInteger(MIN_WRITERS_AMOUNT, MAX_WRITERS_AMOUNT);
  const randomWriters = [];

  for (let i = 0; i < writersAmount; i++) {
    randomWriters.push(getRandomElement(WRITERS));
  }

  return randomWriters;
};

// Функция генерации актеров фильма случайным образом
const generateActors = () => {
  const MIN_ACTORS_AMOUNT = 1;
  const MAX_ACTORS_AMOUNT = 4;

  const actorsAmount = getRandomInteger(MIN_ACTORS_AMOUNT, MAX_ACTORS_AMOUNT);
  const randomActors = [];

  for (let i = 0; i < actorsAmount; i++) {
    const randomIndex = getRandomInteger(0, ACTORS.length - 1);
    randomActors.push(ACTORS[randomIndex]);
  }

  return randomActors;
};

// Функция генерации обьекта релиза фильма случайным образом
const generateRelease = () => {
  return {
    date: new Date(getRandomInteger(1895, 2020), getRandomInteger(1, 12), getRandomInteger(1, 30)),
    releaseCountry: getRandomElement(COUNTRIES),
  };
};

// Функция генерации продолжительности фильма случайным образом
const generateRuntime = () => {
  const MIN_FILM_DURATION = 10;
  const MAX_FILM_DURATION = 200;

  const filmDuration = getRandomInteger(MIN_FILM_DURATION, MAX_FILM_DURATION);

  const hour = Math.trunc(filmDuration / 60);
  const minute = Math.ceil(filmDuration / 60 % 1 * 60);

  const hourToString = (hour > 0) ? `${hour}h` : ``;
  const minuteToString = (minute > 0) ? `${minute}m` : ``;

  const result = (hour === 0) ? `${minuteToString}` : `${hourToString} ${minuteToString}`;
  return result;
};

// Функция генерации жанров фильма случайным образом
const generateGenres = () => {
  const MIN_GENRES_AMOUNT = 1;
  const MAX_GENRES_AMOUNT = 4;

  const genresAmount = getRandomInteger(MIN_GENRES_AMOUNT, MAX_GENRES_AMOUNT);
  const randomGenres = [];

  for (let i = 0; i < genresAmount; i++) {
    randomGenres.push(getRandomElement(GENRES));
  }

  return randomGenres;
};

// Функция-генератор карточки фильма
export const generateMovie = () => {
  return {
    comments: generateComments(),
    filmInfo: {
      title: getRandomElement(TITLES),
      alternativeTitle: getRandomElement(TITLES),
      poster: getRandomElement(POSTERS),
      description: generateDescription(),
      totalRating: generateRating(),
      ageRating: getRandomElement(AGE_RATINGS),
      director: getRandomElement(DIRECTORS),
      writers: generateWriters(),
      actors: generateActors(),
      release: generateRelease(),
      runtime: generateRuntime(),
      genres: generateGenres(),
    },
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      favorite: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: generateDate(),
    }
  };
};
