import FilmsModel from '../model/films';

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const createStoreCommentsStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: FilmsModel.adaptCommentsToServer(current),
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (Provider.isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const adaptedFilms = createStoreStructure(films.map(FilmsModel.adaptToServer));
          const adaptedComments = createStoreCommentsStructure(films);
          const items = {
            films: adaptedFilms,
            comments: adaptedComments
          };

          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems().films).map(FilmsModel.adaptToClient);
    const storeComments = Object.values(this._store.getItems().comments);
    return Promise.resolve(storeFilms.map((film) => FilmsModel.combineDataToClient(storeComments[film.id], film)));
  }

  updateFilm(film) {
    if (Provider.isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setFilm(updatedFilm.id, FilmsModel.adaptToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._store.setFilm(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));
    return Promise.resolve(film);
  }

  addComment(film, comment) {
    if (Provider.isOnline()) {
      return this._api.addComment(film, comment)
        .then((updatedFilm) => {
          const updatedComments = createStoreCommentsStructure([updatedFilm]);
          this._store.setComments(film.id, updatedComments);
          return updatedFilm;
        });
    }

    return Promise.reject();
  }

  deleteComment(id) {
    if (Provider.isOnline()) {
      return this._api.deleteComment(id)
        .then(() => this._store.removeComment(id));
    }

    return Promise.reject();
  }

  sync() {
    if (Provider.isOnline()) {
      const storeFilms = Object.values(this._store.getItems().films);
      return this._api.sync(storeFilms)
        .then((response) => {
          const items = {
            films: createStoreStructure(response.updated),
            comments: this._store.getItems().comments
          };

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
