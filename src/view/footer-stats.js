import AbstarctView from './abstract';

const createFooterStatsTemplate = (filmsModel) => {
  const filmsCount = filmsModel.getFilms().length;

  return (
    `<section class="footer__statistics">
      <p>${filmsCount} movies inside</p>
    </section>`
  );
};

export default class FooterStats extends AbstarctView {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this._updateFooterStats = this._updateFooterStats.bind(this);

    this._filmsModel.addObserver(this._updateFooterStats);
  }

  getTemplate() {
    return createFooterStatsTemplate(this._filmsModel);
  }

  _updateFooterStats() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;
  }
}
