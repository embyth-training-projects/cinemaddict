const RANKS = [`novice`, `fan`, `movie buff`];

export const getUserRank = (moviesViewed) => {
  let rank = ``;

  if (moviesViewed >= 1 && moviesViewed <= 10) {
    rank = RANKS[0];
  } else if (moviesViewed >= 11 && moviesViewed <= 20) {
    rank = RANKS[1];
  } else if (moviesViewed > 20) {
    rank = RANKS[2];
  }

  if (rank.length > 0) {
    rank = rank
      .toLowerCase()
      .split(` `)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(` `);
  }

  return rank;
};
