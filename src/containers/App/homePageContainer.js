import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "../../components/HomePage";
import chartActions from "../../redux/chart/actions";
import songActions from "../../redux/song/actions";
import queueActions from "../../redux/queue/actions";
import { translate } from "react-i18next";
// import { fetchOnScroll } from "../../HOC";
import { isEmpty } from "../../utils/func";
import { Helmet } from "react-helmet";

const { download, fetchSong } = songActions;
const { changeActiveChart, getChart } = chartActions;
const { replaceQueue } = queueActions;
class HomePageContainer extends Component {
  componentDidMount() {
    const { chart, getChart, changeActiveChart } = this.props;
    if (isEmpty(chart[chart.activeChart])) {
      getChart("pop");
    } else {
      changeActiveChart("pop");
    }
    // if (queue.length && isEmpty(songData)) {
    //   const { name, id, alias } = queue[0];
    //   this.props.fetchSong(alias || changeAlias(name), id);
    // }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Trang nghe nhạc trực tuyến | Nghe và tải nhạc chất lượng cao</title>
        </Helmet>
        <HomePage {...this.props} />
      </>
    );
  }
}

function mapStateToProps(state) {
  const { authenticated } = state.auth;
  return {
    chart: state.chartState,
    downloadProgress: state.UIState.downloadProgress,
    isFading: state.UIState.isFading,
    authenticated
  };
}

export default translate("homePage")(
  withRouter(
    connect(
      mapStateToProps,
      {
        changeActiveChart,
        getChart,
        fetchSong,
        download,
        replaceQueue
      }
    )(HomePageContainer)
  )
);
