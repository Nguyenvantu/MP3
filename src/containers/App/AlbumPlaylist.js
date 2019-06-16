import React from "react";
import { connect } from "react-redux";
import AlbumPlaylist from "../../components/Pages/Album/AlbumPlaylist";
import { isEmpty } from "../../utils/func";
import albumActions from "../../redux/album/actions";
import queueActions from "../../redux/queue/actions";
import songActions from "../../redux/song/actions";
import shareActions from "../../redux/share/actions";
import { translate } from "react-i18next";

const { fetchAlbumPlaylist, clearPlaylist } = albumActions;
const { replaceQueue, addSongToQueue } = queueActions;
const { download, fetchSong } = songActions;

class AlbumPlaylistContainer extends React.Component {
  componentDidMount() {
    const { title, id } = this.props.match.params;
    if (!isEmpty(this.props.playlist)) {
      // Clear the the previous playlist data in the store
      this.props.clearPlaylist();
    }

    this.props.fetchAlbumPlaylist(title, id);
  }

  componentDidUpdate(prevProps) {
    const { id, title } = this.props.match.params;
    if (prevProps.match.params.id !== id) {
      this.props.clearPlaylist();
      this.props.fetchAlbumPlaylist(title, id);
    }
  }

  render() {
    return <AlbumPlaylist {...this.props} />;
  }
}

function mapStateToProps(state) {
  const { playlist, suggestedAlbums } = state.albumState;
  const isPlaying = !isEmpty(state.songData.data);
  const { authenticated, user } = state.auth;

  return {
    playlist,
    isPlaying,
    suggestedAlbums,
    downloadProgress: state.UIState.downloadProgress,
    authenticated,
    user
  };
}

export default translate("album")(
  connect(
    mapStateToProps,
    {
      fetchAlbumPlaylist,
      clearPlaylist,
      replaceQueue,
      fetchSong,
      download,
      addSongToQueue,
      setDataShare: shareActions.setData
    }
  )(AlbumPlaylistContainer)
);
