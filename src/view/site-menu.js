import AbstarctView from './abstract';
import {FilterType, MenuItem} from '../const';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {name, type, count} = filter;
  const createFilterItemCountTemplate = () => `${name} <span class="main-navigation__item-count">${count}</span>`;

  return (
    `<a href="#${type}" data-filter-type="${type}" data-menu-item="${MenuItem.FILTER}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">
      ${type === FilterType.ALL ? name : createFilterItemCountTemplate()}
    </a>`
  );
};

const createSiteMenuTemplate = (filters, currentFilterType, currentMenuItem) => {
  const currentActiveItem = (currentMenuItem === MenuItem.FILTER) ? currentFilterType : currentMenuItem;
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentActiveItem))
    .join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" data-menu-item="${MenuItem.STATISTICS}" class="main-navigation__additional ${currentActiveItem === MenuItem.STATISTICS ? `main-navigation__item--active` : ``}">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstarctView {
  constructor(filters, currentFilterType, currentMenuItem) {
    super();

    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._currentMenuItem = currentMenuItem;

    this._filterTypeClickHandler = this._filterTypeClickHandler.bind(this);
    this._menuItemClickHandler = this._menuItemClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilterType, this._currentMenuItem);
  }

  _filterTypeClickHandler(evt) {
    let target = evt.target;
    if (target.parentElement.tagName === `A`) {
      target = evt.target.parentElement;
    }

    evt.preventDefault();
    this._callback.filterClick(target.dataset.filterType);
  }

  setFilterTypeClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement()
      .querySelectorAll(`.main-navigation__item`)
      .forEach((item) => item.addEventListener(`click`, this._filterTypeClickHandler));
  }

  _menuItemClickHandler(evt) {
    let target = evt.target;
    if (target.parentElement.tagName === `A`) {
      target = evt.target.parentElement;
    }

    evt.preventDefault();
    this._callback.menuClick(target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement()
      .querySelectorAll(`.main-navigation__item, .main-navigation__additional`)
      .forEach((item) => item.addEventListener(`click`, this._menuItemClickHandler));
  }
}
