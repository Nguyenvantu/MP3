import React from "react";
import PropTypes from "prop-types";
import QueueList from "./QueueList";
import "./index.sass";

const Queue = ({ toggleQueue, clearQueue, show, t, ...props }) => {
  return (
    <div className={`queue${show ? " queue-visible" : ""}`}>
      <div className="queue-panel">
        <div className="queue-title">{t("nextUp")}</div>
        <div className="queue-clear">
          <button onClick={clearQueue}>{t("clear")}</button>
        </div>
        <div className="queue-hide">
          <button className="sc-ir" onClick={toggleQueue}>
            Hide queue
          </button>
        </div>
      </div>
      <QueueList {...props} />
    </div>
  );
};

Queue.propTypes = {
  songs: PropTypes.array.isRequired,
  toggleQueue: PropTypes.func.isRequired,
  removeSongFromQueue: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  fetchSong: PropTypes.func.isRequired
};

export default Queue;
