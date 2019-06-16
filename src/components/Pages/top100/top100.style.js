import styled from "styled-components";
import { palette } from "styled-theme";

const NewWrapper = styled.div`
  border-radius: 2px;
  margin-bottom: 16px;
  cursor: pointer;
  .card-img {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
  }
  .img {
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
      transition: all 0.7s;
    }
  }
  .opac {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    visibility: hidden;
    left: 0;
    background-color: rgba(9, 7, 13, 0.5);
    border-radius: 2px;
  }
  .card-info {
    margin-top: 10px;
  }
  .card-title {
    &,
    a {
      font-size: 16px;
      font-weight: bold;
      color: #32323d;
      overflow: hidden;
      margin: 0 0 5px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-transform: capitalize;
    }
  }
  .comma a {
    color: #a0a0a0;
  }
  &.artist {
    .card-img {
      border-radius: 50%;
    }
    .card-title {
      text-align: center;
    }
  }
  &:hover {
    .opac {
      visibility: visible;
    }
    .img {
      img {
        transform: scale(1.06) translateZ(0);
      }
    }
  }
`;

const PageTop = styled.div`
  width: 100%;
  background-color: #000;
  overflow: hidden;
  padding: 0;
  position: relative;
  .blur-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(15px);
    /* transform: scale(1.2); */
    background: center center/cover no-repeat;
    height: 220px;
  }
  .sub-container {
    display: flex;
    padding: 16px 45px;
    width: 100%;
    position: relative;
    background-color: rgba(0, 0, 0, 0.65);
    @media screen and (max-width: 768px)  {
      padding: 16px 10px;
    }
  }
  
  .img-load {
    max-width: 150px;
    max-height: 150px;
    flex-shrink: 0;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    @media screen and (max-width: 768px)  {
      max-width: 120px;
      max-height: 120px;
    }
  }
  .box-data {
    margin-left: 20px;
    h3 {
      font-size: 24px;
      font-weight: bold;
      color: #fcfcfc;
      margin: 0;
    }
    .subtext {
      font-size: 14px;
      color: #a0a0a0;
      margin-bottom: 3px;
    }
    .desc {
      color: #fcfcfc;
    }
  }
`;

const InteractionBox = styled.div`
  max-width: 936px;
  margin-left: auto;
  margin-right: auto;
  padding: 14px 0;
  border-bottom: 1px solid #efefef;
  .wrap-interaction {
    display: flex;
    flex-wrap: wrap;
    .ant-btn-link {
      color: #32323d;
      &:hover {
        color: ${palette("primary", 0)};
      }
      i {
        font-size: 18px;
        margin-right: 10px;
      }
    }
  }
`;

const BoxData = styled.div`
  max-width: 936px;
  margin-left: auto;
  margin-right: auto;
  .heading {
    padding: 20px 10px 20px 0;
    font-size: 18px;
    color: #2a2b3f;
    font-weight: bold;
  }
  .list-top {
    max-height: 370px;
    overflow-y: auto;
  }
`;

const CommentWrapper = styled.div`
  .comment-wrapper {
    padding: 40px 0 30px;
  }
  .comment {
    &-total {
      font-weight: bold;
      color: #2a2b3f;
      float: left;
    }
    &-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 18px;
    }
  }
  .ant-comment-content-author {
    &-name {
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
    }
    &-time {
      color: #898989;
    }
  }
  .ant-comment-avatar img {
    width: 100%;
    height: 100%;
  }
  .ant-comment-inner {
    padding: 10px 0;
  }
`;
export default NewWrapper;
export { PageTop, InteractionBox, BoxData, CommentWrapper };
