!function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);const n=["Made for Each Other","Popeye the Sailor Meets Sinbad the Sailor","Sagebrush Trail","Santa Claus Conquers the Martians","The Dance of Life","The Great Flamarion","The Man with the Golden Arm"],i=["images/posters/made-for-each-other.png","images/posters/popeye-meets-sinbad.png","images/posters/sagebrush-trail.jpg","images/posters/santa-claus-conquers-the-martians.jpg","images/posters/the-dance-of-life.jpg","images/posters/the-great-flamarion.jpg","images/posters/the-man-with-the-golden-arm.jpg"],s=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],r=["smile","sleeping","puke","angry"],l=["Max Kolesnik","Vladislav Matyash","Nazar Mirniy","Sergey Soroka","Omar Habuniia"],o=["6+","12+","16+","18+"],c=["John Cromwell","Dave Fleischer","Armand Schaefer","Nicholas Webster","A. Edward Sutherland","Anthony Mann","Otto Preminger"],m=["Rose Franken","Max Fleischer","Lindsley Parsons","Glenville Mareth","Benjamin Glazer","Heinz Herald","Richard Weil","Anne Wigton","Walter Newman","Lewis Meltzer"],u=["Carole Lombard","James Stewart","Jack Mercer","Mae Questel","Gus Wickie","John Wayne","Nancy Shubert","Lane Chandler","John Call","Leonard Hicks","Vincent Beck","Hal Skelly","Nancy Carroll","Erich von Stroheim","Mary Beth Hughes","Frank Sinatra","Eleanor Parker","Kim Novak"],f=["Russia","USA","India","China","UK","Italia"],d=["Drama","Thriller","Western","Fantasy","Comedy"],h=["images/bitmap.png","images/emoji/angry.png","images/emoji/puke.png","images/emoji/sleeping.png","images/emoji/smile.png"],p=["novice","fan","movie buff"],g=e=>`<section class="films-list--extra">\n      <h2 class="films-list__title">${e}</h2>\n      <div class="films-list__container"></div>\n    </section>`,_=e=>e?"film-card__controls-item--active":"",v=e=>{const{comments:t}=e,{filmInfo:{title:a,totalRating:n,poster:i,runtime:s,description:r,release:l,genres:o}}=e,{userDetails:{watchlist:c,favorite:m,alreadyWatched:u}}=e;return`<article class="film-card">\n      <h3 class="film-card__title">${a}</h3>\n      <p class="film-card__rating">${n}</p>\n      <p class="film-card__info">\n        <span class="film-card__year">${l.date.getFullYear()}</span>\n        <span class="film-card__duration">${s}</span>\n        <span class="film-card__genre">${o[0]}</span>\n      </p>\n      <img src="${i}" alt="${a}" class="film-card__poster">\n      <p class="film-card__description">${(e=>e.length>140?e.slice(0,139)+"...":e)(r)}</p>\n      <a class="film-card__comments">${t.length} comments</a>\n      <form class="film-card__controls">\n        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${_(c)}">Add to watchlist</button>\n        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${_(u)}">Mark as watched</button>\n        <button class="film-card__controls-item button film-card__controls-item--favorite ${_(m)}">Mark as favorite</button>\n      </form>\n    </article>`},y=(e=0,t=1)=>{const a=Math.ceil(Math.min(e,t)),n=Math.floor(Math.max(e,t));return Math.floor(a+Math.random()*(n-a+1))},b=()=>{const e=y(0,365),t=y(-e,e);let a=new Date;return a.setHours(23,59,59,999),a.setDate(a.getDate()+t),a=new Date(a),`${a.getFullYear()}/${a.getMonth()}/${a.getDate()} ${a.getHours()}:${a.getMinutes()}`},M=e=>e[y(0,e.length-1)],S=()=>{const e=y(1,5);let t="";for(let a=0;a<e;a++)t+=M(s);return t},w=()=>{const e=y(0,5),t=[];for(let a=0;a<e;a++){const e={emoji:M(r),date:b(),author:M(l),comment:M(s)};t.push(e)}return t},$=()=>{const e=y(1,4),t=[];for(let a=0;a<e;a++)t.push(M(m));return t},T=()=>{const e=y(1,4),t=[];for(let a=0;a<e;a++)t.push(M(u));return t},j=()=>{const e=y(10,200),t=Math.trunc(e/60),a=Math.ceil(e/60%1*60),n=a>0?a+"m":"";return 0===t?""+n:`${t>0?t+"h":""} ${n}`},D=()=>{const e=y(1,4),t=[];for(let a=0;a<e;a++)t.push(M(d));return t},A={watchlist:e=>e.filter(e=>e.userDetails.watchlist).length,history:e=>e.filter(e=>e.userDetails.alreadyWatched).length,favorites:e=>e.filter(e=>e.userDetails.favorite).length},O=5,E=2,k=2,C={TOP_RATED:"Top rated",MOST_COMMENTED:"Most commented"},q=new Array(20).fill().map(()=>({comments:w(),filmInfo:{title:M(n),alternativeTitle:M(n),poster:M(i),description:S(),totalRating:y(10,100)/10,ageRating:M(o),director:M(c),writers:$(),actors:T(),release:{date:new Date(y(1895,2020),y(1,12),y(1,30)),releaseCountry:M(f)},runtime:j(),genres:D()},userDetails:{watchlist:Boolean(y(0,1)),favorite:Boolean(y(0,1)),alreadyWatched:Boolean(y(0,1)),watchingDate:b()}})),x=(e=>Object.entries(A).map(([t,a])=>({title:t,amount:a(e)})))(q),P={moviesViewed:y(0,50),avatar:M(h)},N=(e,t,a="beforeend")=>{e.insertAdjacentHTML(a,t)},R=e=>Array.from(document.querySelectorAll(".films-list--extra")).filter(t=>t.innerText.includes(e))[0].querySelector(".films-list__container"),L=document.querySelector(".header");N(L,(e=>{const{moviesViewed:t,avatar:a}=e;return`<section class="header__profile profile">\n      <p class="profile__rating">${(e=>{let t="";return e>=1&&e<=10?t=p[0]:e>=11&&e<=20?t=p[1]:e>20&&(t=p[2]),t.length>0&&(t=t.toLowerCase().split(" ").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")),t})(t)}</p>\n      <img class="profile__avatar" src="${a}" alt="Avatar" width="35" height="35">\n    </section>`})(P));const W=document.querySelector(".main");N(W,(e=>`<nav class="main-navigation">\n      <div class="main-navigation__items">\n        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>\n        ${e.map(e=>(e=>{const{title:t,amount:a}=e,n=t[0].toUpperCase()+t.slice(1,t.length);return`<a href="#${t}" class="main-navigation__item">\n      ${n} <span class="main-navigation__item-count">${a}</span>\n    </a>`})(e)).join("")}\n      </div>\n      <a href="#stats" class="main-navigation__additional">Stats</a>\n    </nav>\n\n    <ul class="sort">\n      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>\n      <li><a href="#" class="sort__button">Sort by date</a></li>\n      <li><a href="#" class="sort__button">Sort by rating</a></li>\n    </ul>`)(x)),N(W,'<section class="films">\n      <section class="films-list">\n        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>\n        <div class="films-list__container"></div>\n      </section>\n    </section>');const F=W.querySelector(".films-list__container");if(q.slice(0,O).forEach(e=>N(F,v(e))),q.length>O){let e=O;const t=W.querySelector(".films-list");N(t,'<button class="films-list__show-more">Show more</button>');const a=document.querySelector(".films-list__show-more");a.addEventListener("click",t=>{t.preventDefault(),q.slice(e,e+O).forEach(e=>N(F,v(e))),e+=O,e>=q.length&&a.remove()})}const H=W.querySelector(".films");N(H,g(C.TOP_RATED)),q.sort((e,t)=>t.filmInfo.totalRating-e.filmInfo.totalRating).slice(0,E).forEach(e=>N(R(C.TOP_RATED),v(e))),N(H,g(C.MOST_COMMENTED)),q.sort((e,t)=>t.comments.length-e.comments.length).slice(0,k).forEach(e=>N(R(C.MOST_COMMENTED),v(e)));const I=document.querySelector(".footer__statistics");N(I,`<section class="footer__statistics">\n      <p>${q.length} movies inside</p>\n    </section>`)}]);
//# sourceMappingURL=bundle.js.map