const DOCUMENT = "PLAYER_";

const actions = {
  UPDATE_LYRIC: DOCUMENT + "UPDATE_LYRIC",
  UPDATE_LYRIC_PERCENT: DOCUMENT + "UPDATE_LYRIC_PERCENT",
  UPDATE_PLAYED_PERCENT: DOCUMENT + "UPDATE_PLAYED_PERCENT",

  updateLyric: (lyric1, lyric2) => {
    return {
      type: actions.UPDATE_LYRIC,
      lyrics: { lyric1, lyric2 }
    };
  },

  updatePlayedPercent: percent => {
    return {
      type: actions.UPDATE_PLAYED_PERCENT,
      playedPercent: percent
    };
  },

  updateLyricPercent: (...percentages) => {
    const payload = {};

    percentages.forEach((value, index) => {
      if (value !== null) {
        payload[`per${index + 1}`] = value;
      }
    });

    return {
      type: actions.UPDATE_LYRIC_PERCENT,
      payload
    };
  }
};

export default actions;
