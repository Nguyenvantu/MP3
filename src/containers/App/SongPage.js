import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import KarokeContainer from "./karaokeContainer";
// import { Pages } from "../../components";
import SongHeader from "../../components/Pages/Song/SongHeader";
import SongPageBody from "../../components/Pages/Song/SongPageBody";
import { getSongUrl, isEmpty } from "../../utils/func";
import { translate } from "react-i18next";
import songActions from "../../redux/song/actions";
import userPlaylistActions from "../../redux/user_playlist/actions";
import uiActions from "../../redux/ui/actions";
import queueActions from "../../redux/queue/actions";
import shareActions from "../../redux/share/actions";
import { Helmet } from "react-helmet";

const { fetchSong, download, fetchSuggestedSongs } = songActions;
const { addSongToStoreTemporarily } = userPlaylistActions;
const { showAnalyzer, toggleModal, hideAnalyzer } = uiActions;
const { addSongToQueue } = queueActions;

class SongPage extends React.Component {
  componentDidMount() {
    const {
      showAnalyzer,
      songData,
      match: {
        params: { name, id }
      },
      fetchSong,
      fetchSuggestedSongs,
      suggestedSongs
    } = this.props;
    showAnalyzer();
    if (suggestedSongs.length === 0) {
      fetchSuggestedSongs({ songId: id });
    }
    if (isEmpty(songData) || id !== songData.id) {
      fetchSong(name, id);
    }
  }

  componentWillUnmount() {
    this.props.hideAnalyzer();
  }

  componentDidUpdate(prevProps) {
    const { location: currLoc } = this.props;
    const { location: prevLoc } = prevProps;
    const { id, name } = this.props.songData;

    if (this.props.match.params.id === id) {
      return;
    }

    if (id && id !== prevProps.songData.id) {
      this.props.history.push(getSongUrl(name, id));
      return;
    }

    if (prevLoc.pathname !== currLoc.pathname) {
      const { name, id } = this.props.match.params;
      this.props.fetchSong(name, id);
    }
  }

  render() {
    const {
      songData,
      download,
      downloadProgress,
      toggleModal,
      addSongToStoreTemporarily,
      t,
      suggestedSongs,
      fetchSong,
      addSongToQueue,
      match: { params },
      history,
      setDataShare,
      user
    } = this.props;
    const name = `${songData.name ||
      songData.title ||
      ""} - ${songData.performer || ""}`;
    return (
      <div>
        <Helmet>
          <title>{name}</title>
        </Helmet>
        <SongHeader
          songData={songData}
          download={download}
          downloadProgress={downloadProgress}
          toggleModal={toggleModal}
          setDataShare={setDataShare}
          addSongToStoreTemporarily={addSongToStoreTemporarily}
          t={t}
        />
        <KarokeContainer className="karaoke-song-page" />
        <SongPageBody
          suggestedSongs={suggestedSongs}
          fetchSong={fetchSong}
          addSongToQueue={addSongToQueue}
          t={t}
          user={user}
          params={params}
          history={history}
          songData={songData}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    suggestedSongs: state.songData.suggestedSongs,
    songData: state.songData.data,
    downloadProgress: state.UIState.downloadProgress,
    user: state.auth.user
    // routing: state.routing
    // canPushRoute: state.queueState.pushRoute,
  };
}

export default translate("player")(
  withRouter(
    connect(
      mapStateToProps,
      {
        fetchSong,
        showAnalyzer,
        download,
        addSongToStoreTemporarily,
        addSongToQueue,
        toggleModal,
        hideAnalyzer,
        fetchSuggestedSongs,
        setDataShare: shareActions.setData
      }
    )(SongPage)
  )
);
