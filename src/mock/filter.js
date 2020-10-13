// Мапа где ключи - названия фильтров, а значения - функции-счетчики
const movieToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.isWatchlisted).length,
  history: (movies) => movies.filter((movie) => movie.isWatched).length,
  favorites: (movies) => movies.filter((movie) => movie.isFavorite).length,
};

// Функция-генератор фильтров
export const generateFilter = (movies) => {
  return Object
    .entries(movieToFilterMap)
    .map(([filterName, moviesAmount]) => {
      return {
        title: filterName,
        amount: moviesAmount(movies),
      };
    });
};
