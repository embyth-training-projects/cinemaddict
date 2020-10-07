import AbstarctView from './abstract';

const createBoardTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Board extends AbstarctView {
  getTemplate() {
    return createBoardTemplate();
  }
}
