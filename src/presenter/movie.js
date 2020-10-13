import FilmCardView from '../view/movie-card';
import FilmDetailsView from '../view/movie-details';
import {render, addChild, deleteChild} from '../utils/render';

export default class Movie {
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

    this._filmComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmComponent.openDetailsClickHandler(this._handleDetailsOpen);
    this._filmDetailsComponent.closeDetailsClickHandler(this._handleDetailsClose);

    render(this._filmsListContainer, this._filmComponent);
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
