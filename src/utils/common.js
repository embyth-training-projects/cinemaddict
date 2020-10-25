import {RANKS} from '../const';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateDate = () => {
  const maxDaysGap = getRandomInteger(0, 365);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  let currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate = new Date(currentDate);

  return currentDate;
};

export const getRandomElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

export const getUserRank = (moviesViewed) => {
  let rank = ``;

  if (moviesViewed >= 1 && moviesViewed <= 10) {
    rank = RANKS[0];
  } else if (moviesViewed >= 11 && moviesViewed <= 20) {
    rank = RANKS[1];
  } else if (moviesViewed > 20) {
    rank = RANKS[2];
  }

  if (rank.length > 0) {
    rank = rank
      .toLowerCase()
      .split(` `)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(` `);
  }

  return rank;
};