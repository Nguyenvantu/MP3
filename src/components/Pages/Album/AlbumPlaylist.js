import React, { useState, useEffect } from "react";
import { Row, Col, Button, Icon, Comment, Avatar, message, Select } from "antd";
import { isEmpty, changeAlias } from "../../../utils/func";
import "./album_playlist.sass";
import { Link } from "react-router-dom";
import LinksByComma from "../../LinksByComma";
import LazyloadImage from "../../LazyloadImage";
import {
  PageTop,
  InteractionBox,
  BoxData,
  CommentWrapper
} from "../top100/top100.style";
import { Song } from "../../HomePage/newSong";
import { SongList } from "../../HomePage/newSong.style";
import apiUrl from "../../../settings";
import client from "../../../helpers/client";
import { SingleComment, Editor } from "../../Comment";
import defaultAvatar from "../../../images/default-avatar.svg";
import { Helmet } from "react-helmet";
class AlbumPlaylist extends React.Component {
  handleScrollToElement = e => {
    const elementTop = document.getElementById("comment");
    window.scrollTo({
      top: elementTop.offsetTop,
      behavior: "smooth" // optional
    });
  };

  handleShare = () => {
    const { setDataShare } = this.props;
    setDataShare({
      isOpen: true,
      url: window.location.href
    });
  };

  render() {
    const {
      playlist,
      replaceQueue,
      suggestedAlbums,
      addSongToQueue,
      downloadProgress,
      history,
      download,
      fetchSong,
      match: { params },
      user
    } = this.props;
    if (isEmpty(playlist)) return null;
    const genres = playlist.genres.map(item => item.title).join(", ");

    return (
      <>
        <Helmet>
          <title>{playlist.title}</title>
        </Helmet>
        <PageTop>
          <div
            className="blur-container"
            style={{
              backgroundImage: `url(${playlist.thumbnail})`
            }}
          />
          <div className="sub-container">
            <LazyloadImage className="img-load" src={playlist.thumbnail} />
            <div className="box-data">
              <h3>{playlist.title}</h3>
              <div className="subtext">
                <LinksByComma
                  data={playlist.artists}
                  titleEntry="name"
                  pathEntry="link"
                />
              </div>
              <div className="subtext">{genres}</div>
              <div className="subtext">
                Phát hành: {new Date(playlist.release_date).getFullYear()}
              </div>
            </div>
          </div>
        </PageTop>
        <InteractionBox>
          <div className="wrap-interaction">
            <Button type="primary" onClick={() => replaceQueue(playlist.songs)}>
              <Icon type="caret-right" />
              Nghe tất cả
            </Button>
            <Button type="link" onClick={() => addSongToQueue(playlist.songs)}>
              <i className="ion-play" />
              Thêm vào danh sách phát
            </Button>
            <Button type="link" onClick={this.handleScrollToElement}>
              <i className="ion-chatbox-working" />
              Bình luận
            </Button>
            <Button type="link" onClick={this.handleShare}>
              <i className="ion-android-share-alt" />
              Chia sẻ
            </Button>
          </div>
        </InteractionBox>
        <BoxData>
          <Row gutter={20}>
            <Col sm={16}>
              <div className="heading">Danh sách bài hát</div>
              <SongList className="list-top">
                {playlist.songs.map((item, index) => {
                  return (
                    <Song
                      index={index + 1}
                      noShowListen
                      downloadProgress={downloadProgress}
                      fetchSong={fetchSong}
                      download={download}
                      key={item.id}
                      {...item}
                    />
                  );
                })}
              </SongList>
              <Comments id={params.id} user={user} history={history} />
            </Col>
            <Col sm={8}>
              <div className="heading">Có thể bạn quan tâm</div>
              <SongList>{suggestedAlbums.map(AlbumSuggest)}</SongList>
            </Col>
          </Row>
        </BoxData>
      </>
    );
  }
}

export default AlbumPlaylist;

const AlbumSuggest = ({ className, id, title, thumbnail, artists = [] }) => {
  return (
    <li className={className} key={id}>
      <Link to={`/album/${changeAlias(title)}/${id}`}>
        <div className="card">
          <div className="thumb">
            <img src={thumbnail} alt="" />
            <span className="opac" />
            <i className="ion-play icon" />
          </div>
          <div className="card-info">
            <div className="title">{title}</div>
            <div className="artist">
              <LinksByComma
                data={artists}
                noLink
                titleEntry="name"
                pathEntry="link"
              />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const Comments = ({ id, user, history }) => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("new");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/album/comment/${id}`
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
      `${apiUrl}/media/album/comment/${id}`,
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
      `${apiUrl}/media/album/comment/action/${_id}`,
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
