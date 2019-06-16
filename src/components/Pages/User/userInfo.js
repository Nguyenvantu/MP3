import React from "react";
import { message, Form, Avatar, Icon, Input, Button } from "antd";
import defaultAvatar from "../../../images/default-avatar.svg";
import apiUrl from "../../../settings";
import client from "../../../helpers/client";
import Uploads from "../../../components/Upload";
import "./index.sass";

const FormItem = Form.Item;
const None = <span className="text-red">None</span>;

class UserPage extends React.Component {
  state = {
    isEdit: false,
    isEditPass: false,
    confirmDirty: false,
    data: {
      avatar: []
    }
  };

  componentDidMount = async () => {
    const { user } = this.props;
    if (user._id) {
      const { data, error_code } = await client().get(
        `${apiUrl}/user/${user._id}`
      );
      this.avatar = data.avatar;
      if (error_code === 0) {
        this.setState({
          data: {
            ...data,
            avatar: data.avatar ? [{ url: data.avatar, uid: Date.now() }] : []
          }
        });
      }
    }
  };

  handleSubmit = async () => {
    const { user, form } = this.props;
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        if (user._id) {
          const { isEdit, isEditPass, data } = this.state;
          if (isEdit) {
            const newData = {
              ...values,
              avatar: data.avatar && data.avatar[0] ? data.avatar[0].url : ""
            };
            const { error_code } = await client().put(
              `${apiUrl}/user/${user._id}`,
              newData
            );
            if (error_code === 0) {
              this.props.replaceInfo(newData);
              this.avatar = newData.avatar;
              this.setState({
                isEdit: false,
                data: {
                  ...newData,
                  avatar: newData.avatar
                    ? [{ url: newData.avatar, uid: Date.now() }]
                    : []
                }
              });
            }
          }
          if (isEditPass) {
            const { error_code } = await client().post(
              `${apiUrl}/user/changePassword`,
              {
                password: values.password,
                current_password: values.current_password,
                username: data.username
              }
            );
            if (error_code === 0) {
              message.info("Đổi mật khẩu thành công!");
              this.setState({
                isEditPass: false
              });
            }
          }
        }
      }
    });
  };

  toggleEdit = () => {
    this.setState(({ isEdit, data }) => {
      if (isEdit) {
        return {
          isEdit: false,
          data: {
            ...data,
            avatar: this.avatar ? [{ url: this.avatar, uid: Date.now() }] : []
          }
        };
      }
      return { isEdit: !isEdit };
    });
  };

  closeEdit = () => {
    const { isEdit, isEditPass } = this.state;
    if (isEdit) this.toggleEdit();
    if (isEditPass) this.toggleEditPass();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    if (value !== this.props.form.getFieldValue("password")) {
      callback("Mật khẩu nhập lại không đúng!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    if (value && this.state.confirmDirty) {
      this.props.form.validateFields(["confirm_password"], { force: true });
    }
    callback();
  };

  toggleEditPass = () => {
    this.setState(({ isEditPass }) => ({
      isEditPass: !isEditPass
    }));
  };

  render() {
    const {
      form: { getFieldDecorator },
      user
    } = this.props;
    const { data, isEdit, isEditPass } = this.state;

    return (
      <div className="user-page-info">
        {isEdit ? (
          <>
            <div className="text-center">
              <Uploads
                compressOptions={{
                  maxWidth: 1280,
                  maxHeight: 720,
                  quality: 0.95
                }}
                user={user}
                onChange={avatar =>
                  this.setState({ data: { ...data, avatar } })
                }
                single
                fileList={data.avatar}
              />
            </div>
            <FormItem label="Họ và tên">
              {getFieldDecorator("fullName", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập tên!"
                  }
                ],
                initialValue: data.fullName
              })(<Input placeholder="Nhập tên..." />)}
            </FormItem>
            <FormItem label="Email">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "Email không hợp lệ!"
                  }
                ],
                initialValue: data.email
              })(<Input placeholder="Nhập địa chỉ email..." />)}
            </FormItem>
            <FormItem label="Số điện thoại">
              {getFieldDecorator("phone", {
                rules: [
                  {
                    pattern: /^[+]?(\d{1,2})?[\s.-]?\(?\d{2,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/,
                    message: "SDT không hợp lệ!"
                  }
                ],
                initialValue: data.phone
              })(<Input placeholder="Nhập số điện thoại..." />)}
            </FormItem>
          </>
        ) : (
          <>
            <div className="avatar-wrapper">
              <Avatar
                size={80}
                src={data.avatar[0] ? data.avatar[0].url : defaultAvatar}
              />
              {data.isVip && <span className="vip">VIP</span>}
            </div>
            <FormItem label="Họ và tên">
              {data.fullName || None}{" "}
              <Icon
                onClick={this.toggleEdit}
                style={{ cursor: "pointer", marginLeft: 10 }}
                type="edit"
              />
            </FormItem>
            <FormItem label="Email">{data.email || None}</FormItem>
            <FormItem label="Số điện thoại">{data.phone || None}</FormItem>
          </>
        )}
        {!isEditPass ? (
          <FormItem label="Mật khẩu">
            *******{" "}
            <Icon
              onClick={this.toggleEditPass}
              style={{ cursor: "pointer", marginLeft: 10 }}
              type="edit"
            />
          </FormItem>
        ) : (
          <>
            <FormItem label="Mật khẩu cũ">
              {getFieldDecorator("current_password", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu hiện tại!"
                  },
                  {
                    min: 3,
                    max: 32,
                    message: "Mật khẩu phải chứa từ 3 đến 32 ký tự!"
                  }
                ]
              })(<Input.Password placeholder="Nhập mật khẩu hiện tại" />)}
            </FormItem>
            <FormItem label="Mật khẩu mới">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu mới!"
                  },
                  {
                    min: 3,
                    max: 32,
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password placeholder="Nhập mật khẩu mới" />)}
            </FormItem>
            <FormItem label="Nhật lại mật khẩu">
              {getFieldDecorator("confirm_password", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập lại mật khẩu!"
                  },
                  {
                    min: 3,
                    max: 32,
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  placeholder="Nhập lại mật khẩu"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </FormItem>
          </>
        )}
        {(isEditPass || isEdit) && (
          <div className="text-center">
            <Button onClick={this.closeEdit}>Hủy</Button>{" "}
            <Button type="primary" onClick={this.handleSubmit}>
              Lưu
            </Button>
          </div>
        )}
      </div>
    );
  }
}
export default Form.create()(UserPage);
