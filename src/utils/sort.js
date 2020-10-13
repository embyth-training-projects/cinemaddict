export const sortByDate = (filmA, filmB) => {
  return filmA.release.date.getTime() - filmB.release.date.getTime();
};

export const sortByRating = (filmA, filmB) => {
  return filmB.totalRating - filmA.totalRating;
};

export const sortByComments = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
};
