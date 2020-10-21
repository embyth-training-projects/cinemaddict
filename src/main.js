// Подключаем необходимые компоненты
import UserRankView from './view/user-rank';
import FooterStatsView from './view/footer-stats';
import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import {generateMovie} from './mock/movie';
import {generateUser} from './mock/user';
import {render} from './utils/render';
import {MenuItem, MOVIES_AMOUNT} from './const';

// Генерируем необходимые данные для заполнения
const movies = new Array(MOVIES_AMOUNT.TOTAL).fill().map(generateMovie);
const user = generateUser();

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILTER:
      boardPresenter.init();
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      break;
  }
};

const filmsModel = new FilmsModel();
filmsModel.setFilms(movies);

const filterModel = new FilterModel();

const siteHeaderNode = document.querySelector(`.header`);
const siteMainNode = document.querySelector(`.main`);
const footerStatictsNode = document.querySelector(`.footer__statistics`);

render(siteHeaderNode, new UserRankView(user));

const boardPresenter = new BoardPresenter(siteMainNode, filterModel, filmsModel);
const filterPresenter = new FilterPresenter(siteMainNode, filterModel, filmsModel);
filterPresenter.init();
filterPresenter.setMenuClickHandler(handleSiteMenuClick);
boardPresenter.init();

render(footerStatictsNode, new FooterStatsView(movies.length));
