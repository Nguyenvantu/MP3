import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { pageQuery, changeAlias } from "../../utils/func";
import "./index.sass";

/* type can be album or artist */

const getLink = (genre, id, page, type, artistName) => {
  if (type === "single-artist" && artistName) {
    return `/nghe-si/${changeAlias(artistName)}?page=${page}`;
  }

  return `/${
    type === "artist" ? "nghe-si" : "albums"
  }/${genre}/${id}${pageQuery(page)}`;
};

const Pagination = props => {
  const {
    genre,
    id,
    pageChunks,
    pageChunkIndex,
    type,
    artistName,
    activePage = 1
  } = props;
  // console.log(activePage)
  if (!pageChunks.length) return null;

  return (
    <ul className="pagination">
      {pageChunkIndex > 0 && (
        <li>
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              props.changePageChunkIndex(pageChunkIndex - 1);
            }}
          >
            <i className="ion-chevron-left" />
          </a>
        </li>
      )}
      {pageChunks.length &&
        pageChunks[0].length > 1 &&
        pageChunks[pageChunkIndex].map(num => (
          <li key={`pagination-item${num}`}>
            <NavLink
              to={getLink(genre, id, num + 1, type, artistName)}
              className={`${
                +activePage !== (num + 1) ? "" : "pagination-item-active"
              }`}
            >
              {num + 1}
            </NavLink>
          </li>
        ))}
      {pageChunkIndex < pageChunks.length - 1 && (
        <li>
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              props.changePageChunkIndex(pageChunkIndex + 1);
            }}
          >
            <i className="ion-chevron-right" />
          </a>
        </li>
      )}
    </ul>
  );
};

Pagination.propTypes = {
  genre: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  pageChunks: PropTypes.array.isRequired,
  pageChunkIndex: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};

export default Pagination;
