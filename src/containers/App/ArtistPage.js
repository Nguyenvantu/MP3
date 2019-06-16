import React, { Component } from "react";
import { connect } from "react-redux";
// import queryString from "query-string";
import artistActions from "../../redux/artist/actions";
import queueActions from "../../redux/queue/actions";
import songActions from "../../redux/song/actions";
import ArtistPage from "../../components/Pages/Artist/ArtistPage";
import { translate } from "react-i18next";
// import shareActions from "../../redux/share/actions";
import { Helmet } from "react-helmet";

const { fetchArtist, clearArtist } = artistActions;
const { replaceQueue } = queueActions;
const { fetchSong, download } = songActions;

class ArtistPageContainer extends Component {
  componentDidMount() {
    const {
      match: {
        params: { name, id }
      },
      fetchArtist,
      clearArtist
    } = this.props;
    clearArtist();
    fetchArtist({ name, id });
    fetchArtist({ name, id }, "biography");
    fetchArtist({ name, id }, "albums");
  }

  componentDidUpdate(prevProps) {
    const { name, id } = this.props.match.params;
    if (prevProps.match.params.name !== name) {
      this.props.clearArtist();
      this.props.fetchArtist({ name, id });
      this.props.fetchArtist({ name, id }, "biography");
      this.props.fetchArtist({ name, id }, "albums");
    }
  }

  render() {
    const { props } = this;
    const name = props.artistName || props.fullName || "";
    return (
      <>
        <Helmet>
          <title>{`${name} - Nhac ${name}`}</title>
        </Helmet>
        <ArtistPage {...props} />
      </>
    );
  }
}

function mapStateToProps(state) {
  const {
    cover,
    biography,
    dateOfBirth,
    thumbnail,
    artistName,
    fullName,
    song: { songs },
    album: { albums }
  } = state.artistState.artist;

  const { suggestedArtists } = state.artistState;

  return {
    cover,
    thumbnail,
    songs,
    albums,
    artistName,
    fullName,
    suggestedArtists,
    biography,
    downloadProgress: state.UIState.downloadProgress,
    dateOfBirth,
    user: state.auth.user
  };
}

export default translate("album")(
  connect(
    mapStateToProps,
    {
      fetchArtist,
      clearArtist,
      replaceQueue,
      download,
      fetchSong
      // setDataShare: shareActions.setData
    }
  )(ArtistPageContainer)
);
