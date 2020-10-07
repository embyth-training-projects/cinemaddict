import BoardView from '../view/board';
import SortView from '../view/sort';
import FilmsListView from '../view/films-list';
import NoDataView from '../view/no-data';
import ExtraContainerView from '../view/extra-container';
import FilmCardView from '../view/movie-card';
import ShowMoreButtonView from '../view/show-more-button';
import FilmDetailsView from '../view/movie-details';
import {RenderPosition, render, remove, addChild, deleteChild} from '../utils/render';
import {MOVIES_AMOUNT, EXTRA_BLOCK_TITLE} from '../const';

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedMoviesCount = MOVIES_AMOUNT.PER_STEP;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._filmsListComponent = new FilmsListView();
    this._noDataComponent = new NoDataView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    this._renderSort();
    this._renderBoard();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent);
  }

  _renderFilm(film) {
    const filmComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const showFilmDetails = () => {
      addChild(this._boardContainer, filmDetailsComponent);
    };

    const removeFilmDetails = () => {
      deleteChild(filmDetailsComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        removeFilmDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmComponent.openDetailsClickHandler(() => {
      showFilmDetails();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmDetailsComponent.closeDetailsClickHandler(() => {
      removeFilmDetails();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    const filmsContainer = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    render(filmsContainer, filmComponent);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoData() {
    render(this._boardComponent, this._noDataComponent);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedMoviesCount, this._renderedMoviesCount + MOVIES_AMOUNT.PER_STEP);

    this._renderedMoviesCount += MOVIES_AMOUNT.PER_STEP;

    if (this._renderedMoviesCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmsListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmsList() {
    render(this._boardComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    this._renderFilms(0, Math.min(this._boardFilms.length, MOVIES_AMOUNT.PER_STEP));

    if (this._boardFilms.length > MOVIES_AMOUNT.PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    render(this._boardContainer, this._boardComponent);

    if (this._boardFilms.length === 0) {
      this._renderNoData();
    }

    this._renderFilmsList();
  }
}
