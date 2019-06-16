import React from "react";
import PropTypes from "prop-types";
// import { Link } from 'react-router';
// import { isAuthenticated } from "../../../HOC";
import { changeAlias } from "../../../utils/func";
import LinksByComma from "../../LinksByComma";
// import HeaderShare from "./HeaderShare";

class SongHeader extends React.Component {
  toggleShare = () => {
    const { songData, setDataShare } = this.props;
    const songName = songData.link
      ? songData.link.split("/")[2]
      : changeAlias(songData.name);
    const shareUrl = `${window.location.origin}/bai-hat/${songName}/${
      songData.id
    }`;
    setDataShare({
      isOpen: true,
      url: shareUrl
    });
  };

  render() {
    const {
      songData,
      download,
      downloadProgress,
      // authenticated,
      // redirectTo,
      // user,
      addSongToStoreTemporarily,
      t
    } = this.props;

    // const { showShare } = this.state;
    // const artists = songData.artists_names && songData.artists_names.split(/\s*,\s*/);
    return (
      <div className="song-header">
        {/* <div className="song-header-img">
        </div> */}
        <div className="song-header-info">
          <div className="song-header-song-title">{songData.name}</div>
          <div className="song-header-song-artist">
            <LinksByComma
              data={songData.artists || []}
              titleEntry="name"
              pathEntry="link"
              // definePath={link => link.replace("/nghe-si/", "/artist/")}
              // defineTitle={title =>
              //   title.replace("Nhiều nghệ sĩ", "Various artists")
              // }
            />
          </div>
        </div>
        <div className="song-header-actions">
          <button
            className="sc-ir"
            title={t("download")}
            onClick={() => {
              download({
                songName: changeAlias(songData.name),
                id: songData.id
              });
            }}
          >
            <i className="ion-ios-download-outline" />
          </button>
          <button
            className="sc-ir"
            title={t("addToPlayList")}
            onClick={() => {
              addSongToStoreTemporarily({
                name: songData.name,
                artists: songData.artists,
                id: songData.id,
                thumbnail: songData.thumbnail || "/images/default.jpg"
              });
            }}
          >
            <i className="ion-ios-plus-empty" />
          </button>
          <button
            className="sc-ir ignore-react-onclickoutside"
            title={t("share")}
            onClick={this.toggleShare}
          >
            <i className="ion-android-share-alt" />
          </button>
        </div>
        {typeof downloadProgress[songData.id] !== "undefined" &&
          downloadProgress[songData.id] !== -1 && (
            <span>{`${t("processDownload")}... ${
              downloadProgress[songData.id]
            } MB`}</span>
          )}
        {/* <HeaderShare
          t={t}
          name={songData.name}
          shareUrl={shareUrl}
          showShare={showShare}
          toggleShare={this.toggleShare}
        /> */}
      </div>
    );
  }
}

SongHeader.propTypes = {
  songData: PropTypes.object.isRequired,
  download: PropTypes.func.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  addSongToStoreTemporarily: PropTypes.func.isRequired
};

export default SongHeader;
