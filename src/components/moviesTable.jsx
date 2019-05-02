import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Card Name",
      content: movie => (
        <b>
          <a href={movie.siteLink}>{movie.title}</a>
        </b>
      )
    },
    { path: "cardType.name", label: "Category" },
    { path: "signUpBonus", label: "Bonus" },
    { path: "bonusSpend", label: "Min. Spend" },
    { path: "cashBack", label: "Cash Back" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-outline-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
