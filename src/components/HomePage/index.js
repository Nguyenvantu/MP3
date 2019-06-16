import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Spin } from "antd";
// import { connect } from "react-redux";
// import TrackList from "./TrackList";
import Chart from "../Chart";
// import Choices from "./Choices";
import NewSongs from "./newSong";
import Top100 from "./top100";
import Albums from "./album";
import Artists from "./artist";

class ChartPanel extends React.Component {
  state = { activeChart: "pop" };
  handleOnClick(alias) {
    this.props.changeActiveChart(alias);
    this.setState({ activeChart: alias });
  }

  render() {
    const { t } = this.props;
    const list = [
      { alias: "pop", title: t("topUs") },
      { alias: "kpop", title: t("topKr") },
      { alias: "vpop", title: t("topVn") }
    ];
    const { activeChart } = this.state;
    return (
      <div className="chart-panel">
        {list.map(item => (
          <button
            key={item.alias}
            onClick={() => this.handleOnClick(item.alias)}
            className={`sc-ir ${
              activeChart === item.alias ? "chart-panel-btn-active" : ""
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    );
  }
}

const HomePage = ({ chart, changeActiveChart, ...props }) => (
  <div className="homepage home-container">
    <Row>
      <Col md={16}>
        <NewSongs {...props} />
        <Top100 t={props.t} />
      </Col>
      <Col md={8}>
        <div className="chart-wrapper">
          <ChartPanel changeActiveChart={changeActiveChart} t={props.t} />
          <Spin spinning={chart.loading}>
            <Chart
              t={props.t}
              chart={chart[chart.activeChart]}
              downloadProgress={props.downloadProgress}
              download={props.download}
              fetchSong={props.fetchSong}
            />
          </Spin>
        </div>
      </Col>
    </Row>
    <Albums t={props.t} />
    <Artists t={props.t} />
  </div>
);

HomePage.propTypes = {
  chart: PropTypes.object.isRequired,
  changeActiveChart: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.object.isRequired,
  isFading: PropTypes.bool.isRequired,
  download: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default HomePage;
