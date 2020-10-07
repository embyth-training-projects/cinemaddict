import AbstarctView from './abstract';

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsList extends AbstarctView {
  getTemplate() {
    return createFilmsListTemplate();
  }

  getContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
