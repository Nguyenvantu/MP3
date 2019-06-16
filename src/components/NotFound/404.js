import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Image from "../../images/rob.png";
import FourZeroFourStyleWrapper from "./404.style";

export default class extends Component {
  render() {
    return (
      <FourZeroFourStyleWrapper className="iso404Page">
        <div className="iso404Content">
          <h1>
            404
          </h1>
          <h3>
            Không có thông tin
          </h3>
          <p>
            Trang bạn tìm kiếm không tồn tại hoặc đã bị xoá khỏi hệ thống.
          </p>
          <Link to="/">
            <button type="button">
              Trở về trang chủ
            </button>
          </Link>
        </div>
        {/* <div className="iso404Artwork">
          <img alt="#" src={Image} />
        </div> */}
      </FourZeroFourStyleWrapper>
    );
  }
}
