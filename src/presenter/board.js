import BoardView from '../view/board';
import SortView from '../view/sort';
import FilmsListView from '../view/films-list';
import NoDataView from '../view/no-data';
import FilmPresenter from '../presenter/movie';
import ExtraContainerView from '../view/extra-container';
import ShowMoreButtonView from '../view/show-more-button';
import {RenderPosition, render, remove} from '../utils/render';
import {sortByDate, sortByRating, sortByComments} from '../utils/sort';
import {MOVIES_AMOUNT, SortType} from '../const';

const extraListType = {
  TOP_RATED: {
    TITLE: `Top rated`,
    AMOUNT: MOVIES_AMOUNT.TOP_RATED,
    SORT: sortByRating,
  },
  MOST_COMMENTED: {
    TITLE: `Most commented`,
    AMOUNT: MOVIES_AMOUNT.MOST_COMMENTED,
    SORT: sortByComments,
  },
};

export default class Board {
  constructor(boardContainer, filmsModel) {
    this._boardContainer = boardContainer;
    this._filmsModel = filmsModel;
    this._renderedMoviesCount = 0;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._filmTopRatedPresenter = {};
    this._filmMostCommentedPresenter = {};

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._filmsListComponent = new FilmsListView();
    this._noDataComponent = new NoDataView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    render(this._boardComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);

    this._renderSort();
    this._renderBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortByRating);
      default:
        return this._filmsModel.getFilms();
    }
  }

  _handleModeChange() {
    [
      ...Object.values(this._filmPresenter),
      ...Object.values(this._filmTopRatedPresenter),
      ...Object.values(this._filmMostCommentedPresenter)
    ].forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    if (this._filmPresenter[updatedFilm.id]) {
      this._filmPresenter[updatedFilm.id].init(updatedFilm);
    }

    if (this._filmTopRatedPresenter[updatedFilm.id]) {
      this._filmTopRatedPresenter[updatedFilm.id].init(updatedFilm);
    }

    if (this._filmMostCommentedPresenter[updatedFilm.id]) {
      this._filmMostCommentedPresenter[updatedFilm.id].init(updatedFilm);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmsList();
    this._renderFilmsList();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, container, type) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);

    switch (type) {
      case extraListType.TOP_RATED:
        this._filmTopRatedPresenter[film.id] = filmPresenter;
        break;
      case extraListType.MOST_COMMENTED:
        this._filmMostCommentedPresenter[film.id] = filmPresenter;
        break;
      default:
        this._filmPresenter[film.id] = filmPresenter;
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film, this._filmsListComponent.getContainer()));
  }

  _renderNoData() {
    render(this._boardComponent, this._noDataComponent);
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedMoviesCount + MOVIES_AMOUNT.PER_STEP);
    const films = this._getFilms().slice(this._renderedMoviesCount, newRenderedFilmsCount);

    this._renderFilms(films);
    this._renderedMoviesCount = newRenderedFilmsCount;

    if (this._renderedMoviesCount >= filmsCount) {
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
  }

  _renderFilmsList() {
    const filmsCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmsCount, MOVIES_AMOUNT.PER_STEP));

    this._renderFilms(films);

    if (filmsCount > MOVIES_AMOUNT.PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _initExtraLists(films) {
    this._renderExtraList(extraListType.TOP_RATED, films);
    this._renderExtraList(extraListType.MOST_COMMENTED, films);
  }

  _renderExtraList(listType, films) {
    const slicedFilms = films.slice();
    const extraListComponent = new ExtraContainerView(listType.TITLE);
    render(this._boardComponent, extraListComponent);

    slicedFilms
      .sort(listType.SORT)
      .slice(0, listType.AMOUNT)
      .forEach((film) => this._renderFilm(film, extraListComponent.getContainer(), listType));
  }

  _renderBoard() {
    render(this._boardContainer, this._boardComponent);

    if (this._getFilms().length === 0) {
      this._renderNoData();
      return;
    }

    this._renderFilmsList();
    this._initExtraLists(this._getFilms());
  }
}
