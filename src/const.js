export const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

export const AUTHORS = [`Max Kolesnik`, `Vladislav Matyash`, `Nazar Mirniy`, `Sergey Soroka`, `Omar Habuniia`];

export const MOVIES_AMOUNT = {
  PER_STEP: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
  COMMENTS: `comments`,
};

export const UserAction = {
  UPDATE_MOVIE: `UPDATE_MOVIE`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const MenuItem = {
  FILTER: `filter`,
  STATISTICS: `stats`,
};

export const PeriodFilter = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};
