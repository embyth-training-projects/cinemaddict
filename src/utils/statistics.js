import moment from 'moment';
import {PeriodFilter} from '../const';

export const getGenresFrequencies = (films) => {
  const genresMap = {};

  films.forEach((film) => {
    film.genres.forEach((genre) => {
      if (genre in genresMap) {
        genresMap[genre] += 1;
      } else {
        genresMap[genre] = 1;
      }
    });
  });

  return genresMap;
};

export const filterFilmsByPeriod = (period, films) => {
  switch (period) {
    case PeriodFilter.TODAY:
      return [...films].filter((film) => isWatchedToday(film.watchingDate));
    case PeriodFilter.WEEK:
      return [...films].filter((film) => isWatchedLastWeek(film.watchingDate));
    case PeriodFilter.MONTH:
      return [...films].filter((film) => isWatchedLastMonth(film.watchingDate));
    case PeriodFilter.YEAR:
      return [...films].filter((film) => isWatchedLastYear(film.watchingDate));
  }

  return films;
};

const isWatchedToday = (date) => {
  if (date === null) {
    return false;
  }

  return moment(date).isSame(moment(), `d`);
};

const isWatchedLastWeek = (date) => {
  const today = moment(new Date());
  const lastWeek = moment(today).subtract(1, `w`);

  return moment(date).isBetween(lastWeek, today);
};

const isWatchedLastMonth = (date) => {
  const today = moment(new Date());
  const lastMonth = moment(today).subtract(1, `M`);

  return moment(date).isBetween(lastMonth, today);
};

const isWatchedLastYear = (date) => {
  const today = moment(new Date());
  const lastYear = moment(today).subtract(1, `y`);

  return moment(date).isBetween(lastYear, today);
};
