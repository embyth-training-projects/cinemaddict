import AbstarctView from './abstract';

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

export default class SiteMenu extends AbstarctView {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}
