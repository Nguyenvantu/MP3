import styled from "styled-components";

const ModalWrapper = styled.div`
  .modal-warn {
  }
  .modal-playlists {
    margin-top: 12px;
  }
  .modal-playlist {
    padding: 14px 12px;
    font-size: 15px;
    font-weight: 700;
    color: #32323d;
    cursor: pointer;
    border-radius: 2px;
    &:nth-child(2n + 1) {
      background-color: #f7f7f7;
    }
    &:hover {
      background-color: #efefef;
    }
  }
`;
export default ModalWrapper;
