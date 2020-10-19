import AbstarctView from './abstract';
import {FilterType} from '../const';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {name, type, count} = filter;
  const createFilterItemCountTemplate = () => `${name} <span class="main-navigation__item-count">${count}</span>`;

  return (
    `<a href="#${type}" data-filter-type="${type}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">
      ${type === FilterType.ALL ? name : createFilterItemCountTemplate()}
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

    this._filterTypeClickHandler = this._filterTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilterType);
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
}
