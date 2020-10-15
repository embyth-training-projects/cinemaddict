import FilmCardView from '../view/movie-card';
import FilmDetailsView from '../view/movie-details';
import {render, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class Film {
  constructor(filmsListContainer, changeData, changeMode) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleOpenDetailsClick = this._handleOpenDetailsClick.bind(this);
    this._handleCloseDetailsClick = this._handleCloseDetailsClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmComponent.openDetailsClickHandler(this._handleOpenDetailsClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmsListContainer, this._filmComponent);
      return;
    }

    if (this._filmsListContainer.contains(prevFilmComponent.getElement())) {
      render(document.body, prevFilmDetailsComponent);
    }

    replace(this._filmComponent, prevFilmComponent);

    if (this._mode === Mode.DETAILS) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._removeFilmDetails();
    }
  }

  _showFilmDetails() {
    render(document.body, this._filmDetailsComponent);

    this._filmDetailsComponent.closeDetailsClickHandler(this._handleCloseDetailsClick);
    this._filmDetailsComponent.setInnerHandlers();

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.DETAILS;
  }

  _removeFilmDetails() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._changeData(this._filmDetailsComponent.getUpdatedData());
      this._removeFilmDetails();
    }
  }

  _handleOpenDetailsClick() {
    this._showFilmDetails();
  }

  _handleCloseDetailsClick(film) {
    this._changeData(film);
    this._removeFilmDetails();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlisted: !this._film.isWatchlisted
            }
        )
    );
  }
}
