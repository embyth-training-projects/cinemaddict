// Фунция создания шаблона статистики в подвале сайта
export const createFooterStatsTemplate = (moviesAmount) => {
  return (
    `<section class="footer__statistics">
      <p>${moviesAmount} movies inside</p>
    </section>`
  );
};
