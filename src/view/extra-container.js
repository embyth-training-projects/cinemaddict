import AbstarctView from './abstract';

const createExtraFilmContainerTemplate = (heading) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${heading}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class ExtraContainer extends AbstarctView {
  constructor(title) {
    super();

    this._title = title;
  }

  getTemplate() {
    return createExtraFilmContainerTemplate(this._title);
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
