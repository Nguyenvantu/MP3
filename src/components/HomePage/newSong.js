import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Row, Col, Icon, Menu, Dropdown, Spin } from "antd";
import { Link } from "react-router-dom";
import Wrapper, { SongList } from "./newSong.style";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import LinksByComma from "../LinksByComma";
import { changeAlias, formatNumber } from "../../utils/func";
import userPlaylistActions from "../../redux/user_playlist/actions";
import uiActions from "../../redux/ui/actions";
import shareActions from "../../redux/share/actions";
import queueActions from "../../redux/queue/actions";
import { chunk } from "lodash";

const NewSongs = ({
  fetchSong,
  download,
  downloadProgress,
  t,
  replaceQueue
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/song/news`
    );
    if (error_code === 0) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const [list1 = [], list2 = []] = chunk(data, 5);
  return (
    <Wrapper>
      <Spin spinning={loading}>
        <div className="box-title">
          <span>{t("newSongs")}</span>
          <Button type="primary" onClick={() => replaceQueue(data)}>
            <Icon type="caret-right" />
            {t("playAll")}
          </Button>
        </div>
        <Row>
          <Col sm={12}>
            <SongList>
              {list1.map(item => {
                return (
                  <Song
                    fetchSong={fetchSong}
                    download={download}
                    downloadProgress={downloadProgress}
                    key={item.id}
                    {...item}
                  />
                );
              })}
            </SongList>
          </Col>
          <Col sm={12}>
            <SongList>
              {list2.map(item => {
                return (
                  <Song
                    downloadProgress={downloadProgress}
                    fetchSong={fetchSong}
                    download={download}
                    key={item.id}
                    {...item}
                  />
                );
              })}
            </SongList>
          </Col>
        </Row>
      </Spin>
    </Wrapper>
  );
};

const style = {
  marginRight: 12,
  fontSize: 18
};

const stopPropagation = e => e.stopPropagation();

export const SongWrapper = ({
  fetchSong,
  download,
  downloadProgress,
  thumbnail,
  id,
  name,
  artists,
  index,
  link,
  listen,
  noShowListen,
  className,
  setDataShare,
  addSongToStoreTemporarily,
  addSongToQueue
  // toggleModal
}) => {
  const onClick = () => fetchSong && fetchSong(name, id);
  const songName = link ? link.split("/")[2] : changeAlias(name);

  const onMenuClick = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    if (key === "1") {
      addSongToQueue([
        {
          thumbnail,
          id,
          name,
          artists
        }
      ]);
    } else if (key === "4") {
      download({ songName, id });
    } else if (key === "2") {
      addSongToStoreTemporarily &&
        addSongToStoreTemporarily({
          name,
          artists,
          id,
          thumbnail: thumbnail || "/images/default.jpg"
        });
    } else if (key === "3") {
      const shareUrl = `${window.location.origin}/bai-hat/${songName}/${id}`;
      setDataShare({
        isOpen: true,
        url: shareUrl
      });
    }
  };
  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="1">
        <i className="ion-play" style={style} />
        Thêm vào danh sách phát
      </Menu.Item>
      <Menu.Item key="2">
        <i className="ion-ios-plus-empty" style={style} />
        Thêm vào
      </Menu.Item>
      <Menu.Item key="3">
        <i className="ion-android-share-alt" style={style} />
        Chia sẻ
      </Menu.Item>
      <Menu.Item key="4">
        {downloadProgress[id] !== undefined && downloadProgress[id] !== -1 ? (
          <span
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 12,
              marginRigh: 12
            }}
          >
            {downloadProgress[id]} MB
          </span>
        ) : (
          <i className="ion-android-download" style={style} />
        )}
        Tải xuống
      </Menu.Item>
    </Menu>
  );

  return (
    <li className={className} onClick={onClick}>
      <div className="card">
        {index !== undefined && <div className="order">{index}</div>}
        <div className="thumb">
          <img src={thumbnail || "/images/default.jpg"} alt="" />
          <span className="opac" />
          <i className="ion-play icon" />
        </div>
        <div className="card-info">
          <div className="title">{name}</div>
          <div className="artist">
            <LinksByComma data={artists} titleEntry="name" pathEntry="link" />
          </div>
        </div>
        {index !== undefined && !noShowListen && (
          <div className="total-listen">{formatNumber(listen || 0)}</div>
        )}
        <div className="extension">
          <div className="hover-view">
            <span onClick={stopPropagation}>
              <Link to={`/bai-hat/${songName}/${id}`}>
                <i className="ion-ios-information-outline" />
              </Link>
            </span>
            <Dropdown overlay={menu} trigger={["click"]}>
              <span onClick={stopPropagation}>
                <i className="ion-ios-more" />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
    </li>
  );
};

export const Song = connect(
  null,
  {
    addSongToStoreTemporarily: userPlaylistActions.addSongToStoreTemporarily,
    toggleModal: uiActions.toggleModal,
    setDataShare: shareActions.setData,
    addSongToQueue: queueActions.addSongToQueue
  }
)(SongWrapper);

export default NewSongs;
