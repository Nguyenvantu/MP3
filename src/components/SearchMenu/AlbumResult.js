import React from "react";
import { Link } from "react-router-dom";
import { changeAlias } from "../../utils/func";
import LinksByComma from "../LinksByComma";

function AlbumResult({ t, albums, clearSearchResult }) {
  return (
    <ul className="album-result">
      <div className="search-li-title">{t("albums")}</div>
      {albums && albums.length > 0 ? (
        albums.map(album => {
          const link = `/album/${changeAlias(album.title)}/${album.id}`;
          return (
            <li key={`search-${album.id}`}>
              <div className="search-li-detail">
                <Link
                  to={link}
                  onClick={() => clearSearchResult()}
                  title={album.name}
                >
                  <img src={album.thumbnail} alt="" />
                </Link>
                <div className="search-li-info">
                  <div title={album.name}>
                    <Link to={link} onClick={() => clearSearchResult()}>
                      {album.title}
                    </Link>
                  </div>
                  <LinksByComma
                    className="search-li-artist"
                    data={album.artists || []}
                    titleEntry="name"
                    pathEntry="link"
                    noLink
                  />
                  {/* <div className="search-li-artist" title={album.artist}>
                  {album.artist}
                </div> */}
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

export default AlbumResult;
