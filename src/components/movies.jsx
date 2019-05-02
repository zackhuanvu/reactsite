import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";

import { getSavings } from "../services/savingAccountService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "cashBack", order: "desc" },
    savings: [],

    sortSavingsColumn: { path: "bonus", order: "desc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Cards" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });

    this.setState({ savings: getSavings });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSavingsSort = path => {
    const sortSavingsColumn = { ...this.state.sortSavingsColumn };
    if (sortSavingsColumn.path === path) {
      sortSavingsColumn.order =
        sortSavingsColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortSavingsColumn.path = path;
      sortSavingsColumn.order = "asc";
    }
    this.setState({ sortSavingsColumn });
  };

  renderSortIcon = path => {
    if (path !== this.state.sortColumn.path) return null;

    if (this.state.sortColumn.order === "asc") {
      return <i className="fa fa-sort-desc" />;
    } else {
      return <i className="fa fa-sort-asc" />;
    }
  };

  renderSavingsSortIcon = path => {
    if (path !== this.state.sortSavingsColumn.path) return null;

    if (this.state.sortSavingsColumn.order === "asc") {
      return <i className="fa fa-sort-desc" />;
    } else {
      return <i className="fa fa-sort-asc" />;
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.cardType._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, sortSavingsColumn } = this.state;

    const savings = _.orderBy(
      getSavings(),
      [sortSavingsColumn.path],
      [sortSavingsColumn.order]
    );

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2" style={{ backgroundColor: "#fff2e6" }}>
          <br />
          <p>
            <b>Card Filter by Type</b>
          </p>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p style={{ color: "darkblue", fontSize: 22 }}>
            <b>Welcome to My Personal Finance Hub</b>
          </p>
          <p>
            <b>
              {totalCount} cash back cards without annual fees in the database
            </b>
          </p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            renderSortIcon={this.renderSortIcon}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          <br />
          <p>
            <b>Top Savings Account Picks</b>
          </p>
          <table className="table" style={{ border: "2px solid thistle" }}>
            <thead>
              <tr>
                <th
                  onClick={() => this.handleSavingsSort("title")}
                  style={{ cursor: "pointer" }}
                >
                  Savings Accounts {this.renderSavingsSortIcon("title")}
                </th>
                <th
                  onClick={() => this.handleSavingsSort("apy")}
                  style={{ cursor: "pointer" }}
                >
                  APY Return {this.renderSavingsSortIcon("apy")}
                </th>
                <th
                  onClick={() => this.handleSavingsSort("bonus")}
                  style={{ cursor: "pointer" }}
                >
                  Opening Bonus {this.renderSavingsSortIcon("bonus")}
                </th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {savings.map(saving => (
                <tr key={saving._id}>
                  <td>
                    <b>
                      <a href={saving.siteLink}>{saving.title}</a>
                    </b>
                  </td>
                  <td>
                    <b>{saving.apy}</b>
                  </td>
                  <td>${saving.bonus}</td>
                  <td>{saving.requirements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Movies;
