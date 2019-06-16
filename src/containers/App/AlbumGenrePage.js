import React, { Component } from "react";
import { connect } from "react-redux";
import AlbumGenrePage from "../../components/Pages/Album/AlbumGenrePage";
import { isTwoObjectEqual } from "../../utils/func";
import albumActions from "../../redux/album/actions";
import { translate } from "react-i18next";
import queryString from "query-string";
import { Helmet } from "react-helmet";

const { fetchDefaultAlbums, fetchAlbums, changePageChunkIndex } = albumActions;
class AlbumGenreContainer extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id, genre }
      },
      location: { search }
    } = this.props;
    if (id && genre) {
      const { page } = queryString.parse(search);
      this.props.fetchAlbums(genre, id, page || "");
    } else {
      this.props.fetchDefaultAlbums();
    }
  }

  componentDidUpdate(prevProps) {
    // fetch default albums if the user navigate to the index album route

    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      /albums$/.test(this.props.location.pathname)
    ) {
      this.props.fetchDefaultAlbums();
      return;
    }

    // console.log(this.props.match)
    // fetch new albums if the album route genre changes
    if (!isTwoObjectEqual(prevProps.match.params, this.props.match.params)) {
      const { id, genre } = this.props.match.params;
      this.props.fetchAlbums(genre, id);
      this.props.changePageChunkIndex(0);
    }

    // fetch new albums if the current album route is appended with the `?page=` query
    const prevPage = queryString.parse(prevProps.location.search).page;
    const currPage = queryString.parse(this.props.location.search).page;
    if (currPage && prevPage !== currPage) {
      const { id, genre } = this.props.match.params;
      this.props.fetchAlbums(genre, id, currPage);
      return;
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Danh sách albums | Xem danh sách albums các thể loại</title>
        </Helmet>
        <AlbumGenrePage {...this.props} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.albumState, isLoading: state.UIState.isLoading };
}

export default translate("album")(
  connect(
    mapStateToProps,
    { changePageChunkIndex, fetchAlbums, fetchDefaultAlbums }
  )(AlbumGenreContainer)
);
