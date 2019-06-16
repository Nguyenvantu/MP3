import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./index.sass";
import { changeAlias } from "../../utils/func";

const LinksByComma = ({
  data = [],
  noLink,
  // definePath,
  pathEntry,
  titleEntry,
  defineTitle,
  className
}) => {
  return (
    <div className={`comma ${className || ""}`}>
      {data.map((element, index) => {
        const link = element[pathEntry]
          ? element[pathEntry]
          : `/nghe-si/${changeAlias(element[titleEntry])}/${element.id}`;
        return noLink ? (
          (defineTitle && defineTitle(element[titleEntry])) ||
            element[titleEntry]
        ) : (
          <Link onClick={e => e.stopPropagation()} key={`${element[titleEntry]}-${index}`} to={link}>
            {(defineTitle && defineTitle(element[titleEntry])) ||
              element[titleEntry]}
          </Link>
        );
      })}
    </div>
  );
};

LinksByComma.propTypes = {
  data: PropTypes.array.isRequired,
  definePath: PropTypes.func,
  pathEntry: PropTypes.string.isRequired,
  titleEntry: PropTypes.string.isRequired,
  defineTitle: PropTypes.func,
  className: PropTypes.string
};

export default LinksByComma;
