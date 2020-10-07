export const sortByDate = (filmA, filmB) => {
  return filmA.filmInfo.release.date.getTime() - filmB.filmInfo.release.date.getTime();
};

export const sortByRating = (filmA, filmB) => {
  return filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
};

export const sortByComments = (filmA, filmB) => {
  return filmB.comments.length - filmA.comments.length;
};
