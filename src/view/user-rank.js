import AbstractView from './abstract';
import {getUserRank} from '../utils/user';

const createUserRankTemplate = (filmsModel) => {
  const watchedFilmsCount = [...filmsModel.getFilms()].filter((film) => film.isWatched).length;
  const userRank = getUserRank(watchedFilmsCount);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank extends AbstractView {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this._updateUser = this._updateUser.bind(this);

    this._filmsModel.addObserver(this._updateUser);
  }

  getTemplate() {
    return createUserRankTemplate(this._filmsModel);
  }

  _updateUser() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;
  }
}
