import React, { Component } from "react";
import { connect } from "react-redux";
import UserPage from "../../components/Pages/User";
import authActions from "../../redux/auth/actions";
import user_playlistActions from "../../redux/user_playlist/actions";
import queueActions from "../../redux/queue/actions";
import songActions from "../../redux/song/actions";
import { isAuthenticated } from "../../HOC";
// import { loadUserData } from "../../helpers/localStorage";
import { Helmet } from "react-helmet";

const { logout, replaceInfo } = authActions;
const {
  createPlaylist,
  deleteSong,
  deletePlaylist,
  getPlaylistCollection
} = user_playlistActions;
const { playUserPlaylist } = queueActions;
const { fetchSong } = songActions;

class UserPageContainer extends Component {
  componentDidMount() {
    const {
      authenticated,
      match: { params },
      user,
      history,
      playlists
    } = this.props;
    if (authenticated && params.id !== user.username) {
      this.props.dispatch(logout());
      return history.push("/login");
    } else if (!authenticated) {
      return history.push("/login");
    }

    if (user && user._id && !playlists.length) {
      this.props.getPlaylistCollection();
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Nhạc cá nhân</title>
        </Helmet>
        <UserPage {...this.props} />
      </>
    );
  }
}

function mapStateToProps({ playlistState, songData, auth }) {
  return {
    playlists: playlistState.playlists,
    songData: songData.data,
    user: auth.user
  };
}

export default connect(
  mapStateToProps,
  {
    logout,
    createPlaylist,
    deleteSong,
    deletePlaylist,
    playUserPlaylist,
    fetchSong,
    replaceInfo,
    getPlaylistCollection
  }
)(isAuthenticated(UserPageContainer));
