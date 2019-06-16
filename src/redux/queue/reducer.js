import actions from "./actions";
import { saveQueueState, loadQueueState } from "../../utils/localStorage";
import { message } from "antd";

const initialState = {
  queue: [],
  ids: [],
  pushRoute: false
};

export default function(state = loadQueueState(), action) {
  switch (action.type) {
    case actions.ADD_SONG_TO_QUEUE:
      return addSongToQueue(state, action);

    case actions.TOGGLE_PUSH_ROUTE:
      return { ...state, pushRoute: action.flag };

    case actions.REPLACE_QUEUE: {
      const newState = { ...state, queue: [...action.songs], ids: action.ids };
      saveQueueState(newState);
      return newState;
    }

    case actions.CLEAR_QUEUE: {
      const newState = { ...initialState };
      saveQueueState(newState);
      return newState;
    }

    case actions.REMOVE_SONG_FROM_QUEUE: {
      const newState = { ...state, queue: action.queue, ids: action.ids };
      saveQueueState(newState);
      return newState;
    }

    case actions.PLAY_USER_PLAYLIST: {
      const newState = { ...state, queue: action.queue, ids: action.ids };
      saveQueueState(newState);
      return newState;
    }

    case actions.SORT_QUEUE: {
      const newState = {
        ...state,
        queue: action.queue,
        ids: action.ids
      };
      saveQueueState(newState);
      return newState;
    }

    default:
      return state;
  }
}

function addSongToQueue(state, action) {
  if (action.songs.length === 1) {
    const con = state.ids.find(id => id === action.songs[0].id);
    if (!con) {
      const newState = {
        queue: [...state.queue, ...action.songs],
        ids: [...state.ids, ...action.songs.map(sog => sog.id)]
      };
      saveQueueState(newState);
      message.info(action.songs[0].name + " đã được thêm vào danh sách nghe");
      return newState;
    }
    message.warn(action.songs[0].name + " đã có sẵn trong danh sách nghe");
    return state;
  } else {
    const newState = {
      queue: [...state.queue, ...action.songs],
      ids: [...state.ids, ...action.songs.map(sog => sog.id)]
    };
    saveQueueState(newState);
    message.info(
      action.songs.length + " bài hát đã được thêm vào danh sách nghe"
    );
    return newState;
  }
}
