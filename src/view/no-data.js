import AbstarctView from './abstract';

const createNoDataTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

export default class NoData extends AbstarctView {
  getTemplate() {
    return createNoDataTemplate();
  }
}
