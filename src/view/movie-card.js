import AbstarctView from './abstract';
import {getFormattedRuntime} from '../utils/date';

const checkDescriptionLength = (description) => {
  const MAX_DESCRIPTION_LENGTH = 140;

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + `...`;
  }

  return description;
};

const isControlItemActive = (item) => item ? `film-card__controls-item--active` : ``;

const createFilmCardTemplate = (movie) => {
  const {title, totalRating, poster, runtime, description, release, genres, comments, isWatchlisted, isFavorite, isWatched} = movie;

  const releaseYear = release.date.getFullYear();
  const formattedRuntime = getFormattedRuntime(runtime);

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${formattedRuntime}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${checkDescriptionLength(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isControlItemActive(isWatchlisted)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isControlItemActive(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isControlItemActive(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstarctView {
  constructor(movie) {
    super();

    this._movie = movie;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._movie);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  openDetailsClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((item) => item.addEventListener(`click`, this._clickHandler));
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }
}
