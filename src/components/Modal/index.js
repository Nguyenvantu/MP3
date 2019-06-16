import React, { Component } from "react";
import { translate } from "react-i18next";
import uiActions from "../../redux/ui/actions";
// import { changeAlias } from "../../utils/func";
import user_playlistActions from "../../redux/user_playlist/actions";
import { Modal, Button, message } from "antd";
import ModalWrapper from "./modal.style";

const {
  createPlaylist,
  addSongToPlaylist,
  getPlaylistCollection
} = user_playlistActions;
const { toggleModal } = uiActions;

class ModalPlaylist extends Component {
  state = {
    showInput: false
  };

  componentDidUpdate(prevProps) {
    const { authenticated, showModal } = this.props;
    if (authenticated && showModal && prevProps.showModal !== showModal) {
      this.props.dispatch(getPlaylistCollection());
    }
  }

  handleCloseModal = () => {
    // this.setState({ leave: true });
    // setTimeout(() => {
    this.props.dispatch(toggleModal(false));
    // }, 500);
  };

  handleOnClick = () => {
    this.setState({ showInput: true });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    // sanitize playlist's title before submitting to server
    const playlistTitle = this.input.value.trim();
    if (playlistTitle) {
      this.props.dispatch(createPlaylist(playlistTitle));
      this.setState({ showInput: false });
    } else {
      message.warn("Bạn chưa nhập tên danh sách!");
    }
  };

  renderInputField() {
    return (
      this.state.showInput && (
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder={this.props.t("enterPlayListName")}
            className="ant-input mt-1"
            ref={node => (this.input = node)}
          />
        </form>
      )
    );
  }

  handleAddSongToPlaylist(playlist) {
    const { song, dispatch } = this.props;
    dispatch(addSongToPlaylist(playlist, song));
    this.handleCloseModal();
  }

  render() {
    const { showModal, playlists, t } = this.props;

    return (
      <Modal visible={showModal} footer={null} onCancel={this.handleCloseModal}>
        <ModalWrapper>
          <div>
            <Button type="primary" icon="plus" onClick={this.handleOnClick}>
              {t("createPlayList")}
            </Button>
            {!playlists.length && (
              <div className="modal-warn">{t("noPlayList")}</div>
            )}

            {this.renderInputField()}
            <div className="modal-playlists">
              {playlists.map(playlist => (
                <div
                  title={playlist.title}
                  className="ellipsis modal-playlist"
                  key={`modal-${playlist._id}`}
                  onClick={this.handleAddSongToPlaylist.bind(this, playlist)}
                >
                  {playlist.title}
                </div>
              ))}
            </div>
          </div>
        </ModalWrapper>
      </Modal>
    );
  }
}

export default translate("homePage")(ModalPlaylist);
