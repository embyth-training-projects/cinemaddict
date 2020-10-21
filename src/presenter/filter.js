import FilterView from '../view/site-menu';
import {render, replace, remove, RenderPosition} from '../utils/render';
import {filter} from '../utils/filter';
import {FilterType, UpdateType} from '../const';

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleFilterTypeClick = this._handleFilterTypeClick.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeClickHandler(this._handleFilterTypeClick);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  setMenuClickHandler(callback) {
    this._menuClickHandler = callback;
    this._filterComponent.setMenuClickHandler(callback);
  }

  _restoreHandlers() {
    this._filterComponent.setMenuClickHandler(this._menuClickHandler);
  }

  _handleFilterTypeClick(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleModelEvent() {
    this.init();
    this._restoreHandlers();
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
