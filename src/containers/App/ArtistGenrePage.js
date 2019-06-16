import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { isTwoObjectEqual } from "../../utils/func";
import ArtistGenrePage from "../../components/Pages/Artist/ArtistGenrePage";
import artistActions from "../../redux/artist/actions";
import albumActions from "../../redux/album/actions";
import queryString from "query-string";
import { Helmet } from "react-helmet";

const { fetchDefaultArtists, fetchArtists, clearArtists } = artistActions;
const { changePageChunkIndex } = albumActions;

class ArtistGenreContainer extends Component {
  componentDidMount() {
    const { id, genre } = this.props.match.params;
    if (id && genre) {
      const { page } = queryString.parse(this.props.location.search);
      this.props.fetchArtists(genre, id, page || "");
    } else {
      this.props.clearArtists();
      this.props.fetchDefaultArtists();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      !this.props.match.params.id
    ) {
      this.props.clearArtists();
      this.props.fetchDefaultArtists();
      return;
    }

    const prevPage = queryString.parse(prevProps.location.search).page;
    const currPage = queryString.parse(this.props.location.search).page;
    // fetch new albums if the album route genre changes

    if (!isTwoObjectEqual(prevProps.match.params, this.props.match.params)) {
      const { id, genre } = this.props.match.params;
      this.props.fetchArtists(genre, id);
      this.props.changePageChunkIndex(0);
    }
    // fetch new albums if the current album route is appended with the `?page=` query

    if (currPage && prevPage !== currPage) {
      const { id, genre } = this.props.match.params;
      this.props.fetchArtists(genre, id, currPage);
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Danh sách nghệ sĩ | Xem danh sách nghệ sĩ các thể loại</title>
        </Helmet>
        <ArtistGenrePage {...this.props} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.artistState, isLoading: state.UIState.isLoading };
}

export default translate("album")(
  connect(
    mapStateToProps,
    { fetchDefaultArtists, fetchArtists, changePageChunkIndex, clearArtists }
  )(ArtistGenreContainer)
);
