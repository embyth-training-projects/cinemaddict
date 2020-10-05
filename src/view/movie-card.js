import {createElement} from '../utils';

const checkDescriptionLength = (description) => {
  const MAX_DESCRIPTION_LENGTH = 140;

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + `...`;
  }

  return description;
};

const isControlItemActive = (item) => item ? `film-card__controls-item--active` : ``;

const createFilmCardTemplate = (movie) => {
  const {comments} = movie;
  const {filmInfo: {title, totalRating, poster, runtime, description, release, genres}} = movie;
  const {userDetails: {watchlist, favorite, alreadyWatched}} = movie;

  const releaseYear = release.date.getFullYear();

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${checkDescriptionLength(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isControlItemActive(watchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isControlItemActive(alreadyWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isControlItemActive(favorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(movie) {
    this._movie = movie;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._movie);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
