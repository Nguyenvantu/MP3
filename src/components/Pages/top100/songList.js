import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Spin,
  Button,
  Icon,
  Comment,
  Avatar,
  message,
  Select
} from "antd";
import { Link } from "react-router-dom";
import LazyloadImage from "../../LazyloadImage";
import {
  PageTop,
  InteractionBox,
  BoxData,
  CommentWrapper
} from "./top100.style";
import apiUrl from "../../../settings";
import client from "../../../helpers/client";
import images from "./image";
import { SongList } from "../../HomePage/newSong.style";
import { Song } from "../../HomePage/newSong";
import { connect } from "react-redux";
import songActions from "../../../redux/song/actions";
import queueActions from "../../../redux/queue/actions";
import defaultAvatar from "../../../images/default-avatar.svg";
import { SingleComment, Editor } from "../../Comment";
import LinksByComma from "../../LinksByComma";
import { changeAlias } from "../../../utils/func";
import shareActions from "../../../redux/share/actions";
import { Helmet } from "react-helmet";

const { download, fetchSong } = songActions;

const Top100Page = ({
  match: { params },
  history,
  fetchSong,
  download,
  user,
  downloadProgress,
  replaceQueue,
  addSongToQueue,
  setDataShare
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    songs: [],
    genre: {}
  });

  const getData = async () => {
    setLoading(true);
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/top100/${params.id}`
    );
    if (error_code === 0) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  const handleScrollToElement = e => {
    const elementTop = document.getElementById("comment");
    window.scrollTo({
      top: elementTop.offsetTop,
      behavior: "smooth" // optional
    });
  };

  const handleShare = () => {
    setDataShare({
      isOpen: true,
      url: window.location.href
    });
  };

  const img = images[params.id] || images[params.name];
  const genreText =
    (data.genre &&
      data.genre.children &&
      data.genre.children[0] &&
      data.genre.children[0].title) ||
    data.genre.title ||
    "";

  return (
    <Spin spinning={loading}>
      <Helmet>
        <title>{`Top 100 bài hát ${genreText} hay nhất`}</title>
      </Helmet>
      <PageTop>
        <div
          className="blur-container"
          style={{
            backgroundImage: `url(${img})`
          }}
        />
        <div className="sub-container">
          <LazyloadImage className="img-load" src={img} />
          <div className="box-data">
            <h3>{`Top 100 bài hát ${genreText}`}</h3>
            <div className="subtext">{`Thể loại: ${data.genre &&
              data.genre.title}, ${data.genre &&
              data.genre.children &&
              data.genre.children[0] &&
              data.genre.children[0].title}`}</div>
            <div className="desc">{`Top 100 ${genreText} là danh sách 100 ca khúc nghe nhiều nhất của thể loại ${genreText}, được tự động tổng hợp dựa trên thông tin số liệu lượt nghe của các bài hát. `}</div>
          </div>
        </div>
      </PageTop>
      <InteractionBox>
        <div className="wrap-interaction">
          <Button type="primary" onClick={() => replaceQueue(data.songs)}>
            <Icon type="caret-right" />
            Nghe tất cả
          </Button>
          <Button type="link" onClick={() => addSongToQueue(data.songs)}>
            <i className="ion-play" />
            Thêm vào danh sách phát
          </Button>
          <Button type="link" onClick={handleScrollToElement}>
            <i className="ion-chatbox-working" />
            Bình luận
          </Button>
          <Button type="link" onClick={handleShare}>
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
              {data.songs.map((item, index) => {
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
            <Suggests id={params.id} />
          </Col>
        </Row>
      </BoxData>
    </Spin>
  );
};

function mapStateToProps(state) {
  const { authenticated, user } = state.auth;
  return {
    downloadProgress: state.UIState.downloadProgress,
    authenticated,
    user
  };
}

export default connect(
  mapStateToProps,
  {
    fetchSong,
    download,
    replaceQueue: queueActions.replaceQueue,
    addSongToQueue: queueActions.addSongToQueue,
    setDataShare: shareActions.setData
  }
)(Top100Page);

const Suggests = ({ id }) => {
  const [data, setData] = useState({
    songs: [],
    genres: []
  });

  const getData = async () => {
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/top100/suggest/${id}`
    );
    if (error_code === 0) {
      setData(res);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <SongList>
      {data.genres.map(GenreSuggest)}
      {data.songs.map(SongSuggest)}
    </SongList>
  );
};

const GenreSuggest = ({ className, id, title, name }) => {
  return (
    <li className={className} key={id}>
      <Link to={`/top100/${name}/${id}`}>
        <div className="card">
          <div className="thumb">
            <img src={images[id] || images[name]} alt="" />
            <span className="opac" />
            <i className="ion-play icon" />
          </div>
          <div className="card-info">
            <div className="title">{`Top 100 ${title}`}</div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const SongSuggest = ({
  _id,
  thumbnail,
  id,
  name,
  link,
  artists,
  className
}) => {
  const songName = link ? link.split("/")[2] : changeAlias(name);
  return (
    <li className={className} key={_id}>
      <Link to={`/bai-hat/${songName}/${id}`}>
        <div className="card">
          <div className="thumb">
            <img src={thumbnail} alt="" />
            <span className="opac" />
            <i className="ion-play icon" />
          </div>
          <div className="card-info">
            <div className="title">{name}</div>
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
      `${apiUrl}/media/comment-top/${id}`
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
      `${apiUrl}/media/comment-top/${id}`,
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
      `${apiUrl}/media/comment-top/action/${_id}`,
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
