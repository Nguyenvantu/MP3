import React, { Component } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import apiUrl from "../../../settings";
import client from "../../../helpers/client";

class ModalPass extends Component {
  state = {
    loading: false
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const { error_code } = await client().post(
          `${apiUrl}/user/resetPassword`,
          values
        );
        if (error_code === 0) {
          message.success(
            "Mật khẩu mới đã được gửi về email của bạn, vui lòng kiểm tra!"
          );
        }
        this.setState({ loading: false });
        this.props.toggleModal();
      }
    });
  };

  render() {
    const {
      visible,
      toggleModal,
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Modal
        visible={visible}
        title="Nhập đủ thông tin để lấy lại mật khẩu"
        footer={
          <Button loading={this.state.loading} type="primary" onClick={this.handleOnSubmit}>
            Lấy lại mật khẩu
          </Button>
        }
        onCancel={toggleModal}
      >
        <Form>
          <Form.Item className="mb-0">
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Hãy nhập tên đăng nhập!"
                },
                {
                  min: 3,
                  max: 32,
                  message: "Tên đăng nhập phải chứa từ 3 đến 32 ký tự!"
                }
              ]
            })(<Input size="large" placeholder="Hãy nhập tên đăng nhập!" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(ModalPass);
