import React from "react";
import { Link } from "react-router-dom";
import { changeAlias } from "../../../utils/func";
import LinksByComma from "../../LinksByComma";
import { SongList } from "../../HomePage/newSong.style";

const SongSuggest = ({
  _id,
  thumbnail,
  id,
  name,
  link,
  artists,
  className
}) => {
  const songName = link ? link.split("/")[2] : changeAlias(name);
  return (
    <li className={className} key={_id}>
      <Link to={`/bai-hat/${songName}/${id}`}>
        <div className="card">
          <div className="thumb">
            <img src={thumbnail} alt="" />
            <span className="opac" />
            <i className="ion-play icon" />
          </div>
          <div className="card-info">
            <div className="title">{name}</div>
            <div className="artist">
              <LinksByComma
                data={artists}
                noLink
                titleEntry="name"
                pathEntry="link"
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

function SuggestedSection({ songs, ...props }) {
  return (
    <div className="suggested-section">
      <h3>{props.t("suggested")}</h3>
      <SongList>
        {songs.map(song => (
          <SongSuggest key={song._id} {...song} {...props} />
        ))}
      </SongList>
    </div>
  );
}

export default SuggestedSection;
