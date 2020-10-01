// Мапа где ключи - названия фильтров, а значения - функции-счетчики
const movieToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.userDetails.watchlist).length,
  history: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched).length,
  favorites: (movies) => movies.filter((movie) => movie.userDetails.favorite).length,
};

// Функция-генератор фильтров
export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, moviesAmount]) => {
    return {
      title: filterName,
      amount: moviesAmount(movies),
    };
  });
};
