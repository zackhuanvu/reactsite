import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Citi Double Cash",
    cardType: { _id: "5b21ca3eeb7f6fbccd471818", name: "Straight" },
    signUpBonus: 0,
    bonusSpend: 0,
    siteLink: "https://www.citi.com/credit-cards/credit-card-details/citi.action?ID=citi-double-cash-credit-card",
    // publishDate: "2018-01-03T19:04:28.809Z"
    cashBack: "2.0%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Chase Freedom Unlimited",
    cardType: { _id: "5b21ca3eeb7f6fbccd471818", name: "Straight" },
    signUpBonus: 150,
    bonusSpend: 500,
    siteLink: "https://creditcards.chase.com/cash-back-credit-cards/chase-freedom-unlimited?CELL=6290",
    cashBack: "1.5%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Chase Freedom",
    cardType: { _id: "5b21ca3eeb7f6fbccd471820", name: "Rotating" },
    signUpBonus: 150,
    bonusSpend: 500,
    siteLink: "https://creditcards.chase.com/cash-back-credit-cards/chase-freedom?CELL=6290",
    cashBack: "1.0%, 5.0%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Barclays Uber",
    cardType: { _id: "5b21ca3eeb7f6fbccd471814", name: "Tiered" },
    signUpBonus: 100,
    bonusSpend: 500,
    siteLink: "https://cards.barclaycardus.com/banking/cards/uber-visa-card/",
    cashBack: "1.0%-4.0%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Capital One Savor One",
    cardType: {_id: "5b21ca3eeb7f6fbccd471814", name: "Tiered"},
    signUpBonus: 150,
    bonusSpend: 500,
    siteLink: "https://www.capitalone.com/credit-cards/reviews/?prodid=savorone",
    cashBack: "1.0%-3.0%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Bank of America Cash Rewards",
    cardType: { _id: "5b21ca3eeb7f6fbccd471814", name: "Tiered" },
    signUpBonus: 200,
    bonusSpend: 1000,
    siteLink: "https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/",
    cashBack: "1.0%-3.0%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Discover It Cash Back",
    cardType: { _id: "5b21ca3eeb7f6fbccd471820", name: "Rotating" },
    signUpBonus: 0,
    bonusSpend: 0,
    siteLink: "https://www.discover.com/credit-cards/cash-back/it-card.html",
    cashBack: "1.0%, 5.0%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Amercian Express Blue Cash Everyday",
    cardType: { _id: "5b21ca3eeb7f6fbccd471814", name: "Tiered" },
    signUpBonus: 150,
    bonusSpend: 1000,
    siteLink: "https://www.americanexpress.com/us/credit-cards/card/blue-cash-everyday/",
    cashBack: "1.0%-3.0%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Wells Fargo Cash Wise",
    cardType: { _id: "5b21ca3eeb7f6fbccd471818", name: "Straight" },
    signUpBonus: 200,
    bonusSpend: 1000,
    siteLink: "https://www.wellsfargo.com/credit-cards/visa-wise/",
    cashBack: "1.5%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471822",
    title: "HSBC Cash Rewards",
    cardType: { _id: "5b21ca3eeb7f6fbccd471818", name: "Straight" },
    signUpBonus: 0,
    bonusSpend: 0,
    siteLink: "https://www.us.hsbc.com/credit-cards/products/cash-rewards/",
    cashBack: "1.5%"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471823",
    title: "Capitol One Quicksilver",
    cardType: { _id: "5b21ca3eeb7f6fbccd471818", name: "Straight" },
    signUpBonus: 150,
    bonusSpend: 500,
    siteLink: "https://www.capitalone.com/credit-cards/quicksilver/",
    cashBack: "1.5%"
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.cardType = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.signUpBonus = movie.signUpBonus;
  movieInDb.bonusSpend = movie.bonusSpend;
  movieInDb.siteLink = movie.siteLink;
  movieInDb.cashBack = movie.cashBack;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
