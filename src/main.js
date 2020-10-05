// Подключаем необходимые компоненты
import UserRankView from './view/user-rank';
import SiteMenuView from './view/site-menu';
import SortView from './view/sort';
import BoardView from './view/board';
import FilmsListView from './view/films-list';
import NoDataView from './view/no-data';
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

const siteHeaderNode = document.querySelector(`.header`);
const siteMainNode = document.querySelector(`.main`);
const footerStatictsNode = document.querySelector(`.footer__statistics`);

const renderFilm = (filmListContainer, film) => {
  const filmComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const showFilmDetails = () => {
    document.body.appendChild(filmDetailsComponent.getElement());
  };

  const removeFilmDetails = () => {
    document.body.removeChild(filmDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removeFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    showFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    showFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    showFilmDetails();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    removeFilmDetails();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListContainer, filmComponent.getElement());
};

const renderBoard = (boardContainer, boardFilms) => {
  const boardComponent = new BoardView();
  const filmsListComponent = new FilmsListView();

  render(boardContainer, boardComponent.getElement());

  if (boardFilms.length === 0) {
    render(boardComponent.getElement(), new NoDataView().getElement());
    return;
  }

  render(boardComponent.getElement(), filmsListComponent.getElement(), RenderPosition.AFTERBEGIN);

  const filmsContainer = filmsListComponent.getElement().querySelector(`.films-list__container`);
  boardFilms
    .slice(0, MOVIES_AMOUNT.PER_STEP)
    .forEach((movie) => renderFilm(filmsContainer, movie));

  if (boardFilms.length > MOVIES_AMOUNT.PER_STEP) {
    const showMoreButtonComponent = new ShowMoreButtonView();
    let renderedMoviesCount = MOVIES_AMOUNT.PER_STEP;

    render(filmsListComponent.getElement(), showMoreButtonComponent.getElement());

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      boardFilms
        .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_AMOUNT.PER_STEP)
        .forEach((movie) => renderFilm(filmsContainer, movie));

      renderedMoviesCount += MOVIES_AMOUNT.PER_STEP;

      if (renderedMoviesCount >= boardFilms.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  // Отрисовываем блок с высшем рейтингом фильмов
  const topRatedList = new ExtraContainerView(EXTRA_BLOCK_TITLE.TOP_RATED);
  render(boardComponent.getElement(), topRatedList.getElement());
  const topRatedContainer = topRatedList.getElement().querySelector(`.films-list__container`);
  boardFilms
    .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
    .slice(0, MOVIES_AMOUNT.TOP_RATED)
    .forEach((movie) => renderFilm(topRatedContainer, movie));

  // Отрисовываем блок с большим количеством комментариев фильмов
  const mostCommentedList = new ExtraContainerView(EXTRA_BLOCK_TITLE.MOST_COMMENTED);
  render(boardComponent.getElement(), mostCommentedList.getElement());
  const mostCommentedContainer = mostCommentedList.getElement().querySelector(`.films-list__container`);
  boardFilms
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, MOVIES_AMOUNT.MOST_COMMENTED)
    .forEach((movie) => renderFilm(mostCommentedContainer, movie));
};

render(siteHeaderNode, new UserRankView(user).getElement());
render(siteMainNode, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainNode, new SortView().getElement());
renderBoard(siteMainNode, movies);
render(footerStatictsNode, new FooterStatsView(movies.length).getElement());
