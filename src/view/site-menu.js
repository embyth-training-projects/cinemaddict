import AbstarctView from './abstract';
import {FilterType} from '../const';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {title, amount} = filter;
  const filterTitle = title[0].toUpperCase() + title.slice(1, title.length);
  const createFilterItemCountTemplate = () => `${filterTitle} <span class="main-navigation__item-count">${amount}</span>`;

  return (
    `<a href="#${title}" data-filter-type="${title}" class="main-navigation__item ${title === currentFilterType ? `main-navigation__item--active` : ``}">
      ${title === FilterType.ALL ? `All movies` : createFilterItemCountTemplate()}
    </a>`
  );
};

const createSiteMenuTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstarctView {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeClick = this._filterTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeClickHandler(evt) {
    evt.preventDefault();
    this._callback.filterClick(evt.target.dataset.filterType);
  }

  setFilterTypeClickHandler(callback) {
    this._callback.filterClick = callback;
    this.getElement()
    .querySelectorAll(`.main-navigation__item`)
    .addEventListener(`click`, this._filterTypeClickHandler);
  }
}
