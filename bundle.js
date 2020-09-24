/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_user_rank__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/user-rank */ "./src/view/user-rank.js");
/* harmony import */ var _view_site_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/site-menu */ "./src/view/site-menu.js");
/* harmony import */ var _view_film_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/film-container */ "./src/view/film-container.js");
/* harmony import */ var _view_extra_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/extra-container */ "./src/view/extra-container.js");
/* harmony import */ var _view_movie_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/movie-card */ "./src/view/movie-card.js");
/* harmony import */ var _view_show_more_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/show-more-button */ "./src/view/show-more-button.js");
/* harmony import */ var _view_footer_stats__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/footer-stats */ "./src/view/footer-stats.js");
// Подключаем необходимые компоненты






// import {createMovieDetailsTemplate} from './view/movie-details';


// Количество карточек фильмов в блоках
const FILMS_AMOUNT = {
  DEFAULT: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

// Название доп. блоков
const EXTRA_BLOCK_TITLE = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`
};

// Функция отрисовки компонента на страницу
const renderComponent = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

// Функция отрисовки карточек фильмов
const renderFilmCards = (container, amount) => {
  for (let i = 0; i < amount; i++) {
    renderComponent(container, Object(_view_movie_card__WEBPACK_IMPORTED_MODULE_4__["createMovieCardTemplate"])(), `beforeend`);
  }
};

// Функция получения элемента контейнера по заголовку
const getExtraListContainerNode = (title) => {
  const extraBlockNode = Array.from(document.querySelectorAll(`.films-list--extra`))
    .filter((el) => el.innerText.includes(title))[0];
  return extraBlockNode.querySelector(`.films-list__container`);
};

// Отрисовываем необходимые компоненты
const siteHeaderNode = document.querySelector(`.header`);
renderComponent(siteHeaderNode, Object(_view_user_rank__WEBPACK_IMPORTED_MODULE_0__["createUserRankTemplate"])());

const siteMainNode = document.querySelector(`.main`);
renderComponent(siteMainNode, Object(_view_site_menu__WEBPACK_IMPORTED_MODULE_1__["createSiteMenuTemplate"])());
renderComponent(siteMainNode, Object(_view_film_container__WEBPACK_IMPORTED_MODULE_2__["createFilmsContainerTemplate"])());

const filmsListNode = siteMainNode.querySelector(`.films-list__container`);
renderFilmCards(filmsListNode, FILMS_AMOUNT.DEFAULT);

const filmsContainerNode = siteMainNode.querySelector(`.films-list`);
renderComponent(filmsContainerNode, Object(_view_show_more_button__WEBPACK_IMPORTED_MODULE_5__["createShowMoreButtonTemplate"])());

const filmsParentNode = siteMainNode.querySelector(`.films`);
renderComponent(filmsParentNode, Object(_view_extra_container__WEBPACK_IMPORTED_MODULE_3__["createExtraFilmContainerTemplate"])(EXTRA_BLOCK_TITLE.TOP_RATED));
renderFilmCards(getExtraListContainerNode(EXTRA_BLOCK_TITLE.TOP_RATED), FILMS_AMOUNT.TOP_RATED);
renderComponent(filmsParentNode, Object(_view_extra_container__WEBPACK_IMPORTED_MODULE_3__["createExtraFilmContainerTemplate"])(EXTRA_BLOCK_TITLE.MOST_COMMENTED));
renderFilmCards(getExtraListContainerNode(EXTRA_BLOCK_TITLE.MOST_COMMENTED), FILMS_AMOUNT.MOST_COMMENTED);

const footerStatictsNode = document.querySelector(`.footer__statistics`);
renderComponent(footerStatictsNode, Object(_view_footer_stats__WEBPACK_IMPORTED_MODULE_6__["createFooterStatsTemplate"])());


/***/ }),

/***/ "./src/view/extra-container.js":
/*!*************************************!*\
  !*** ./src/view/extra-container.js ***!
  \*************************************/
/*! exports provided: createExtraFilmContainerTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createExtraFilmContainerTemplate", function() { return createExtraFilmContainerTemplate; });
// Фунция создания шаблона контейнера для карточек "Самых рейтинговых" фильмов
const createExtraFilmContainerTemplate = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};


/***/ }),

/***/ "./src/view/film-container.js":
/*!************************************!*\
  !*** ./src/view/film-container.js ***!
  \************************************/
/*! exports provided: createFilmsContainerTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsContainerTemplate", function() { return createFilmsContainerTemplate; });
// Фунция создания шаблона контейнера для карточек фильмов
const createFilmsContainerTemplate = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};


/***/ }),

/***/ "./src/view/footer-stats.js":
/*!**********************************!*\
  !*** ./src/view/footer-stats.js ***!
  \**********************************/
/*! exports provided: createFooterStatsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFooterStatsTemplate", function() { return createFooterStatsTemplate; });
// Фунция создания шаблона статистики в подвале сайта
const createFooterStatsTemplate = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};


/***/ }),

/***/ "./src/view/movie-card.js":
/*!********************************!*\
  !*** ./src/view/movie-card.js ***!
  \********************************/
/*! exports provided: createMovieCardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMovieCardTemplate", function() { return createMovieCardTemplate; });
// Фунция создания шаблона карточки фильма
const createMovieCardTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Dance of Life</h3>
      <p class="film-card__rating">8.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1929</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">Musical</span>
      </p>
      <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};


/***/ }),

/***/ "./src/view/show-more-button.js":
/*!**************************************!*\
  !*** ./src/view/show-more-button.js ***!
  \**************************************/
/*! exports provided: createShowMoreButtonTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShowMoreButtonTemplate", function() { return createShowMoreButtonTemplate; });
// Фунция создания шаблона кнопки "Show More"
const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


/***/ }),

/***/ "./src/view/site-menu.js":
/*!*******************************!*\
  !*** ./src/view/site-menu.js ***!
  \*******************************/
/*! exports provided: createSiteMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSiteMenuTemplate", function() { return createSiteMenuTemplate; });
// Фунция создания шаблона меню сайта (фильтры и статистика)
const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


/***/ }),

/***/ "./src/view/user-rank.js":
/*!*******************************!*\
  !*** ./src/view/user-rank.js ***!
  \*******************************/
/*! exports provided: createUserRankTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUserRankTemplate", function() { return createUserRankTemplate; });
// Фунция создания шаблона звания пользователя
const createUserRankTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map