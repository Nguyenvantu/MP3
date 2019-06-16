import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import LazyloadImage from "../LazyloadImage";
import Wrapper from "./newSong.style";
import CardWrapper from "../Pages/top100/top100.style";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import { changeAlias } from "../../utils/func";
import LinksByComma from "../LinksByComma";

const NewSongs = ({ t }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/album/news`
    );
    if (error_code === 0) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <div className="box-title">
          <Link to="/albums">{t("newAlbums")}</Link>
        </div>
        <Row gutter={26} type="flex">
          {data.map(item => {
            return (
              <Col md={6} sm={8} xs={12} key={item.id}>
                <Card {...item} />
              </Col>
            );
          })}
        </Row>
      </Spin>
    </Wrapper>
  );
};

export const Card = props => (
  <CardWrapper>
    <Link to={`/album/${changeAlias(props.title)}/${props.id}`}>
      <div className="card-img">
        <LazyloadImage className="img" src={props.thumbnail} />
        <div className="opac" />
      </div>
      <div className="card-info">
        <div className="card-title" title={props.title}>
          {props.title}
        </div>
      </div>
    </Link>
    <LinksByComma data={props.artists} titleEntry="name" pathEntry="link" />
  </CardWrapper>
);

export default NewSongs;
