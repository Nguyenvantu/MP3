import React, { useState } from "react";
import { Popover } from "antd";
import styled from "styled-components";

const Quality = ({ quality, setQuality, source = {} }) => {
  const [visible, setVisible] = useState(false);

  const onSetQuality = quality => {
    setQuality(quality);
    setVisible(false);
  };

  return (
    <Popover
      content={
        <SelectBox>
          {source["lossless"] && (
            <p
              className={quality === "lossless" ? "active" : ""}
              onClick={() => onSetQuality("lossless")}
            >
              Lossless (VIP)
            </p>
          )}
          {source["320"] && (
            <p
              className={quality === "320" ? "active" : ""}
              onClick={() => onSetQuality("320")}
            >
              320 Kbps(VIP)
            </p>
          )}
          {source["128"] && (
            <p
              className={quality === "128" ? "active" : ""}
              onClick={() => onSetQuality("128")}
            >
              128 Kbps
            </p>
          )}
        </SelectBox>
      }
      visible={visible}
      onVisibleChange={setVisible}
      trigger="click"
      title="Chất lượng"
    >
      <QualityBox>
        <button className="sc-ir">
          <i className="ion-radio-waves" />
        </button>
        <span>{quality}</span>
      </QualityBox>
    </Popover>
  );
};

const QualityBox = styled.div`
  padding: 6px;
  span {
    color: #fff;
    font-size: 10px;
    cursor: pointer;
  }
  button.sc-ir {
    padding: 0;
    line-height: 0;
  }
  .player-other button i {
    line-height: 0;
  }
`;

const SelectBox = styled.div`
  p {
    cursor: pointer;
    &:hover {
      color: #18b4c9;
    }
    &.active {
      color: #18b4c9;
    }
  }
`;

export default Quality;
