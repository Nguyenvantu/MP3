import React, { useEffect } from "react";
import { connect } from "react-redux";
import Player from "../../components/Player";
import playerActions from "../../redux/player/actions";
import uiActions from "../../redux/ui/actions";
import queueActions from "../../redux/queue/actions";
import songActions from "../../redux/song/actions";
import { translate } from "react-i18next";
import { changeAlias } from "../../utils/func";

const { togglePushRoute } = queueActions;
const { toggleQueue } = uiActions;
const { updateLyric, updateLyricPercent } = playerActions;

const PlayerContainer = props => {
  useEffect(() => {
    const { queue, songData } = props;
    if (queue.length && !songData.id) {
      const { name, id, alias } = queue[0];
      props.fetchSong(alias || changeAlias(name), id);
    }
  }, []);

  return <Player {...props} />;
};

function mapStateToProps({ playerState, songData, queueState, auth }) {
  return {
    playerState,
    songData: songData.data,
    isFetching: songData.isFetching,
    queue: queueState.queue,
    queueIds: queueState.ids,
    isVip: auth.user && auth.user.isVip
  };
}

export default translate("player")(
  connect(
    mapStateToProps,
    {
      updateLyric,
      updateLyricPercent,
      toggleQueue,
      togglePushRoute,
      ...songActions
    }
  )(PlayerContainer)
);
