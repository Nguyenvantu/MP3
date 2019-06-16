import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Row, Col, message, Button } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getSongUrl, changeAlias, isEmpty } from "../../../utils/func";
import LinksByComma from "../../LinksByComma";
import { translate } from "react-i18next";
import { Modal } from "antd";
import UserInfo from "./userInfo";
import "./index.sass";

class UserPage extends React.Component {
  state = {
    showInput: false
  };

  handleOnClick = () => {
    this.setState({ showInput: true });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    // sanitize playlist's title before submitting to server
    // const playlistTitle = changeAlias(this.input.value.trim());
    const playlistTitle = this.input.value.trim();
    if (playlistTitle) {
      this.props.createPlaylist(playlistTitle);
      this.setState({ showInput: false });
    } else {
      message.warn("Bạn chưa nhập tên danh sách phát!");
    }
  };

  renderInputField = () => {
    return (
      this.state.showInput && (
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder={this.props.t("enterPlayListName")}
            className="ant-input form-control"
            ref={node => (this.input = node)}
          />
        </form>
      )
    );
  };

  render() {
    const { playlists, user, replaceInfo } = this.props;

    return (
      <div className="user-page">
        <Row gutter={24}>
          <Col sm={7}>
            <UserInfo user={user} replaceInfo={replaceInfo} />
          </Col>
          <Col sm={17}>
            <div className="user-page-left">
              <div className="box-control">
                <Button type="primary" icon="plus" onClick={this.handleOnClick}>
                  {this.props.t("createPlayList")}
                </Button>
                {this.renderInputField()}
              </div>
              {playlists.map(playlist => (
                <Playlist
                  playlist={playlist}
                  key={`playlist${playlist.title}`}
                  {...this.props}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

UserPage.propTypes = {
  playlists: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  songData: PropTypes.object.isRequired
};

class Playlist extends React.Component {
  state = {
    expand: false
  };

  toggleExpand = e => {
    const {
      playlist: { songs }
    } = this.props;
    if (!songs.length) {
      return;
    }

    const $list = e.target.closest(".user-playlist-header").nextSibling;
    this.setState({ expand: !this.state.expand });

    if ($list.style.maxHeight) {
      $list.style.maxHeight = null;
    } else {
      $list.style.maxHeight = `${$list.scrollHeight}px`;
    }
  };

  play = () => {
    const {
      playlist: { songs },
      songData,
      playUserPlaylist
    } = this.props;
    if (!songs.length) {
      return;
    }
    const firstSong = songs[0];
    const { name, id } = firstSong;
    if (isEmpty(songData)) {
      this.props.fetchSong(changeAlias(name), id);
    }
    playUserPlaylist(songs);
  };

  handleDelete = e => {
    e.stopPropagation();
    Modal.confirm({
      title: "Xác nhận xóa danh sách này?",
      okText: "Xóa",
      cancelText: "Đóng",
      okType: "danger",
      maskClosable: true,
      onOk: () => {
        const {
          playlist: { _id },
          deletePlaylist
        } = this.props;
        deletePlaylist(_id);
      }
    });
  };

  render() {
    const { expand } = this.state;
    const {
      playlist: { songs, title, _id },
      t,
      deleteSong
    } = this.props;
    const iconCLassName = `ion-arrow-${expand ? "down" : "right"}-b`;

    return (
      <div className="user-playlist">
        <div className="user-playlist-header" onClick={this.toggleExpand}>
          <div className="user-playlist-title">{title}</div>
          <div className="user-playlist-play-btn">
            <button
              className="sc-ir playlist-play-btn"
              onClick={this.play}
              title="Play"
            >
              <img src="/svg/play-button-inside-a-circle.svg" alt="" />
            </button>
          </div>
          <b>{songs.length}</b> {t("songs")}
          <button
            className="sc-ir playlist-remove-btn"
            onClick={this.handleDelete}
            title="Delete"
          >
            <i className="ion-android-close" />
          </button>
          <i className={iconCLassName} />
        </div>
        <List
          songs={songs}
          deleteSong={deleteSong}
          playlistTitle={title}
          _id={_id}
        />
      </div>
    );
  }
}

Playlist.propTypes = {
  playlist: PropTypes.object.isRequired,
  songData: PropTypes.object.isRequired
};

const List = ({ songs, deleteSong, _id }) => {
  return (
    <ul className="user-playlist-inside">
      <TransitionGroup>
        {songs.map(song => (
          <CSSTransition
            key={`playlist-song${song.id}`}
            classNames="playlist-song"
            timeout={250}
          >
            <li className="playlist-song">
              <div className="playlist-song-thumbnail">
                <img src={song.thumbnail} alt="" />
              </div>
              <div className="playlist-song-title ellipsis">
                <Link to={getSongUrl(song.name, song.id)}>{song.name}</Link>
              </div>
              <div className="playlist-song-artists">
                {Array.isArray(song.artists) ? (
                  <LinksByComma
                    data={song.artists}
                    titleEntry="name"
                    pathEntry="link"
                  />
                ) : (
                  song.artists
                )}
              </div>
              <div className="playlist-song-remove-btn">
                <button
                  className="sc-ir"
                  onClick={() => deleteSong(_id, song.id)}
                  title="Delete"
                >
                  <i className="ion-android-close" />
                </button>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

List.propTypes = {
  songs: PropTypes.array.isRequired,
  playlistTitle: PropTypes.string
};

export default translate("homePage")(UserPage);
