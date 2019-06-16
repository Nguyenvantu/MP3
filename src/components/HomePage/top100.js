import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";
import Wrapper from "./newSong.style";
import Card from "../Pages/top100/page";
import apiUrl from "../../settings";
import client from "../../helpers/client";

const NewSongs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { data: res, error_code } = await client().get(
      `${apiUrl}/media/top100/news`
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
          <Link to="/top100">Top 100</Link>
        </div>
        <Row gutter={20} type="flex">
          {data.map(item => {
            return (
              <Col md={8} sm={12} xs={12} key={item.id}>
                <Card {...item} />
              </Col>
            );
          })}
        </Row>
      </Spin>
    </Wrapper>
  );
};

export default NewSongs;
