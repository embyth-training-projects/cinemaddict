import ExtraContainerView from '../view/extra-container';
import FilmPresenter from './movie';
import {render} from '../utils/render';
import {sortByRating, sortByComments} from '../utils/sort';
import {MOVIES_AMOUNT} from '../const';

const extraListType = {
  TOP_RATED: {
    TITLE: `Top rated`,
    AMOUNT: MOVIES_AMOUNT.TOP_RATED,
    SORT: sortByRating,
  },
  MOST_COMMENTED: {
    TITLE: `Most commented`,
    AMOUNT: MOVIES_AMOUNT.MOST_COMMENTED,
    SORT: sortByComments,
  },
};

export default class ExtraBoard {
  constructor(extraListContainer) {
    this._extraListContainer = extraListContainer;
  }

  init(films) {
    const slicedFilms = films.slice();

    this._renderExtraList(extraListType.TOP_RATED, slicedFilms);
    this._renderExtraList(extraListType.MOST_COMMENTED, slicedFilms);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film);
  }

  _renderExtraList(listType, films) {
    const extraListComponent = new ExtraContainerView(listType.TITLE);
    render(this._extraListContainer, extraListComponent);

    films
      .sort(listType.SORT)
      .slice(0, listType.AMOUNT)
      .forEach((film) => this._renderFilm(extraListComponent.getContainer(), film));
  }
}
