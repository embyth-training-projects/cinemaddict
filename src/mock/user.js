import {getRandomInteger, getRandomElement} from '../utils';
import {AVATAR_PATHS} from '../const';

export const generateUser = () => {
  const MIN_VIEWED_MOVIES = 0;
  const MAX_VIEWED_MOVIES = 50;

  return {
    moviesViewed: getRandomInteger(MIN_VIEWED_MOVIES, MAX_VIEWED_MOVIES),
    avatar: getRandomElement(AVATAR_PATHS),
  };
};
