import FilmCardView from '../view/movie-card';
import FilmDetailsView from '../view/movie-details';
import {render, replace, remove, addChild, deleteChild} from '../utils/render';

export default class Film {
  constructor(filmsListContainer, changeData) {
    this._filmsListContainer = filmsListContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._handleDetailsOpen = this._handleDetailsOpen.bind(this);
    this._handleDetailsClose = this._handleDetailsClose.bind(this);
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

    this._filmComponent.openDetailsClickHandler(this._handleDetailsOpen);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.closeDetailsClickHandler(this._handleDetailsClose);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmsListContainer, this._filmComponent);
      return;
    }

    if (this._filmsListContainer.contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._filmsListContainer.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  _showFilmDetails() {
    addChild(this._filmsListContainer, this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _removeFilmDetails() {
    deleteChild(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removeFilmDetails();
    }
  }

  _handleDetailsOpen() {
    this._showFilmDetails();
  }

  _handleDetailsClose() {
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
