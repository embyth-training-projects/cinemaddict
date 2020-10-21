import SmartView from './smart';
import {getGenresFrequencies, filterFilmsByPeriod} from '../utils/statistics';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {PeriodFilter} from '../const';
import {remove} from '../utils/render';

const createStatisticsTemplate = (data) => {


  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${PeriodFilter.ALL_TIME}" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${PeriodFilter.TODAY}">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${PeriodFilter.WEEK}">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${PeriodFilter.MONTH}">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${PeriodFilter.YEAR}">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

const renderStatisticsChart = (statisticsCtx, films) => {
  const BAR_HEIGHT = 50;
  statisticsCtx.height = BAR_HEIGHT * Object.keys(getGenresFrequencies(films)).length;

  return new Chart(statisticsCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`,
        `Comedy`, `TV Series`],
      datasets: [{
        data: [11, 8, 7, 4, 3],
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
    }
  });
};

export default class Statistics extends SmartView {
  constructor(films) {
    super();

    this._films = [...films].filter((film) => film.isWatched);

    this._statsChart = null;
    this._currentPeriod = PeriodFilter.ALL_TIME;

    this._periodChangeHandler = this._periodChangeHandler.bind(this);
    this._setPeriodChangeHandler(this._periodChangeHandler);

    this._setChart(this._currentPeriod);
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setChart(PeriodFilter.ALL_TIME);
  }

  destroy() {
    remove(this);
  }

  removeElement() {
    super.removeElement();

    if (this._statsChart !== null) {
      this._statsChart.destroy();
      this._statsChart = null;
    }
  }

  _setPeriodChangeHandler(callback) {
    this._callback.periodChange = callback;
    this.getElement()
      .querySelectorAll(`.statistic__filters-input`)
      .forEach((input) => input.addEventListener(`change`, this._periodChangeHandler));
  }

  _periodChangeHandler(evt) {
    this._currentPeriod = evt.target.value;

    this._setChart(this._currentPeriod);
  }

  _setChart(period) {
    if (this._statsChart !== null) {
      this._statsChart.destroy();
      this._statsChart = null;
    }

    const filteredFilms = filterFilmsByPeriod(period, this._films);
    const statisticsCtx = this.getElement().querySelector(`.statistic__chart`);

    this._statsChart = renderStatisticsChart(statisticsCtx, filteredFilms);
  }
}
