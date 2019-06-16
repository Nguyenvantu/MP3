// import Player from './playerContainer';
// import Karaoke from './karaokeContainer';
// import SongPage from './SongPage';
// import HomePage from './homePageContainer';
// import AlbumGenrePage from './AlbumGenrePage';
// import App from './App';
// import Queue from './queueContainer';
// import AlbumPlaylist from './AlbumPlaylist';
// import ArtistPage from './ArtistPage';
// import ArtistGenrePage from './ArtistGenrePage';
// import ChartPage from './ChartPage';
// import LogInPage from './LogInPage';
// import SignUpPage from './SignUpPage';
// import UserPage from './UserPageContainer';
// import Modal from './Modal';
import asyncComponent from "../../helpers/AsyncFunc";

const Player = asyncComponent(() => import("./playerContainer"));
const Karaoke = asyncComponent(() => import("./karaokeContainer"));
const SongPage = asyncComponent(() => import("./SongPage"));
const HomePage = asyncComponent(() => import("./homePageContainer"));
const AlbumGenrePage = asyncComponent(() => import("./AlbumGenrePage"));
const AlbumPlaylist = asyncComponent(() => import("./AlbumPlaylist"));
const App = asyncComponent(() => import("./App"));
const Queue = asyncComponent(() => import("./queueContainer"));
const ArtistGenrePage = asyncComponent(() => import("./ArtistGenrePage"));
const ArtistPage = asyncComponent(() => import("./ArtistPage"));
const ChartPage = asyncComponent(() => import("./ChartPage"));
const LogInPage = asyncComponent(() => import("./LogInPage"));
const SignUpPage = asyncComponent(() => import("./SignUpPage"));
const UserPage = asyncComponent(() => import("./UserPageContainer"));
const Modal = asyncComponent(() => import("./Modal"));
const Top100 = asyncComponent(() => import("./Top100"));
const Top100Detail = asyncComponent(() => import("../../components/Pages/top100/songList"));

export {
  Player ,
  Karaoke,
  SongPage,
  HomePage,
  App,
  Queue,
  AlbumGenrePage,
  AlbumPlaylist,
  ArtistPage,
  ArtistGenrePage,
  ChartPage,
  LogInPage,
  SignUpPage,
  UserPage,
  Modal,
  Top100,
  Top100Detail
};
