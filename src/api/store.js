export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (error) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }

  setFilm(key, value) {
    const store = this.getItems();

    const updatedStore = {
      films: Object.assign(store.films, {
        [key]: value
      }),
      comments: store.comments
    };

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, updatedStore)
        )
    );
  }

  setComments(key, value) {
    const store = this.getItems();

    const updatedStore = {
      films: store.films,
      comments: Object.assign(store.comments, {
        [key]: value
      })
    };

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, updatedStore)
        )
    );
  }

  removeComment(key) {
    const store = this.getItems();

    for (let filmKey in store.films) {
      if (store.films[filmKey].comments.find((id) => id === key)) {
        const index = store.films[filmKey].comments.indexOf(key);
        const updatedComments = [...store.comments[filmKey].slice(0, index), ...store.comments[filmKey].slice(index + 1)];
        const updatedCommentsIds = [...store.films[filmKey].comments.slice(0, index), ...store.films[filmKey].comments.slice(index + 1)];
        store.comments[filmKey] = updatedComments;
        store.films[filmKey].comments = updatedCommentsIds;
        break;
      }
    }

    const updatedStore = {
      films: store.films,
      comments: store.comments
    };

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(Object.assign({}, updatedStore))
    );
  }
}
