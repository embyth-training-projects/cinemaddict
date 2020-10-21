import moment from 'moment';

export const getFormattedReleaseDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`D MMMM YYYY`);
};

export const getFormattedRuntime = (runtime) => {
  const hour = Math.trunc(runtime / 60);
  const minute = Math.ceil(runtime / 60 % 1 * 60);

  const hourToString = (hour > 0) ? `${hour}h` : ``;
  const minuteToString = (minute > 0) ? `${minute}m` : ``;

  const result = (hour === 0) ? `${minuteToString}` : `${hourToString} ${minuteToString}`;
  return result;
};

export const getHumanizeCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).fromNow();
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};
