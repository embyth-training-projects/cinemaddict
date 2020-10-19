import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.isWatchlisted),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.isWatched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.isFavorite),
};
