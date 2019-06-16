import React, { Component } from "react";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";
// import TopResult from "./TopResult";
import SongResult from "./SongResult";
import AlbumResult from "./AlbumResult";
import ArtistResult from "./ArtistResult";
import { Spin } from "antd";
import "./index.sass";

class SearchMenu extends Component {
  handleClickOutside = () => {
    this.props.clearSearchResult();
  };

  render() {
    const { data } = this.props.searchResult;
    if (!data) return null;
    const { t, clearSearchResult, loading } = this.props;
    return (
      <ul className="search-menu">
        <Spin spinning={loading}>
          {/* {data.top && (
          <TopResult
            {...data.top}
            clearSearchResult={clearSearchResult}
            t={t}
          />
        )} */}
          <SongResult
            songs={data.song || []}
            clearSearchResult={clearSearchResult}
            t={t}
          />
          <ArtistResult
            artists={data.artist || []}
            clearSearchResult={clearSearchResult}
            t={t}
          />
          <AlbumResult
            albums={data.album || []}
            clearSearchResult={clearSearchResult}
            t={t}
          />
        </Spin>
      </ul>
    );
  }
}

SearchMenu.propTypes = {
  searchResult: PropTypes.object.isRequired,
  clearSearchResult: PropTypes.func.isRequired
};

export default translate("nav")(onClickOutside(SearchMenu));
