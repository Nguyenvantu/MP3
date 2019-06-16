import React from "react";
import PropTypes from "prop-types";
import InputRange from "react-input-range";
import { Link } from "react-router-dom";
import { PlayerLoader } from "./PlayerLoader";
import { initAnalyzer, frameLooper } from "../../utils/initAnalyzer";
import LinksByComma from "../LinksByComma";
import {
  requestInterval,
  clearRequestInterval
} from "../../utils/requestInterval";
import {
  changeAlias,
  getSongUrl,
  // isTwoObjectEqual,
  formatTime
} from "../../utils/func";
import Quality from "./quality";
import "./index.sass";
import { message } from "antd";

class Player extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      progress: 0,
      isSeeking: false,
      isPlaying: false,
      loop: false,
      isRandom: false,
      quality: "128"
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.myRef.current.addEventListener("play", this.onPlay);
    this.myRef.current.addEventListener("pause", this.onPause);
    this.myRef.current.addEventListener("ended", this.onEnded);
    initAnalyzer(this.myRef.current);
  }

  componentWillUnmount() {
    this.timer && clearRequestInterval(this.timer);
  }

  onPlay = () => {
    this.setState({ isPlaying: true });
    this.timer = requestInterval(this.update, 10);
  };

  onPause = () => {
    clearRequestInterval(this.timer);
  };

  onEnded = () => {
    clearRequestInterval(this.timer);
    this.playPrevOrNextSong(this.state.isRandom ? "random" : "next");
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      state: { isPlaying, quality },
      myRef
    } = this;
    if (isPlaying !== prevState.isPlaying) {
      if (isPlaying) {
        myRef.current.play();
      } else {
        myRef.current.pause();
      }
    }
    if (this.props.songData.id !== prevProps.songData.id && !!this.timer) {
      clearRequestInterval(this.timer);
    }
    if (quality !== prevState.quality) {
      this.myRef.current.currentTime = 0;
    }
    // if (
    //   !isTwoObjectEqual(prevProps.queueIds, this.props.queueIds) &&
    //   !this.props.queueIds.includes(prevProps.songData.id) &&
    //   this.props.queue[0]
    // ) {
    //   const { name, id } = this.props.queue[0];
    //   console.log(name, id);
    //   // this.props.fetchSong(changeAlias(name), id);
    //   // if (/\/song\//.test(window.location.href)) {
    //   //   // only redirect if is on the song route
    //   //   this.props.history.push(`/song/${changeAlias(name)}/${id}`);
    //   // }
    // }
    // const prevPercent = prevProps.playerState.per1;
    // const currentPercent = this.props.playerState.per2;

    // if (currentPercent !== prevPercent && currentPercent) {
    //   myRef.current.currentTime =
    //     (myRef.current.duration * currentPercent) / 100;
    // }
  }

  findSong = prevOrnext => {
    const {
      queue,
      songData: { id }
    } = this.props;
    let index = 0;
    for (let i = 0, length = queue.length; i < length; i++) {
      if (queue[i].id === id) {
        switch (prevOrnext) {
          case "next":
            if (length <= 1) return null;
            index = (i + 1) % length;
            // replay the queue if the index is equal the queue length otherwise play the next song
            break;
          case "prev":
            if (length <= 1) return null;
            index = (i + length - 1) % length;
            // play the last song in the queue if the index is 0 otherwise play the prev song
            break;
          case "random":
            if (length <= 1) return null;
            let random = 0;
            while (random === i && queue.length > 1)
              random = Math.floor(Math.random() * queue.length);
            index = random;
            // play the random song with next index will be different the prev index
            break;
          default:
            return null;
        }
        return queue[index];
      }
    }
    return null;
  };

  playPrevOrNextSong = prevOrnext => {
    const prevOrnextSong = this.findSong(prevOrnext);
    if (prevOrnextSong) {
      const { name, alias, id } = prevOrnextSong;
      this.props.fetchSong(alias ? alias : changeAlias(name), id);
    }
  };

  togglePlayBtn = () => {
    this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }));
  };

  updateProgressbar = () => {
    let progress = 0;
    const {
      myRef: { current },
      state: { isSeeking }
    } = this;
    if (current && current.currentTime > 0) {
      progress = Math.round((current.currentTime / current.duration) * 100);
    }
    if (!isSeeking) {
      this.setState({ progress });
    }
  };

  update = () => {
    const { lyric } = this.props.songData;
    this.updateProgressbar();
    frameLooper();
    if (!lyric || !lyric.length) {
      return clearRequestInterval(this.timer);
    }
    const {
      playerState: { lyric1, lyric2 },
      updateLyricPercent,
      updateLyric
    } = this.props;
    const currentTime = this.myRef.current.currentTime;
    // reset lyric state
    if (currentTime > lyric[lyric.length - 1].end || currentTime) {
      // clear lyric when the this.myRef.current is playing with beat only
      updateLyric([], []);
    }

    for (let i = 0; i < lyric.length; i++) {
      if (
        i < lyric.length - 1 &&
        i % 2 === 0 &&
        currentTime >= lyric[i].start &&
        currentTime <= lyric[i + 1].end
      ) {
        updateLyric(lyric[i], lyric[i + 1]);
        break;
      }
    }

    if (currentTime <= lyric1.end) {
      const width =
        ((currentTime - lyric1.start) / (lyric1.end - lyric1.start)) * 100;
      // width = Math.ceil(width);
      updateLyricPercent(Math.ceil(width), 0);
    } else if (currentTime <= lyric2.end) {
      // updateLyricPercent(null, 0);
      const width =
        ((currentTime - lyric2.start) / (lyric2.end - lyric2.start)) * 100;
      // width = Math.ceil(width);
      // width = width <= 0 ? 0 : (width > 96 ? 100 : width); // fill the karaoke text
      updateLyricPercent(100, Math.ceil(width));
    }
  };

  handleChange = progress => {
    this.setState({ progress, isSeeking: true });
  };

  handleChangeComplete = value => {
    if (value === 100) {
      this.props.updateLyric([], []);
    }
    this.myRef.current.play();
    if (this.myRef.current.duration) {
      this.myRef.current.currentTime =
        (value / 100) * this.myRef.current.duration;
    }
    this.setState({ isSeeking: false });
  };

  toggleLoop = () => {
    this.setState(({ loop, progress }) => {
      if (progress === 100) {
        this.myRef.current.play();
      }
      return { loop: !loop, isRandom: false };
    });
  };

  toggleRandom = () =>
    this.setState(({ isRandom }) => ({ isRandom: !isRandom, loop: false }));

  setQuality = quality => {
    const { isVip } = this.props;
    if (quality === "128" || isVip) {
      this.setState({ quality });
    } else {
      message.info(
        "Bạn cần nâng cấp tài khoản VIP để có thể chọn chất lượng này!"
      );
    }
  };

  render() {
    const {
      myRef,
      state: { loop, progress, isPlaying, isRandom, quality },
      props: { songData, queue, t, toggleQueue, isFetching }
    } = this;

    return (
      <div className="player">
        <audio
          autoPlay
          rel="noreferrer"
          src={songData.source && songData.source[quality]}
          crossOrigin="anonymous"
          ref={myRef}
          loop={loop}
          preload="metadata"
        />
        <img
          src={songData.thumbnail || "/images/default.jpg"}
          className="player-song-thumbnail"
          alt=""
        />
        <div className="player-info">
          <Link
            to={getSongUrl(songData.name, songData.id)}
            className="ellipsis player-song-title"
            title={songData.name}
          >
            {songData.name}
          </Link>
          <LinksByComma
            className="ellipsis player-info-artists comma"
            data={songData.artists || []}
            titleEntry="name"
            pathEntry="link"
          />
        </div>
        <div className="player-btns">
          <button
            className="sc-ir player-btn"
            onClick={() => this.playPrevOrNextSong("prev")}
            title={t("back")}
          >
            <i className="ion-ios-rewind" />
          </button>
          <button
            className="sc-ir player-btn"
            onClick={this.togglePlayBtn}
            title={isPlaying ? t("pause") : t("play")}
          >
            <i className={`ion-${isPlaying ? "pause" : "play"}`} />
          </button>
          <button
            className="sc-ir player-btn"
            onClick={() => this.playPrevOrNextSong("next")}
            title={t("next")}
          >
            <i className="ion-ios-fastforward" />
          </button>
        </div>
        <div className="player-seek">
          <span>
            {myRef.current && myRef.current.currentTime
              ? formatTime(myRef.current.currentTime)
              : "0:00"}
          </span>
          <InputRange
            maxValue={100}
            minValue={0}
            value={progress}
            onChange={this.handleChange}
            onChangeComplete={this.handleChangeComplete}
          />
          <span>
            {myRef.current &&
              (!isNaN(myRef.current.duration) &&
                formatTime(myRef.current.duration))}
          </span>
        </div>
        <div className="player-other">
          <button className="sc-ir" title={t("loop")}>
            <i
              className="ion-loop"
              style={{ color: loop ? "#23B89A" : "#adb5bd" }}
              onClick={this.toggleLoop}
            />
          </button>
          <button className="sc-ir" title={t("random")}>
            <i
              className="ion-shuffle"
              style={{ color: isRandom ? "#23B89A" : "#adb5bd" }}
              onClick={this.toggleRandom}
            />
          </button>
          <Quality
            quality={quality}
            setQuality={this.setQuality}
            source={songData.source}
          />
          <button className="sc-ir player-btn queue-btn" onClick={toggleQueue}>
            <span className="queue-circle">{queue.length}</span>
            <img src="/svg/playlist.svg" alt="" />
          </button>
        </div>
        {isFetching && <PlayerLoader />}
      </div>
    );
  }
}

Player.propTypes = {
  playerState: PropTypes.object.isRequired,
  updateLyric: PropTypes.func.isRequired,
  updateLyricPercent: PropTypes.func.isRequired,
  songData: PropTypes.object.isRequired,
  fetchSong: PropTypes.func.isRequired,
  queue: PropTypes.array.isRequired,
  queueIds: PropTypes.array,
  toggleQueue: PropTypes.func.isRequired,
  togglePushRoute: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Player;
