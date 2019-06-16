import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../../components/Modal";

class ModalContainer extends Component {
  render() {
    // const { dispatch, playlists, song, authenticated, showModal } = this.props;

    return <Modal {...this.props} />;
  }
}

function mapStateToProps({ UIState, playlistState, auth }) {
  const playlists = playlistState.playlists;

  return {
    showModal: UIState.showModal,
    playlists,
    song: playlistState.tmpSong,
    authenticated: auth.authenticated
  };
}

export default connect(mapStateToProps)(ModalContainer);
