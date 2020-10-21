import Observer from '../utils/observer';
import {MenuItem} from '../const';

export default class Menu extends Observer {
  constructor() {
    super();

    this._activeMenuItem = MenuItem.FILTER;
  }

  setMenuItem(updateType, item) {
    this._activeMenuItem = item;
    this._notify(updateType, item);
  }

  getMenuItem() {
    return this._activeMenuItem;
  }
}
