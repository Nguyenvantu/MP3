import React, { Component } from "react";
import { connect } from "react-redux";
import ChartPage from "../../components/Pages/Chart";
import chartActions from "../../redux/chart/actions";
import songActions from "../../redux/song/actions";
import { isEmpty } from "../../utils/func";
import { translate } from "react-i18next";

const { getChart } = chartActions;
const { download } = songActions;

class ChartPageContainer extends Component {
  componentDidMount() {
    const { pop, kpop, vpop, getChart } = this.props;

    if (isEmpty(pop)) getChart("pop");
    if (isEmpty(kpop)) getChart("kpop");
    if (isEmpty(vpop)) getChart("vpop");
  }

  downloadSong = criteria => {
    if (!this.props.authenticated) {
      return this.props.history.push("/login");
    }
    return this.props.download(criteria);
  };
  render() {
    return (
      <ChartPage
        pop={this.props.pop}
        kpop={this.props.kpop}
        vpop={this.props.vpop}
        download={this.downloadSong}
        downloadProgress={this.props.downloadProgress}
        t={this.props.t}
      />
    );
  }
}

function mapStateToProps(state) {
  const { downloadProgress } = state.UIState;
  const { authenticated } = state.auth;
  return {
    ...state.chartState,
    downloadProgress,
    authenticated
  };
}

export default translate("homePage")(
  connect(
    mapStateToProps,
    { getChart, download }
  )(ChartPageContainer)
);
