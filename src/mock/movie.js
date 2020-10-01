// Функция из интернета по генерации случайного числа из диапазона
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция для генерации даты.
const generateDate = () => {
  const maxDaysGap = getRandomInteger(0, 365);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  let currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate = new Date(currentDate);

  return `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
};

// Функция генерации названия фильма случайным образом
const generateTitle = () => {
  const titles = [
    `Made for Each Other`,
    `Popeye the Sailor Meets Sinbad the Sailor`,
    `Sagebrush Trail`,
    `Santa Claus Conquers the Martians`,
    `The Dance of Life`,
    `The Great Flamarion`,
    `The Man with the Golden Arm`,
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);
  return titles[randomIndex];
};

// Функция генерации названия фильма случайным образом
const generatePosterPath = () => {
  const posters = [
    `images/posters/made-for-each-other.png`,
    `images/posters/popeye-meets-sinbad.png`,
    `images/posters/sagebrush-trail.jpg`,
    `images/posters/santa-claus-conquers-the-martians.jpg`,
    `images/posters/the-dance-of-life.jpg`,
    `images/posters/the-great-flamarion.jpg`,
    `images/posters/the-man-with-the-golden-arm.jpg`,
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);
  return posters[randomIndex];
};

// Функция генерации описания фильма случайным образом
const generateDescription = () => {
  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  const MAX_DESCRIPTION_LENGTH = 140;
  const MAX_DESCRIPTION_SENTENCES = 5;
  const MIN_DESCRIPTION_SENTENCES = 1;

  const sentencesAmount = getRandomInteger(MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES);
  let randomDescriptions = [];

  for (let i = 0; i < sentencesAmount; i++) {
    const randomIndex = getRandomInteger(0, sentences.length - 1);
    randomDescriptions.push(sentences[randomIndex]);
  }

  const description = randomDescriptions.join(` `);

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + `...`;
  }

  return description;
};

// Функция генерации комментариев к фильми случайным образом
const generateComments = () => {
  const emotions = [`smile`, `sleeping`, `puke`, `angry`];
  const authors = [`Max Kolesnik`, `Vladislav Matyash`, `Nazar Mirniy`, `Sergey Soroka`, `Omar Habuniia`];
  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  const MIN_COMMENTS_AMOUNT = 0;
  const MAX_COMMENTS_AMOUNT = 5;

  const commentsAmount = getRandomInteger(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT);
  const randomComments = [];

  for (let i = 0; i < commentsAmount; i++) {
    const emoji = emotions[getRandomInteger(0, emotions.length - 1)];
    const date = generateDate();
    const author = authors[getRandomInteger(0, authors.length - 1)];
    const comment = sentences[getRandomInteger(0, sentences.length - 1)];

    const commentItem = {emoji, date, author, comment};
    randomComments.push(commentItem);
  }

  return randomComments;
};

// Функция генерации рейтинга фильма случайным образом
const generateRating = () => getRandomInteger(10, 100) / 10;

// Функция генерации возросного рейтинга фильма случайным образом
const generateAgeRating = () => {
  const ageRatings = [`6+`, `12+`, `16+`, `18+`];

  const randomIndex = getRandomInteger(0, ageRatings.length - 1);
  return ageRatings[randomIndex];
};

// Функция генерации режиссера фильма случайным образом
const generateDirector = () => {
  const directors = [
    `John Cromwell`,
    `Dave Fleischer`,
    `Armand Schaefer`,
    `Nicholas Webster`,
    `A. Edward Sutherland`,
    `Anthony Mann`,
    `Otto Preminger`,
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);
  return directors[randomIndex];
};

// Функция генерации сценаристов фильма случайным образом
const generateWriters = () => {
  const writers = [
    `Rose Franken`,
    `Max Fleischer`,
    `Lindsley Parsons`,
    `Glenville Mareth`,
    `Benjamin Glazer`,
    `Heinz Herald`,
    `Richard Weil`,
    `Anne Wigton`,
    `Walter Newman`,
    `Lewis Meltzer`,
  ];

  const MIN_WRITERS_AMOUNT = 1;
  const MAX_WRITERS_AMOUNT = 4;

  const writersAmount = getRandomInteger(MIN_WRITERS_AMOUNT, MAX_WRITERS_AMOUNT);
  const randomWriters = [];

  for (let i = 0; i < writersAmount; i++) {
    const randomIndex = getRandomInteger(0, writers.length - 1);
    randomWriters.push(writers[randomIndex]);
  }

  return randomWriters;
};

// Функция генерации актеров фильма случайным образом
const generateActors = () => {
  const actors = [
    `Carole Lombard`,
    `James Stewart`,
    `Jack Mercer`,
    `Mae Questel`,
    `Gus Wickie`,
    `John Wayne`,
    `Nancy Shubert`,
    `Lane Chandler`,
    `John Call`,
    `Leonard Hicks`,
    `Vincent Beck`,
    `Hal Skelly`,
    `Nancy Carroll`,
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Frank Sinatra`,
    `Eleanor Parker`,
    `Kim Novak`,
  ];

  const MIN_ACTORS_AMOUNT = 1;
  const MAX_ACTORS_AMOUNT = 4;

  const actorsAmount = getRandomInteger(MIN_ACTORS_AMOUNT, MAX_ACTORS_AMOUNT);
  const randomActors = [];

  for (let i = 0; i < actorsAmount; i++) {
    const randomIndex = getRandomInteger(0, actors.length - 1);
    randomActors.push(actors[randomIndex]);
  }

  return randomActors;
};

// Функция генерации обьекта релиза фильма случайным образом
const generateRelease = () => {
  const countries = [
    `Russia`,
    `USA`,
    `India`,
    `China`,
    `UK`,
    `Italia`,
  ];

  return {
    date: generateDate(),
    releaseCountry: countries[getRandomInteger(0, countries.length - 1)]
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
  const genres = [
    `Drama`,
    `Thriller`,
    `Western`,
    `Fantasy`,
    `Comedy`,
  ];

  const MIN_GENRES_AMOUNT = 1;
  const MAX_GENRES_AMOUNT = 4;

  const genresAmount = getRandomInteger(MIN_GENRES_AMOUNT, MAX_GENRES_AMOUNT);
  const randomGenres = [];

  for (let i = 0; i < genresAmount; i++) {
    const randomIndex = getRandomInteger(0, genres.length - 1);
    randomGenres.push(genres[randomIndex]);
  }

  return randomGenres;
};

// Функция-генератор карточки фильма
export const generateMovie = () => {
  return {
    comments: generateComments(),
    filmInfo: {
      title: generateTitle(),
      alternativeTitle: generateTitle(),
      poster: generatePosterPath(),
      description: generateDescription(),
      totalRating: generateRating(),
      ageRating: generateAgeRating(),
      director: generateDirector(),
      writers: generateWriters(),
      actors: generateActors(),
      release: generateRelease(),
      runtime: generateRuntime(),
      genre: generateGenres(),
    },
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      favorite: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: generateDate(),
    }
  };
};
