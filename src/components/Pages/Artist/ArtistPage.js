import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Icon,
  Comment,
  Avatar,
  message,
  Select,
  Typography
} from "antd";
// import Pagination from "../../Pagination";
import WithBackgroundImage from "../../WithBgImg";
import LazyloadImage from "../../LazyloadImage";
import { Link } from "react-router-dom";
import { Song } from "../../HomePage/newSong";
import { Card as AlbumCard } from "../../HomePage/album";
import { SongList } from "../../HomePage/newSong.style";
import {
  // PageTop,
  // InteractionBox,
  BoxData,
  CommentWrapper
} from "../top100/top100.style";
import { SingleComment, Editor } from "../../Comment";
import apiUrl from "../../../settings";
import client from "../../../helpers/client";
import defaultAvatar from "../../../images/default-avatar.svg";
import "./index.sass";
import { changeAlias } from "../../../utils/func";
import moment from "moment";

class ArtistPage extends React.Component {
  render() {
    const {
      thumbnail,
      cover,
      songs,
      artistName,
      albums,
      fullName,
      suggestedArtists,
      dateOfBirth,
      biography,
      replaceQueue,
      downloadProgress,
      fetchSong,
      download,
      match: { params },
      history,
      user,
      t
    } = this.props;
    return (
      <div className="artist-page">
        <WithBackgroundImage className="artist-page-header" src={cover}>
          <div className="artist-box">
            <LazyloadImage
              className="artist-avatar image-wrapper"
              src={thumbnail || "/images/artist_default.png"}
            />
            <div className="aritst-name">{artistName || fullName}</div>
          </div>
        </WithBackgroundImage>
        <BoxData>
          <Row gutter={20}>
            <Col sm={16}>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div className="heading">Danh sách bài hát</div>
                <Button disabled={!songs.length} type="primary" onClick={() => replaceQueue(songs)}>
                  <Icon type="caret-right" />
                  Nghe tất cả
                </Button>
              </div>
              <SongList className="list-top">
                {songs.map(item => {
                  return (
                    <Song
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
              <div className="heading">Danh sách Album</div>
              <Row gutter={20} type="flex">
                {albums.map(item => {
                  return (
                    <Col md={6} sm={8} xs={12} key={item.id}>
                      <AlbumCard {...item} />
                    </Col>
                  );
                })}
              </Row>
              <div className="heading">Giới thiệu</div>
              <div>Tên thật: {fullName}</div>
              <p>
                Ngày sinh:{" "}
                {dateOfBirth && moment(dateOfBirth).isValid()
                  ? moment(dateOfBirth).format("DD/MM/Y")
                  : dateOfBirth}
              </p>
              <Typography.Paragraph ellipsis={{ rows: 4, expandable: true }}>
                {biography}
              </Typography.Paragraph>
              <Comments {...params} user={user} history={history} />
            </Col>
            <Col sm={8}>
              <div className="heading">{t("suggestedArtists")}</div>
              {suggestedArtists.map(ArtistsList)}
            </Col>
          </Row>
        </BoxData>
      </div>
    );
  }
}

const ArtistsList = ({ id, link, thumbnail, name }) => (
  <div className="suggested-artist" key={id}>
    <Link
      to={`/nghe-si/${link ? link.split("/")[2] : changeAlias(name)}${
        id ? "/" + id : ""
      }`}
      className="suggested-artist-name"
    >
      <img
        alt=""
        src={thumbnail && thumbnail.replace("240_240", "94_94")}
        title={name}
      />
      <div className="suggested-artist-info">{name}</div>
    </Link>
  </div>
);

export default ArtistPage;

const Comments = ({ id = "", name = "", user, history }) => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("new");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/artist/comment/${name}?id=${id}`
    );
    if (error_code === 0) {
      setData(res);
    }
  };

  useEffect(() => {
    getData();
  }, [id, name]);

  const handleSubmit = async (content, parent) => {
    if (!user._id) {
      message.info("Bạn phải đăng nhập để thực hiện tính năng này");
      return history.push("/dang-nhap");
    }
    setLoading(true);
    const { error_code } = await client().post(
      `${apiUrl}/media/artist/comment/${name}?id=${id}`,
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
      `${apiUrl}/media/artist/comment/action/${_id}`,
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
