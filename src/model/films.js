import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();

    this._films = [];
  }

  setFilms(films) {
    this._films = films;
  }

  getFilms() {
    return this._films;
  }
}
