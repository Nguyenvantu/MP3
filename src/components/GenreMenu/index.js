import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../redux/genres/actions";
import PropTypes from "prop-types";
import { changeAlias } from "../../utils/func";
// import { Genres } from "../../seed";
import "./index.sass";

const GenreMenu = ({ genres, fetch, type, t }) => {
  useEffect(() => {
    if (genres.data.length === 0) {
      fetch();
    }
  }, []);
  return (
    <div>
      <ul className="genre-menu">
        <ul className="submenu">
          <li className="submenu-title">
            <NavLink
              to={`/${type === "artist" ? "the-loai-nghe-si" : "albums"}`}
              activeClassName="submenu-link-active"
            >
              {t(type)}
            </NavLink>
          </li>
        </ul>
        {genres.data.map(genre => (
          <SubMenu
            key={genre.id}
            {...genre}
            type={type}
            t={t}
          />
        ))}
      </ul>
    </div>
  );
};

const SubMenu = ({ name, id, children, type, t }) => (
  <ul className="submenu">
    <li className="submenu-title">
      <NavLink
        to={`/${type === "artist" ? "the-loai-nghe-si" : "albums"}/${name}/${id}`}
        activeClassName="submenu-link-active"
      >
        {t(name)}
      </NavLink>
    </li>
    {children.map(obj => (
      <SubMenuLi key={obj.id} {...obj} type={type} t={t} typeName={name} />
    ))}
  </ul>
);

const SubMenuLi = props => (
  <li className="submenu-li">
    <NavLink
      to={`/${props.type === "artist" ? "the-loai-nghe-si" : "albums"}/${changeAlias(
        props.title
      )}/${props.id}`}
      activeClassName="submenu-link-active"
    >
      {props.typeName !== "Au-My" ? props.t(props.name) : props.title}
    </NavLink>
  </li>
);

GenreMenu.propTypes = {
  type: PropTypes.string.isRequired
};

export default connect(
  ({ genres }) => ({ genres }),
  actions
)(GenreMenu);
