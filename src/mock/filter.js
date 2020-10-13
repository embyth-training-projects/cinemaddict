// Мапа где ключи - названия фильтров, а значения - функции-счетчики
const movieToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.watchlist).length,
  history: (movies) => movies.filter((movie) => movie.alreadyWatched).length,
  favorites: (movies) => movies.filter((movie) => movie.favorite).length,
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
