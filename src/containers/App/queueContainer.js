import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import Queue from "../../components/Queue";
import queueActions from "../../redux/queue/actions";
import uiActions from "../../redux/ui/actions";
import songActions from "../../redux/song/actions";

const { clearQueue, removeSongFromQueue, sortQueue } = queueActions;
const { toggleQueue } = uiActions;
const { fetchSong } = songActions;

class QueueContainer extends Component {
  render() {
    return <Queue {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    songs: state.queueState.queue,
    ids: state.queueState.ids,
    songData: state.songData
  };
}

export default translate("player")(
  connect(
    mapStateToProps,
    { toggleQueue, clearQueue, removeSongFromQueue, fetchSong, sortQueue }
  )(QueueContainer)
);
