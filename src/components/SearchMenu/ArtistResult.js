import React from "react";
import { Link } from "react-router-dom";
import { changeAlias } from "../../utils/func";

function ArtistResult({ t, artists, clearSearchResult }) {
  return (
    <ul className="artist-result">
      <div className="search-li-title">{t("artists")}</div>
      {artists && artists.length > 0 ? (
        artists.map(artist => {
          const link = `/nghe-si/${
            artist.link ? artist.link.split("/")[2] : changeAlias(artist.name)
          }${artist.id ? "/" + artist.id : ""}`;
          return (
            <li key={artist.id}>
              <div className="search-li-detail">
                <Link
                  to={link}
                  onClick={() => clearSearchResult()}
                  title={artist.name}
                >
                  <img src={artist.thumbnail || "/images/artist_default.png"} alt="" />
                </Link>
                <div className="search-li-info">
                  <div className="search-li-artist" title={artist.name}>
                    <Link to={link} onClick={() => clearSearchResult()}>
                      {artist.name}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <div className="not-found-text">Không tìm thấy kết quả nào...</div>
      )}
    </ul>
  );
}

export default ArtistResult;
