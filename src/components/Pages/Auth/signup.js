import React from "react";
import { Form, Input } from "antd";
import "./index.sass";

class SignUpPage extends React.Component {
  state = {
    animate: false,
    confirmDirty: false
  };

  componentDidMount() {
    this.setState({
      animate: true,
      leave: false
    });
  }

  componentDidUpdate() {
    if (this.props.auth.authenticated && !this.state.leave) {
      this.setState({ leave: true });
      setTimeout(() => {
        this.props.slideInRight(); // UI action
        this.props.history.push("/");
        setTimeout(() => {
          this.props.resetSlideInRight();
        }, 1000);
      }, 700);
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.props.signup(values);
      }
    });
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

  renderAuthBox = () => {
    const className = `auth-box animated ${this.state.animate &&
      (this.state.leave ? "bounceOutLeft" : "bounceInRight")}`;
    // const errors = this.props.auth.errors;
    const {
      t,
      form: { getFieldDecorator }
    } = this.props;
    return (
      <div className={className}>
        <center style={{ marginBottom: "5px" }}>{t("titleSignUp")}</center>
        <div>
          <Form onSubmit={this.onSubmit}>
            {/* <Form.Item>
              {getFieldDecorator("fullName", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập tên!"
                  }
                ]
              })(<Input placeholder="Nhập họ tên" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "Email không hợp lệ!"
                  }
                ]
              })(<Input placeholder="Nhập email" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("phone", {
                rules: [
                  {
                    pattern: /^[+]?(\d{1,2})?[\s.-]?\(?\d{2,3}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/,
                    message: "SDT không hợp lệ!"
                  }
                ]
              })(<Input placeholder="Nhập số điện thoại" />)}
            </Form.Item> */}
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập tên đăng nhập!"
                  },
                  {
                    min: 3,
                    max: 32,
                    message: "Tên đăng nhập phải chừa từ 3 đến 32 ký tự!"
                  }
                ]
              })(
                <Input className="form-control" placeholder={t("username")} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu!"
                  },
                  {
                    validator: this.validateToNextPassword
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự!"
                  }
                ]
              })(
                <Input
                  type="password"
                  className="form-control"
                  placeholder={t("password")}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("passwordConfirmation", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập lại mật khẩu!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  className="form-control"
                  placeholder={t("confirm_password")}
                />
              )}
            </Form.Item>
            {/* <TextInputGroup
              placeholder={t("username")}
              name="username"
              error={t(errors.username)}
              onChange={this.onChange}
            />
            <TextInputGroup
              type="password"
              placeholder={t("password")}
              name="password"
              error={t(errors.password)}
              onChange={this.onChange}
            />
            <TextInputGroup
              type="password"
              placeholder={t("confirm_password")}
              name="passwordConfirmation"
              error={t(errors.passwordConfirmation)}
              onChange={this.onChange}
            /> */}
            <button
              id="sign_up"
              type="submit"
              disabled={this.props.auth.isProcessing}
            >
              {!this.props.auth.isProcessing ? t("register") : t("processing")}
            </button>
          </Form>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="auth">
        <div className="auth-box-wrapper">{this.renderAuthBox()}</div>
      </div>
    );
  }
}

export default Form.create()(SignUpPage);
