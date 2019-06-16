import React from "react";
import { Row, Col, Spin } from "antd";
// import { Link } from "react-router-dom";
import Wrapper from "../../HomePage/newSong.style";
import Card from "./page";

const Top100 = ({ genres }) => {
  return (
    <Wrapper>
      <Spin spinning={genres.loading}>
        {genres.data.map(genre => {
          return (
            <div key={genre.id} style={{ marginTop: 14 }}>
              <div className="box-title" style={{ padding: 0 }}>
                {genre.title}
              </div>
              <Row type="flex" gutter={26}>
                {genre.children.map(item => {
                  return (
                    <Col md={6} sm={8} xs={12} key={item.id}>
                      <Card {...item} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          );
        })}
      </Spin>
    </Wrapper>
  );
};

export default Top100;
