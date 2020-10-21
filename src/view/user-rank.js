import AbstarctView from './abstract';
import {getUserRank} from '../utils/common';

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

export default class UserRank extends AbstarctView {
  constructor(user) {
    super();

    this._user = user;
  }

  getTemplate() {
    return createUserRankTemplate(this._user);
  }
}
