import { combineReducers } from 'redux';
import playerReducer from './player/reducer';
import songReducer from './song/reducer';
import UIReducer from './ui/reducer';
import queueReducer from './queue/reducer';
import albumReducer from './album/reducer';
import artistReducer from './artist/reducer';
import chartReducer from './chart/reducer';
import authReducer from './auth/reducer';
import playlistReducer from './user_playlist/reducer';
import genres from './genres/reducer';
import share from './share/reducer';

export default combineReducers({
  playerState: playerReducer,
  songData: songReducer,
  UIState: UIReducer,
  queueState: queueReducer,
  albumState: albumReducer,
  artistState: artistReducer,
  chartState: chartReducer,
  auth: authReducer,
  playlistState: playlistReducer,
  genres,
  share
});