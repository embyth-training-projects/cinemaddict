// Подключаем необходимые компоненты
import UserRankView from './view/user-rank';
import SiteMenuView from './view/site-menu';
import FooterStatsView from './view/footer-stats';
import BoardPresenter from './presenter/board';
import FilmsModel from './model/films';
import FilterModel from './model/filter';
import {generateMovie} from './mock/movie';
import {generateUser} from './mock/user';
import {RenderPosition, render} from './utils/render';
import {MOVIES_AMOUNT} from './const';

// Генерируем необходимые данные для заполнения
const movies = new Array(MOVIES_AMOUNT.TOTAL).fill().map(generateMovie);
const filters = [
  {
    title: `all`,
    amount: 10,
  },
  {
    title: `history`,
    amount: 10,
  }
];
const user = generateUser();

const filmsModel = new FilmsModel();
filmsModel.setFilms(movies);

const filterModel = new FilterModel();

const siteHeaderNode = document.querySelector(`.header`);
const siteMainNode = document.querySelector(`.main`);
const footerStatictsNode = document.querySelector(`.footer__statistics`);

render(siteHeaderNode, new UserRankView(user));
render(siteMainNode, new SiteMenuView(filters, `all`), RenderPosition.AFTERBEGIN);

const boardPresenter = new BoardPresenter(siteMainNode, filmsModel);
boardPresenter.init();

render(footerStatictsNode, new FooterStatsView(movies.length));
