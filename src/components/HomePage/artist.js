import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Spin, Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import LazyloadImage from "../LazyloadImage";
import Wrapper from "./newSong.style";
import CardWrapper from "../Pages/top100/top100.style";
import apiUrl from "../../settings";
import client from "../../helpers/client";
import { changeAlias } from "../../utils/func";

const NewSongs = ({ t }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const getData = async () => {
    setLoading(true);
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/artist/news`
    );
    if (error_code === 0) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const next = () => {
    ref.current.slick.slickNext();
  };

  const prev = () => {
    ref.current.slick.slickPrev();
  };

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <div className="box-title">
          <Link to="/the-loai-nghe-si">{t("newArtists")}</Link>
        </div>
        <div className="carousel-wrapper">
          <Button type="link" onClick={prev}>
            <i className="ion-ios-arrow-back" />
          </Button>
          <Carousel ref={ref} dot={false} slidesToShow>
            <div>
              <Row gutter={40}>
                {data.slice(0, 4).map(item => {
                  return (
                    <Col md={6} sm={8} xs={12} key={item.id}>
                      <Card {...item} />
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div>
              <Row gutter={40}>
                {data.slice(4).map(item => {
                  return (
                    <Col md={6} sm={8} xs={12} key={item.id}>
                      <Card {...item} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Carousel>
          <Button type="link" onClick={next}>
            <i className="ion-ios-arrow-forward" />
          </Button>
        </div>
      </Spin>
    </Wrapper>
  );
};

export const Card = ({ link, id, title, name, artistName, thumbnail }) => (
  <CardWrapper className="artist">
    <Link
      to={`/nghe-si/${link ? link.split("/")[2] : changeAlias(name || artistName)}/${id}`}
    >
      <div className="card-img">
        <LazyloadImage
          className="img"
          src={thumbnail || "/images/artist_default.png"}
        />
        <div className="opac" />
      </div>
      <div className="card-info">
        <div className="card-title" title={title}>
          {name || artistName}
        </div>
      </div>
    </Link>
  </CardWrapper>
);

export default NewSongs;
