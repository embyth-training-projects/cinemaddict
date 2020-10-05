import {RANKS} from '../const';
import {createElement} from '../utils';

// Функция получения звания пользователя
const getUserRank = (moviesViewed) => {
  let rank = ``;

  if (moviesViewed >= 1 && moviesViewed <= 10) {
    rank = RANKS[0];
  } else if (moviesViewed >= 11 && moviesViewed <= 20) {
    rank = RANKS[1];
  } else if (moviesViewed > 20) {
    rank = RANKS[2];
  }

  if (rank.length > 0) {
    rank = rank
      .toLowerCase()
      .split(` `)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(` `);
  }

  return rank;
};

// Фунция создания шаблона звания пользователя
const createUserRankTemplate = (user) => {
  const {moviesViewed, avatar} = user;
  const userRank = getUserRank(moviesViewed);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRank {
  constructor(user) {
    this._user = user;
    this._element = null;
  }

  getTemplate() {
    return createUserRankTemplate(this._user);
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
