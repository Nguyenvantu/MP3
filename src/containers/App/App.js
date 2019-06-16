import React from "react";
import { connect } from "react-redux";
import { BackTop } from "antd";
import Nav from "../../components/Nav";
import Analyzer from "../../components/Analyzer";
import Queue from "./queueContainer";
import Player from "./playerContainer";
import Modal from "./Modal";
import Share from "../../components/Share";
import "./global.sass";

function App({
  showPlayer,
  showAnalyzer,
  showQueue,
  slideInRight,
  auth,
  children,
  dispatch
}) {
  const className = `container animated ${slideInRight ? "slideInRight" : ""}`;
  return (
    <>
      <Nav auth={auth} dispatch={dispatch} />
      <div className={className}>
        {children}
        <Analyzer show={showAnalyzer} />
      </div>
      <Queue show={showQueue} />
      {showPlayer ? <Player /> : null}
      <BackTop />
      <Share />
      <Modal />
    </>
  );
}

function mapStateToProps({ queueState, UIState, auth }) {
  const { showQueue, showAnalyzer, slideInRight } = UIState;

  return {
    showPlayer: queueState.ids.length,
    showAnalyzer,
    showQueue,
    slideInRight,
    auth
  };
}

export default connect(mapStateToProps)(App);
