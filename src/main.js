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
import {RenderPosition, renderElement} from './utils';

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
renderElement(siteHeaderNode, new UserRankView(user).getElement(), RenderPosition.BEFOREEND);

// Отрисовываем элементы сортировки и фильтры
const siteMainNode = document.querySelector(`.main`);
renderElement(siteMainNode, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainNode, new SortView().getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
renderElement(siteMainNode, boardComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsListView();
renderElement(boardComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

// Отрисовываем карточки фильмов
const filmsContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);
movies
  .slice(0, MOVIES_AMOUNT.PER_STEP)
  .forEach((movie) => renderElement(filmsContainer, new FilmCardView(movie).getElement(), RenderPosition.BEFOREEND));

// Отрисовываем кнопку 'Show More' по надобности
if (movies.length > MOVIES_AMOUNT.PER_STEP) {
  const showMoreButtonComponent = new ShowMoreButtonView();
  let renderedMoviesCount = MOVIES_AMOUNT.PER_STEP;

  renderElement(filmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_AMOUNT.PER_STEP)
      .forEach((movie) => renderElement(filmsContainer, new FilmCardView(movie).getElement(), RenderPosition.BEFOREEND));

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
renderElement(boardComponent.getElement(), topRatedList.getElement(), RenderPosition.BEFOREEND);
const topRatedContainer = topRatedList.getElement().querySelector(`.films-list__container`);
movies
  .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
  .slice(0, MOVIES_AMOUNT.TOP_RATED)
  .forEach((movie) => renderElement(topRatedContainer, new FilmCardView(movie).getElement(), RenderPosition.BEFOREEND));

// Отрисовываем блок с большим количеством комментариев фильмов
const mostCommentedList = new ExtraContainerView(EXTRA_BLOCK_TITLE.MOST_COMMENTED);
renderElement(boardComponent.getElement(), mostCommentedList.getElement(), RenderPosition.BEFOREEND);
const mostCommentedContainer = mostCommentedList.getElement().querySelector(`.films-list__container`);
movies
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, MOVIES_AMOUNT.MOST_COMMENTED)
  .forEach((movie) => renderElement(mostCommentedContainer, new FilmCardView(movie).getElement(), RenderPosition.BEFOREEND));

// Отрисовываем футер
const footerStatictsNode = document.querySelector(`.footer__statistics`);
renderElement(footerStatictsNode, new FooterStatsView(movies.length).getElement(), RenderPosition.BEFOREEND);

// Отрисовываем попап с полной информацией о фильме
renderElement(document.body, new FilmDetailsView(movies[0]).getElement(), RenderPosition.BEFOREEND);
