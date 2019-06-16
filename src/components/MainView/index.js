import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Pagination } from "antd";
import "./index.sass";
import { changeAlias } from "../../utils/func";
import { Link } from "react-router-dom";
import queryString from "query-string";

const MainView = props => {
  const { type, isLoading } = props;
  if (isLoading) return <div className="loader" />;

  return (
    <div>
      {type === "album" ? <AlbumView {...props} /> : <ArtistView {...props} />}
    </div>
  );
};

MainView.propTypes = {
  defaultAlbums: PropTypes.array,
  albums: PropTypes.array,
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const AlbumView = props => {
  const {
    match: { params },
    defaultAlbums,
    albums,
    Card,
    location,
    history,
    total,
    t
  } = props;
  const onPageChange = page => {
    history.push({ search: `?page=${page}` });
  };
  const { page } = queryString.parse(location.search);

  return (
    <div className="view">
      {!params.id ? (
        <Default origins={defaultAlbums} Card={Card} t={t} />
      ) : (
        <Row gutter={24} type="flex">
          {albums.length > 0 ? (
            albums.map(item => (
              <Col md={6} sm={8} xs={12} key={item.id}>
                <Card key={item.id || item.name} {...item} />
              </Col>
            ))
          ) : (
            <h3 className="w-100 text-center">Danh sách trống...</h3>
          )}
        </Row>
      )}
      {params.id && params.genre && albums.length ? (
        <div className="text-center">
          <Pagination
            onChange={onPageChange}
            defaultPageSize={20}
            current={page ? +page : 1}
            total={total}
          />
        </div>
      ) : null}
    </div>
  );
};

const ArtistView = props => {
  const {
    match: { params },
    chunkSize,
    defaultArtists,
    artists,
    Card,
    location,
    history,
    t,
    total
  } = props;
  const onPageChange = (page, pageSize) => {
    history.push({ search: `?page=${page}` });
  };
  const { page } = queryString.parse(location.search);
  return (
    <div className="view">
      {!params.id ? (
        <Default
          origins={defaultArtists}
          Card={Card}
          chunkSize={chunkSize}
          t={t}
        />
      ) : (
        <Row gutter={40} type="flex">
          {artists.length > 0 ? (
            artists.map(item => (
              <Col md={6} sm={8} xs={12} key={item.id}>
                <Card key={item.id || item.name} {...item} />
              </Col>
            ))
          ) : (
            <h3 className="w-100 text-center">Danh sách trống...</h3>
          )}
        </Row>
      )}

      {params.id && params.genre && artists.length ? (
        <div className="text-center">
          <Pagination
            onChange={onPageChange}
            defaultPageSize={20}
            current={page ? +page : 1}
            total={total}
          />
        </div>
      ) : null}
    </div>
  );
};

const Default = ({ origins, Card, t }) => (
  <div>
    {origins.map(origin => (
      <DefaultCards key={origin.id} {...origin} Card={Card} t={t} />
    ))}
  </div>
);

const DefaultCards = ({ title, id, albums, artists, Card, t }) => {
  let href = "#";
  switch (id) {
    case "IWZ9Z08I":
      href = albums
        ? `/albums/Viet-Nam/${id}`
        : `/the-loai-nghe-si/Viet-Nam/${id}`;
      break;
    case "IWZ9Z08O":
      href = albums ? `/albums/Au-My/${id}` : `/the-loai-nghe-si/Au-My/${id}`;
      break;
    case "IWZ9Z08W":
      href = albums
        ? `/albums/Han-Quoc/${id}`
        : `/the-loai-nghe-si/Han-Quoc/${id}`;
      break;
    case "IWZ9Z086":
      href = albums
        ? `/albums/Khong-Loi/${id}`
        : `/the-loai-nghe-si/Khong-Loi/${id}`;
      break;
    default:
      break;
  }
  return (
    <div className="view-cards">
      <div className="view-cards-title">
        <Link to={href}>
          {t(changeAlias(title))} <i className="ion-chevron-right" />
        </Link>
      </div>
      <div className="view-cards-row">
        <Row gutter={albums ? 26 : 40} type="flex">
          {(albums || artists).map(item => (
            <Col md={6} sm={8} xs={12} key={item.id}>
              <Card key={item.id || item.name} {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MainView;
