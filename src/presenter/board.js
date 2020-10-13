import BoardView from '../view/board';
import SortView from '../view/sort';
import FilmsListView from '../view/films-list';
import NoDataView from '../view/no-data';
import ExtraContainerView from '../view/extra-container';
import FilmPresenter from '../presenter/movie';
import ShowMoreButtonView from '../view/show-more-button';
import {RenderPosition, render, remove} from '../utils/render';
import {sortByDate, sortByRating, sortByComments} from '../utils/sort';
import {MOVIES_AMOUNT, SortType, EXTRA_BLOCK_TITLE} from '../const';

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedMoviesCount = MOVIES_AMOUNT.PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._filmsListComponent = new FilmsListView();
    this._noDataComponent = new NoDataView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    this._renderSort();
    this._renderBoard();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._boardFilms.sort(sortByDate);
        break;
      case SortType.RATING:
        this._boardFilms.sort(sortByRating);
        break;
      case SortType.COMMENTS:
        this._boardFilms.sort(sortByComments);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((film) => this._renderFilm(this._filmsListComponent.getContainer(), film));
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

  _clearFilmsList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._renderedMoviesCount = MOVIES_AMOUNT.PER_STEP;
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, MOVIES_AMOUNT.PER_STEP));

    if (this._boardFilms.length > MOVIES_AMOUNT.PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderExtraList(title) {
    const extraListComponent = new ExtraContainerView(title);

    render(this._boardComponent, extraListComponent);

    const slicedFilms = this._boardFilms.slice();

    switch (title) {
      case EXTRA_BLOCK_TITLE.TOP_RATED:
        slicedFilms
          .sort(sortByRating)
          .slice(0, MOVIES_AMOUNT.TOP_RATED)
          .forEach((film) => this._renderFilm(extraListComponent.getContainer(), film));
        break;
      case EXTRA_BLOCK_TITLE.MOST_COMMENTED:
        slicedFilms
          .sort(sortByComments)
          .slice(0, MOVIES_AMOUNT.MOST_COMMENTED)
          .forEach((film) => this._renderFilm(extraListComponent.getContainer(), film));
        break;
    }
  }

  _renderBoard() {
    render(this._boardContainer, this._boardComponent);

    if (this._boardFilms.length === 0) {
      this._renderNoData();
      return;
    }

    render(this._boardComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    this._renderFilmsList();
    this._renderExtraList(EXTRA_BLOCK_TITLE.TOP_RATED);
    this._renderExtraList(EXTRA_BLOCK_TITLE.MOST_COMMENTED);
  }
}
