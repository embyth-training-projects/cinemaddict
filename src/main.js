// Подключаем необходимые компоненты
import UserRankView from './view/user-rank';
import SiteMenuView from './view/site-menu';
import SortView from './view/sort';
import BoardView from './view/board';
import FilmsListView from './view/films-list';
import ExtraContainerView from './view/extra-container';
import FilmCardView from './view/movie-card';
import ShowMoreButtonView from './view/show-more-button';
import FilmDetailsView from './view/movie-details';
import FooterStatsView from './view/footer-stats';
import {generateMovie} from './mock/movie';
import {generateFilter} from './mock/filter';
import {generateUser} from './mock/user';
import {RenderPosition, render} from './utils';

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

// Отрисовываем информацию о пользователе
const siteHeaderNode = document.querySelector(`.header`);
render(siteHeaderNode, new UserRankView(user).getElement());

// Отрисовываем элементы сортировки и фильтры
const siteMainNode = document.querySelector(`.main`);
render(siteMainNode, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainNode, new SortView().getElement());

const boardComponent = new BoardView();
render(siteMainNode, boardComponent.getElement());

const filmsListComponent = new FilmsListView();
render(boardComponent.getElement(), filmsListComponent.getElement(), RenderPosition.AFTERBEGIN);

// Отрисовываем карточки фильмов
const filmsContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);
movies
  .slice(0, MOVIES_AMOUNT.PER_STEP)
  .forEach((movie) => render(filmsContainer, new FilmCardView(movie).getElement()));

// Отрисовываем кнопку 'Show More' по надобности
if (movies.length > MOVIES_AMOUNT.PER_STEP) {
  const showMoreButtonComponent = new ShowMoreButtonView();
  let renderedMoviesCount = MOVIES_AMOUNT.PER_STEP;

  render(filmsListComponent.getElement(), showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_AMOUNT.PER_STEP)
      .forEach((movie) => render(filmsContainer, new FilmCardView(movie).getElement()));

    renderedMoviesCount += MOVIES_AMOUNT.PER_STEP;

    if (renderedMoviesCount >= movies.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

// Отрисовываем дополнительные блоки
// Отрисовываем блок с высшем рейтингом фильмов
const topRatedList = new ExtraContainerView(EXTRA_BLOCK_TITLE.TOP_RATED);
render(boardComponent.getElement(), topRatedList.getElement());
const topRatedContainer = topRatedList.getElement().querySelector(`.films-list__container`);
movies
  .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
  .slice(0, MOVIES_AMOUNT.TOP_RATED)
  .forEach((movie) => render(topRatedContainer, new FilmCardView(movie).getElement()));

// Отрисовываем блок с большим количеством комментариев фильмов
const mostCommentedList = new ExtraContainerView(EXTRA_BLOCK_TITLE.MOST_COMMENTED);
render(boardComponent.getElement(), mostCommentedList.getElement());
const mostCommentedContainer = mostCommentedList.getElement().querySelector(`.films-list__container`);
movies
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, MOVIES_AMOUNT.MOST_COMMENTED)
  .forEach((movie) => render(mostCommentedContainer, new FilmCardView(movie).getElement()));

// Отрисовываем футер
const footerStatictsNode = document.querySelector(`.footer__statistics`);
render(footerStatictsNode, new FooterStatsView(movies.length).getElement());

// Отрисовываем попап с полной информацией о фильме
render(document.body, new FilmDetailsView(movies[0]).getElement());
