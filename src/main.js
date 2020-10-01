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

// Количество карточек фильмов в блоках
const FILMS_AMOUNT = {
  DEFAULT: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

// Название доп. блоков
const EXTRA_BLOCK_TITLE = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

const movies = new Array(FILMS_AMOUNT.DEFAULT).fill().map(generateMovie);

// Функция отрисовки компонента на страницу
const renderComponent = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

// Функция отрисовки карточек фильмов
const renderFilmCards = (container, amount) => {
  for (let i = 0; i < amount; i++) {
    renderComponent(container, createMovieCardTemplate(movies[i]));
  }
};

// Функция получения элемента контейнера по заголовку
const getExtraListContainerNode = (title) => {
  const extraBlockNode = Array.from(document.querySelectorAll(`.films-list--extra`))
    .filter((el) => el.innerText.includes(title))[0];
  return extraBlockNode.querySelector(`.films-list__container`);
};

// Отрисовываем необходимые компоненты
const siteHeaderNode = document.querySelector(`.header`);
renderComponent(siteHeaderNode, createUserRankTemplate());

const siteMainNode = document.querySelector(`.main`);
renderComponent(siteMainNode, createSiteMenuTemplate());
renderComponent(siteMainNode, createFilmsContainerTemplate());

const filmsListNode = siteMainNode.querySelector(`.films-list__container`);
renderFilmCards(filmsListNode, FILMS_AMOUNT.DEFAULT);

const filmsContainerNode = siteMainNode.querySelector(`.films-list`);
renderComponent(filmsContainerNode, createShowMoreButtonTemplate());

const filmsParentNode = siteMainNode.querySelector(`.films`);
renderComponent(filmsParentNode, createExtraFilmContainerTemplate(EXTRA_BLOCK_TITLE.TOP_RATED));
renderFilmCards(getExtraListContainerNode(EXTRA_BLOCK_TITLE.TOP_RATED), FILMS_AMOUNT.TOP_RATED);
renderComponent(filmsParentNode, createExtraFilmContainerTemplate(EXTRA_BLOCK_TITLE.MOST_COMMENTED));
renderFilmCards(getExtraListContainerNode(EXTRA_BLOCK_TITLE.MOST_COMMENTED), FILMS_AMOUNT.MOST_COMMENTED);

const footerStatictsNode = document.querySelector(`.footer__statistics`);
renderComponent(footerStatictsNode, createFooterStatsTemplate(movies.length));
