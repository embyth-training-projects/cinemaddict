import BoardView from '../view/board';
import SortView from '../view/sort';
import FilmsListView from '../view/films-list';
import NoDataView from '../view/no-data';
import FilmPresenter from '../presenter/movie';
import ExtraContainerView from '../view/extra-container';
import ShowMoreButtonView from '../view/show-more-button';
import {RenderPosition, render, remove} from '../utils/render';
import {updateItem} from '../utils/common';
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
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
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

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    this._renderSort();
    this._renderBoard();
  }

  _handleModeChange() {
    [
      ...Object.values(this._filmPresenter),
      ...Object.values(this._filmTopRatedPresenter),
      ...Object.values(this._filmMostCommentedPresenter)
    ].forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedFilm);

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
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderExtraFilm(container, film, type) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);

    switch (type) {
      case extraListType.TOP_RATED:
        this._filmTopRatedPresenter[film.id] = filmPresenter;
        break;
      case extraListType.MOST_COMMENTED:
        this._filmMostCommentedPresenter[film.id] = filmPresenter;
        break;
    }
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
  }

  _renderFilmsList() {
    render(this._boardComponent, this._filmsListComponent, RenderPosition.AFTERBEGIN);
    this._renderedMoviesCount = Math.min(this._boardFilms.length, MOVIES_AMOUNT.PER_STEP);
    this._renderFilms(0, this._renderedMoviesCount);

    if (this._boardFilms.length > MOVIES_AMOUNT.PER_STEP) {
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
      .forEach((film) => this._renderExtraFilm(extraListComponent.getContainer(), film, listType));
  }

  _renderBoard() {
    render(this._boardContainer, this._boardComponent);

    if (this._boardFilms.length === 0) {
      this._renderNoData();
      return;
    }

    this._renderFilmsList();
    this._initExtraLists(this._boardFilms);
  }
}
