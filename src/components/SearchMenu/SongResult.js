import React from "react";
import { Link } from "react-router-dom";
import { getSongUrl } from "../../utils/func";
import LinksByComma from "../LinksByComma";

function SongResult({ songs, clearSearchResult, t }) {
  return (
    <ul className="song-result">
      <div className="search-li-title search-song-title">{t("songs")}</div>
      {songs && songs.length > 0 ? (
        songs.map(song => {
          const link = getSongUrl(song.name, song.id);
          return (
            <li key={`song-result${song.id}`}>
              <div className="search-li-detail">
                <Link
                  to={link}
                  onClick={() => clearSearchResult()}
                  title={song.name}
                >
                  {/* <img src={`http://image.mp3.zdn.vn/thumb/94_94/${song.thumb}`} alt='' /> */}
                  <img src={song.thumbnail || "/images/default.jpg"} alt="" />
                </Link>
                <div className="search-li-info">
                  <div title={song.name}>
                    <Link to={link} onClick={() => clearSearchResult()}>
                      {song.name}
                    </Link>
                  </div>
                  {/* <div
                  className="search-li-artist"
                  title={song.artist && song.artist.name}
                >
                  {song.artist && song.artist.name}
                </div> */}
                  <LinksByComma
                    className="search-li-artist"
                    data={song.artists || []}
                    titleEntry="name"
                    pathEntry="link"
                    noLink
                  />
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

export default SongResult;
