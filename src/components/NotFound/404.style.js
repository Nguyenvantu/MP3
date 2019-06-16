import styled from "styled-components";
import { palette } from "styled-theme";

const FourZeroFourStyleWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(100vh - 50px);

  @media only screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .iso404Content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 767px) {
      order: 2;
      margin-top: 20px;
      align-items: center;
      text-align: center;
      flex-direction: column;
    }

    h1 {
      font-size: 84px;
      font-weight: 700;
      color: ${palette("secondary", 2)};
      line-height: 1;
      margin: 0 0 25px;
    }

    h3 {
      font-size: 24px;
      font-weight: 400;
      color: ${palette("text", 1)};
      margin: 0 0 10px;
      line-height: 1.2;
    }

    p {
      color: ${palette("text", 3)};
      margin: 0 0 10px;
    }

    button {
      display: inline-block;
      margin-top: 15px;
      font-weight: 500;
      text-align: center;
      touch-action: manipulation;
      border: 0;
      white-space: nowrap;
      line-height: 1.5;
      padding: 0 30px;
      font-size: 13px;
      flex-shrink: 0;
      height: 36px;
      cursor: pointer;
      color: #ffffff;
      background-color: ${palette("primary", 0)};
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      border-radius: 18px;

      a {
        width: 100%;
        height: 100%;
        color: #ffffff;
        text-decoration: none;
      }

      &:hover {
        background-color: ${palette("primary", 2)};
        a {
          text-decoration: none;
        }
      }

      &:focus {
        outline: 0;
        box-shadow: none;
        a {
          text-decoration: none;
        }
      }
    }
  }

  .iso404Artwork {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${props =>
      props["data-rtl"] === "rtl" ? "inherit" : "100px"};
    margin-right: ${props =>
      props["data-rtl"] === "rtl" ? "100px" : "inherti"};
    height: 500px;

    @media only screen and (max-width: 767px) {
      height: 250px;
      margin-left: ${props => (props["data-rtl"] === "rtl" ? "inherit" : "0")};
      margin-right: ${props => (props["data-rtl"] === "rtl" ? "0" : "inherit")};
    }

    img {
      max-height: 100%;
    }
  }
`;

export default FourZeroFourStyleWrapper;
