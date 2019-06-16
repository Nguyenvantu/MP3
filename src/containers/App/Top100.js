import React, { Component } from "react";
import { connect } from "react-redux";
import Top100 from "../../components/Pages/top100";
import genresActions from "../../redux/genres/actions";
import { Helmet } from "react-helmet";

class Container extends Component {
  componentDidMount() {
    const {
      genres: { data },
      fetch
    } = this.props;
    if (data.length === 0) {
      fetch();
    }
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Top 100 | Tuyển tập nhạc hay chọn lọc</title>
        </Helmet>
        <Top100 {...this.props} />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    genres: state.genres
  };
}

export default connect(
  mapStateToProps,
  genresActions
)(Container);
