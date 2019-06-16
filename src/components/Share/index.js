import React from "react";
import { Modal, Typography } from "antd";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import actions from "../../redux/share/actions";
import Share from "./share";

class ShareModal extends React.Component {
  handleCancel = () => {
    this.props.setData({
      isOpen: false
    });
  };

  render() {
    const { isOpen, url, t } = this.props;
    return (
      <Modal visible={isOpen} footer={null} onCancel={this.handleCancel}>
        <h2 className="text-center">Chia sẻ</h2>
        <Typography.Paragraph copyable>{url}</Typography.Paragraph>
        <Share shareUrl={url} t={t} />
      </Modal>
    );
  }
}

export default translate("homePage")(
  connect(
    ({ share }) => ({ ...share }),
    actions
  )(ShareModal)
);
