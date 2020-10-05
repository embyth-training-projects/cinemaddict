import {createElement} from '../utils';

const createFilterItemTemplate = (filter) => {
  const {title, amount} = filter;
  const filterTitle = title[0].toUpperCase() + title.slice(1, title.length);

  return (
    `<a href="#${title}" class="main-navigation__item">
      ${filterTitle} <span class="main-navigation__item-count">${amount}</span>
    </a>`
  );
};

const createSiteMenuTemplate = (filters) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter))
    .join(``);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
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
