import styled from "styled-components";
import { palette } from "styled-theme";

const NewWrapper = styled.div`
  margin: 0 14px;
  padding-bottom: 12px;
  margin-bottom: 16px;
  margin-top: 7px;
  &:not(:last-child) {
    border-bottom: 1px solid #e4e4e4;
  }
  .box-title {
    padding: 0 8px;
    font-size: 21px;
    font-weight: 700;
    color: #32323d;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: capitalize;
    a {
      color: #32323d;
      &:hover {
        color: #18b4c9;
      }
    }
  }
  .ant-btn {
    padding: 0 9px;
  }
  .carousel-wrapper {
    display: flex;
    align-items: center;
    .ant-carousel {
      width: 100%;
      overflow: hidden;
    }
    .ant-btn {
      font-size: 30px;
      line-height: 100%;
    }
  }
  @media screen and (max-width: 768px) {
    margin: 14px 0 0 0;
    .box-title {
      /* padding: 0; */
    }
  }
`;

const SongList = styled.ul`
  max-height: unset;
  padding-right: unset;
  li {
    margin-bottom: 5px;
    line-height: 0;
    padding: 5px 10px;
    cursor: pointer;
    .card {
      display: flex;
      position: relative;
    }
    &.first-chart {
      padding: 0;
      .thumb {
        display: none;
      }
      .order {
        font-family: "Open Sans", sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(to right, #02b3e4 0%, #02ccba 100%);
        color: #fff;
        font-size: 25px !important;
        width: 70px !important;
        height: 70px;
        margin-right: 10px;
      }
      .card {
        padding-right: 10px;
        align-items: center;
        border-bottom: 1px solid #02ccba;
      }
    }
    .total-listen {
      color: #a0a0a0;
      font-size: 12px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      margin-right: 10px;
      margin-left: auto;
      justify-content: flex-end;
    }
    .order {
      width: 30px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      font-weight: bold;
      font-size: 15px;
    }
    .opac {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(9, 7, 13, 0.5);
      border-radius: 2px;
      visibility: hidden;
    }
    .thumb {
      position: relative;
      display: inline-block;
      overflow: hidden;
      border-radius: 2px;
      margin-right: 10px;
      height: 40px;
      width: 40px;
      flex-shrink: 0;
      img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        min-height: 40px;
        min-width: 40px;
        border-radius: 2px;
        transition: all 0.7s;
      }
    }
    .card-info {
      white-space: nowrap;
      word-break: break-word;
      overflow: hidden;
      position: relative;
      .title {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.36;
        color: #32323d;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.36;
          letter-spacing: normal;
          text-align: left;
          color: inherit;
          white-space: nowrap;
        }
      }
      .artist {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.33;
        color: #a0a0a0;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        a {
          font-size: 12px;
          font-weight: 400;
          line-height: 1.33;
          text-align: left;
          color: inherit;
        }
      }
    }
    .icon {
      margin-top: -7px;
      margin-left: -4px;
      z-index: 1;
      font-size: 17px;
      color: #fcfcfc;
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
    }
    .extension {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      display: none;
      background-color: #efefef;
      .hover-view {
        font-size: 22px;
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: #32323d;
        span {
          padding: 6px;
          &:hover {
            color: ${palette("primary", 0)};
          }
        }
      }
    }
    &:hover {
      background-color: #efefef;
      .opac {
        visibility: visible !important;
      }
      .icon {
        opacity: 1;
      }
      .extension {
        display: block;
      }
    }
  }
`;

export default NewWrapper;
export { SongList };
