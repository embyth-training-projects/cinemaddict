// Подключаем необходимые компоненты
import UserRankView from './view/user-rank';
import SiteMenuView from './view/site-menu';
import FooterStatsView from './view/footer-stats';
import BoardPresenter from './presenter/board';
import {generateMovie} from './mock/movie';
import {generateFilter} from './mock/filter';
import {generateUser} from './mock/user';
import {RenderPosition, render} from './utils/render';
import {MOVIES_AMOUNT} from './const';

// Генерируем необходимые данные для заполнения
const movies = new Array(MOVIES_AMOUNT.TOTAL).fill().map(generateMovie);
const filters = generateFilter(movies);
const user = generateUser();

const siteHeaderNode = document.querySelector(`.header`);
const siteMainNode = document.querySelector(`.main`);
const footerStatictsNode = document.querySelector(`.footer__statistics`);

render(siteHeaderNode, new UserRankView(user));
render(siteMainNode, new SiteMenuView(filters), RenderPosition.AFTERBEGIN);

const boardPresenter = new BoardPresenter(siteMainNode);
boardPresenter.init(movies);

render(footerStatictsNode, new FooterStatsView(movies.length));
