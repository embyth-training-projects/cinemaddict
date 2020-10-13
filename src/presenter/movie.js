import FilmCardView from '../view/movie-card';
import FilmDetailsView from '../view/movie-details';
import {render, replace, remove, addChild, deleteChild} from '../utils/render';

export default class Film {
  constructor(filmsListContainer) {
    this._filmsListContainer = filmsListContainer;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._handleDetailsOpen = this._handleDetailsOpen.bind(this);
    this._handleDetailsClose = this._handleDetailsClose.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmComponent.openDetailsClickHandler(this._handleDetailsOpen);
    this._filmDetailsComponent.closeDetailsClickHandler(this._handleDetailsClose);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmsListContainer, this._filmComponent);
      return;
    }

    if (this._filmsListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._filmsListContainer.getElement().contains(prevFilmDetailsComponent.getElement())) {
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
}
