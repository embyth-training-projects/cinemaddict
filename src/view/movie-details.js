import SmartView from './smart';
import {getFormattedReleaseDate, getFormattedRuntime, getHumanizeCommentDate} from '../utils/date';
import {getRandomElement} from '../utils/common';
import {AUTHORS} from '../const';
import he from 'he';

const EmojiType = {
  SMILE: `smile`,
  SLEEP: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const createGenreItemTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const getEmojiPath = (emoji) => {
  return `images/emoji/${emoji}.png`;
};

const createCommentItemTemplate = (commentItem) => {
  const {emoji, date, author, comment} = commentItem;

  const emojiPath = getEmojiPath(emoji);
  const formattedDate = getHumanizeCommentDate(date);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emojiPath}" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const createSelectedEmojiTemplate = (emoji) => {
  if (!emoji) {
    return ``;
  }

  const emojiPath = getEmojiPath(emoji);

  return (
    `<img src="${emojiPath}" width="55" height="55" alt="emoji-${emoji}">`
  );
};

const createFilmDetailsTemplate = (movie) => {
  const {title, totalRating, poster, runtime, description, release, genres, writers, actors, ageRating, alternativeTitle, director, comments, isWatchlisted, isFavorite, isWatched, userEmoji, userText} = movie;

  const writersToString = writers.join(`, `);
  const actorsToString = actors.join(`, `);
  const releaseDate = getFormattedReleaseDate(release.date);
  const formattedRuntime = getFormattedRuntime(runtime);
  const genresItemsTemplate = genres
    .map(createGenreItemTemplate)
    .join(``);
  const commentsItemsTemplate = comments
    .map(createCommentItemTemplate)
    .join(``);
  const selectedEmojiTemplate = createSelectedEmojiTemplate(userEmoji);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writersToString}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsToString}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formattedRuntime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genresItemsTemplate}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlisted ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">
              Add to watchlist
            </label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">
              Already watched
            </label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">
              Add to favorites
            </label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsItemsTemplate}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${selectedEmojiTemplate}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${userText ? he.encode(userText) : ``}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${userEmoji === EmojiType.SMILE ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${userEmoji === EmojiType.SLEEP ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${userEmoji === EmojiType.PUKE ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${userEmoji === EmojiType.ANGRY ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends SmartView {
  constructor(movie) {
    super();

    this._data = FilmDetails.parseFilmToData(movie);

    this._closeClickHandler = this._closeClickHandler.bind(this);

    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
    this._watchedToggleHandler = this._watchedToggleHandler.bind(this);
    this._watchlistToggleHandler = this._watchlistToggleHandler.bind(this);

    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._userMessageInputHandler = this._userMessageInputHandler.bind(this);
    this._addCommentKeyDownHandler = this._addCommentKeyDownHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);

    this.setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  getUpdatedData() {
    return FilmDetails.parseDataToFilm(this._data);
  }

  setInnerHandlers() {
    this._setFavoriteChangeHandler(this._favoriteToggleHandler);
    this._setWatchedChangeHandler(this._watchedToggleHandler);
    this._setWatchlistChangeHandler(this._watchlistToggleHandler);
    this._setEmojiChangeHandler(this._emojiChangeHandler);
    this._setUserMessageInputHandler(this._userMessageInputHandler);
  }

  restoreHandlers() {
    this.closeDetailsClickHandler(this._callback.closeClick);
    this.setAddCommentKeyDownHandler(this._callback.addCommentKeyDown);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setInnerHandlers();
  }

  closeDetailsClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeClickHandler);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick(FilmDetails.parseDataToFilm(this._data));
  }

  _setFavoriteChangeHandler() {
    this.getElement()
      .querySelector(`#favorite`)
      .addEventListener(`change`, this._favoriteToggleHandler);
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    }, true);
  }

  _setWatchedChangeHandler() {
    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`change`, this._watchedToggleHandler);
  }

  _watchedToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._data.isWatched
    }, true);
  }

  _setWatchlistChangeHandler() {
    this.getElement()
      .querySelector(`#watchlist`)
      .addEventListener(`change`, this._watchlistToggleHandler);
  }

  _watchlistToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatchlisted: !this._data.isWatchlisted
    }, true);
  }

  _setEmojiChangeHandler() {
    this.getElement()
      .querySelectorAll(`.film-details__emoji-item`)
      .forEach((item) => item.addEventListener(`change`, this._emojiChangeHandler));
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    const emoji = evt.target.value;

    this.updateData({
      userEmoji: emoji
    });
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
    .querySelectorAll(`.film-details__comment-delete`)
    .forEach((button, index) => button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._deleteClickHandler(index);
    }));
  }

  _deleteClickHandler(index) {
    this.updateData(Object.assign(
        {},
        this._data,
        {comments: [...this._data.comments.slice(0, index), ...this._data.comments.slice(index + 1)]}
    ), true);

    this._callback.deleteClick(FilmDetails.parseDataToFilm(this._data));
  }

  setAddCommentKeyDownHandler(callback) {
    this._callback.addCommentKeyDown = callback;
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, this._addCommentKeyDownHandler);
  }

  _addCommentKeyDownHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter` && this._data.userText !== null && this._data.userText.length > 0 && this._data.userEmoji !== null) {
      const newComments = [...this._data.comments, this._createComment()];
      this.updateData(Object.assign(
          {},
          this._data,
          {comments: newComments}
      ));
      this._callback.addCommentKeyDown(FilmDetails.parseDataToFilm(this._data));
      this._data.userText = null;
    }
  }

  _setUserMessageInputHandler() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._userMessageInputHandler);
  }

  _userMessageInputHandler(evt) {
    evt.preventDefault();

    this._data.userText = evt.target.value;
  }

  _createComment() {
    return {
      emoji: this._data.userEmoji,
      date: new Date(),
      author: getRandomElement(AUTHORS),
      comment: this._data.userText,
    };
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          userEmoji: null,
          userText: null
        }
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.userEmoji;
    delete data.userText;

    return data;
  }
}
