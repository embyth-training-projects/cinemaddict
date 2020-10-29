import UserRankView from './view/user-rank';
import FooterStatsView from './view/footer-stats';
import StatisticsView from './view/statistics';
import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import MenuModel from './model/menu';
import {remove, render} from './utils/render';
import {MenuItem, UpdateType} from './const';
import Api from './api/index';

const AUTHORIZATION = `Basic 8yg9123uin12ok3h=`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const siteHeaderNode = document.querySelector(`.header`);
const siteMainNode = document.querySelector(`.main`);
const footerStatictsNode = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);

const menuModel = new MenuModel();
const filterModel = new FilterModel();
const filmsModel = new FilmsModel();

const userRankComponent = new UserRankView(filmsModel);
const footerStatsComponent = new FooterStatsView(filmsModel);
const filterPresenter = new FilterPresenter(siteMainNode, filterModel, menuModel, filmsModel);
const boardPresenter = new BoardPresenter(siteMainNode, filterModel, filmsModel, api);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  if (menuItem === menuModel.getMenuItem()) {
    return;
  }

  switch (menuItem) {
    case MenuItem.FILTER:
      remove(statisticsComponent);
      boardPresenter.init();
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(filmsModel.getFilms());
      render(siteMainNode, statisticsComponent);
      statisticsComponent.init();
      break;
  }

  menuModel.setMenuItem(UpdateType.NONE, menuItem);
};

render(siteHeaderNode, userRankComponent);
filterPresenter.init();
boardPresenter.init();
render(footerStatictsNode, footerStatsComponent);

api.getFilms()
  .then((films) => {
    filterPresenter.setInnerHandlers();
    filterPresenter.setMenuClickHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filterPresenter.setInnerHandlers();
    filterPresenter.setMenuClickHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    })
    .catch(() => {
      console.log(`ServiceWorker isn't available`); // eslint-disable-line
    });
});
