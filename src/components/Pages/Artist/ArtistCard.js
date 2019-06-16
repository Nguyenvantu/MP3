import React from "react";
import { Link } from "react-router-dom";
import { changeAlias } from "../../../utils/func";
import LazyloadImage from "../../LazyloadImage";
import "./artist_card.sass";

const ArtistCard = props => {
  const url = `/nghe-si/${
    props.link ? props.link.split("/")[2] : changeAlias(props.name)
  }`;
  return (
    <div className="artist-card">
      <Link to={url}>
        <LazyloadImage className="artist-image" src={props.thumbnail || "/images/artist_default.png"} />
      </Link>
      <div className="artist-detail">
        <div className="artist-title">
          <Link to={url}>{props.name}</Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
