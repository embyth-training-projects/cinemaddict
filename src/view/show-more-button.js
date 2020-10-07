import AbstarctView from './abstract';

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstarctView {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}
