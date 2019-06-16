import React, { useState, useEffect } from "react";
import { Row, Col, Comment, Avatar, message, Select } from "antd";
import PropTypes from "prop-types";
import SuggestedSection from "./SuggestedSection";
import { CommentWrapper } from "../top100/top100.style";
import { SingleComment, Editor } from "../../Comment";
import apiUrl from "../../../settings";
import client from "../../../helpers/client";
import defaultAvatar from "../../../images/default-avatar.svg";
import "./index.sass";

const propTypes = {
  suggestedSongs: PropTypes.array.isRequired
};

class SongPageBody extends React.Component {
  state = {
    showLyricIndex: 0,
    showFullLyric: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.songData.id !== this.props.songData.id) {
      this.setState({
        showLyricIndex: 0,
        showFullLyric: false
      });
    }
  }

  truncateLyric = lyric => {
    if (lyric.length > 800 && !this.state.showFullLyric) {
      return lyric.substring(0, 800) + "...";
    }
    return lyric;
  };

  showFull = () => {
    this.setState({ showFullLyric: !this.state.showFullLyric });
  };

  nextLyric = () => {
    const total_lyrics = this.props.songData.text_lyrics.length;
    const { showLyricIndex } = this.state;
    if (total_lyrics <= 1 || showLyricIndex >= total_lyrics - 1) return;
    this.setState({ showLyricIndex: showLyricIndex + 1 });
  };

  prevLyric = () => {
    const total_lyrics = this.props.songData.text_lyrics.length;
    const { showLyricIndex } = this.state;
    if (total_lyrics <= 1 || showLyricIndex <= 0) return;
    this.setState({ showLyricIndex: showLyricIndex - 1 });
  };

  render() {
    const { songData, t, params, user, history } = this.props;
    const { text_lyrics } = songData;
    const { showLyricIndex, showFullLyric } = this.state;
    return (
      <div className="song-body">
        <Row gutter={20}>
          <Col sm={16}>
            <div className="song-body-lyric">
              {text_lyrics && (
                <div>
                  <div className="song-body-lyric-header">
                    <div className="song-body-lyric-header-left">
                      {t("lyric") + ": "}
                      <b>{songData.name}</b>
                    </div>
                    {!!text_lyrics.length && (
                      <div className="song-body-lyric-header-right">
                        {showLyricIndex !== 0 ? (
                          <i
                            className="active ion-ios-arrow-left"
                            onClick={this.prevLyric}
                          />
                        ) : (
                          <i />
                        )}
                        <span>{` ${t("version")}: ${showLyricIndex + 1}/${
                          text_lyrics.length
                        } `}</span>
                        {text_lyrics.length - 1 !== showLyricIndex ? (
                          <i
                            className="active ion-ios-arrow-right"
                            onClick={this.nextLyric}
                          />
                        ) : (
                          <i />
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className="song-body-lyric-content"
                    dangerouslySetInnerHTML={{
                      __html: text_lyrics[showLyricIndex]
                        ? this.truncateLyric(
                            text_lyrics[showLyricIndex].content
                          )
                        : t("noDataLyric")
                    }}
                  />
                  {text_lyrics[showLyricIndex] &&
                    text_lyrics[showLyricIndex].content.length > 800 && (
                      <span onClick={this.showFull} className="show-full-lyric">
                        {!showFullLyric ? t("show") : t("hide")}
                      </span>
                    )}
                </div>
              )}
              <Comments id={params.id} user={user} history={history} />
            </div>
          </Col>
          <Col sm={8}>
            <SuggestedSection
              songs={this.props.suggestedSongs}
              fetchSong={this.props.fetchSong}
              addSongToQueue={this.props.addSongToQueue}
              t={t}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

SongPageBody.propTypes = propTypes;

export default SongPageBody;

const Comments = ({ id, user, history }) => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("new");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/song/comment/${id}`
    );
    if (error_code === 0) {
      setData(res);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleSubmit = async (content, parent) => {
    if (!user._id) {
      message.info("Bạn phải đăng nhập để thực hiện tính năng này");
      return history.push("/dang-nhap");
    }
    setLoading(true);
    const { error_code } = await client().post(
      `${apiUrl}/media/song/comment/${id}`,
      {
        user: user._id,
        content,
        parent
      }
    );
    if (error_code === 0) {
      getData();
    }
    setLoading(false);
  };

  const handleAction = async (action, { data, parent, _id }) => {
    if (!user._id) {
      message.info("Bạn phải đăng nhập để thực hiện tính năng này");
      return history.push("/dang-nhap");
    }
    const { error_code } = await client().post(
      `${apiUrl}/media/song/comment/action/${_id}`,
      {
        action,
        data: {
          ...data,
          [user._id]: data && data[user._id] ? undefined : Date.now()
        },
        parent
      }
    );
    if (error_code === 0) {
      getData();
    }
  };

  const sorter = (a, b) => {
    if (sort === "new") {
      return a.createdAt > b.createdAt ? -1 : 1;
    } else {
      const fa = a.reply.length + (a.like || 0);
      const fb = b.reply.length + (b.like || 0);
      return fa > fb ? -1 : 1;
    }
  };

  const totalComment = data.reduce((acc, curr) => {
    return acc + 1 + (curr.reply.length || 0);
  }, 0);

  return (
    <CommentWrapper id="comment">
      <div className="comment-wrapper">
        <div className="comment-header">
          <div className="comment-total">{totalComment} Bình luận</div>
          <div className="comment-sort">
            <Select value={sort} onChange={value => setSort(value)}>
              <Select.Option value="new">Bình luận mới nhất</Select.Option>
              <Select.Option value="hot">Bình luận nổi bật</Select.Option>
            </Select>
          </div>
        </div>
      </div>
      <Comment
        avatar={<Avatar size={50} src={user.avatar || defaultAvatar} />}
        content={<Editor onSubmit={handleSubmit} loading={loading} />}
      />
      {data.sort(sorter).map(d => (
        <SingleComment
          key={d._id}
          {...d}
          loading={loading}
          handleSubmit={handleSubmit}
          handleAction={handleAction}
          currentUser={user}
        />
      ))}
    </CommentWrapper>
  );
};
