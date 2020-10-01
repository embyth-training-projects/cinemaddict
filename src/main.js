// Подключаем необходимые компоненты
import {createUserRankTemplate} from './view/user-rank';
import {createSiteMenuTemplate} from './view/site-menu';
import {createFilmsContainerTemplate} from './view/film-container';
import {createExtraFilmContainerTemplate} from './view/extra-container';
import {createMovieCardTemplate} from './view/movie-card';
import {createShowMoreButtonTemplate} from './view/show-more-button';
// import {createMovieDetailsTemplate} from './view/movie-details';
import {createFooterStatsTemplate} from './view/footer-stats';
import {generateMovie} from './mock/movie';
import {generateFilter} from './mock/filter';
import {generateUser} from './mock/user';

// Количество карточек фильмов в блоках
const MOVIES_AMOUNT = {
  TOTAL: 20,
  PER_STEP: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

// Название доп. блоков
const EXTRA_BLOCK_TITLE = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

// Генерируем необходимые данные для заполнения
const movies = new Array(MOVIES_AMOUNT.TOTAL).fill().map(generateMovie);
const filters = generateFilter(movies);
const user = generateUser();

// Функция отрисовки компонента на страницу
const renderComponent = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

// Функция получения элемента контейнера по заголовку
const getExtraListContainerNode = (title) => {
  const extraBlockNode = Array.from(document.querySelectorAll(`.films-list--extra`))
    .filter((el) => el.innerText.includes(title))[0];
  return extraBlockNode.querySelector(`.films-list__container`);
};

// Отрисовываем информацию о пользователе
const siteHeaderNode = document.querySelector(`.header`);
renderComponent(siteHeaderNode, createUserRankTemplate(user));

// Отрисовываем элементы сортировки и фильтры
const siteMainNode = document.querySelector(`.main`);
renderComponent(siteMainNode, createSiteMenuTemplate(filters));
renderComponent(siteMainNode, createFilmsContainerTemplate());

// Отрисовываем карточки фильмов
const filmsListNode = siteMainNode.querySelector(`.films-list__container`);
movies
  .slice(0, MOVIES_AMOUNT.PER_STEP)
  .forEach((movie) => renderComponent(filmsListNode, createMovieCardTemplate(movie)));

// Отрисовываем кнопку 'Show More' по надобности
if (movies.length > MOVIES_AMOUNT.PER_STEP) {
  let renderedMoviesCount = MOVIES_AMOUNT.PER_STEP;

  const filmsContainerNode = siteMainNode.querySelector(`.films-list`);
  renderComponent(filmsContainerNode, createShowMoreButtonTemplate());

  const showMoreButton = document.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_AMOUNT.PER_STEP)
      .forEach((movie) => renderComponent(filmsListNode, createMovieCardTemplate(movie)));

    renderedMoviesCount += MOVIES_AMOUNT.PER_STEP;

    if (renderedMoviesCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}

// Отрисовываем дополнительные блоки
const filmsParentNode = siteMainNode.querySelector(`.films`);
// Отрисовываем блок с высшем рейтингом фильмов
renderComponent(filmsParentNode, createExtraFilmContainerTemplate(EXTRA_BLOCK_TITLE.TOP_RATED));
movies
  .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
  .slice(0, MOVIES_AMOUNT.TOP_RATED)
  .forEach((movie) => renderComponent(getExtraListContainerNode(EXTRA_BLOCK_TITLE.TOP_RATED), createMovieCardTemplate(movie)));

// Отрисовываем блок с большим количеством комментариев фильмов
renderComponent(filmsParentNode, createExtraFilmContainerTemplate(EXTRA_BLOCK_TITLE.MOST_COMMENTED));
movies
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, MOVIES_AMOUNT.MOST_COMMENTED)
  .forEach((movie) => renderComponent(getExtraListContainerNode(EXTRA_BLOCK_TITLE.MOST_COMMENTED), createMovieCardTemplate(movie)));

// Отрисовываем футер
const footerStatictsNode = document.querySelector(`.footer__statistics`);
renderComponent(footerStatictsNode, createFooterStatsTemplate(movies.length));

// Отрисовываем попап с полной информацией о фильме
// renderComponent(document.body, createMovieDetailsTemplate(movies[0]));
