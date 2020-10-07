import AbstarctView from './abstract';

const createFooterStatsTemplate = (moviesAmount) => {
  return (
    `<section class="footer__statistics">
      <p>${moviesAmount} movies inside</p>
    </section>`
  );
};

export default class FooterStats extends AbstarctView {
  constructor(moviesAmount) {
    super();

    this._moviesAmount = moviesAmount;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._moviesAmount);
  }
}
