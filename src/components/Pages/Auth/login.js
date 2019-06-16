import React from "react";
import { Form, Input } from "antd";
import Modal from "./forgotModal";
import "./index.sass";

class LogInPage extends React.Component {
  state = {
    animate: false
  };

  componentDidMount() {
    this.setState({
      animate: true,
      leave: false,
      openForgotModal: false
    });
  }

  componentDidUpdate() {
    if (this.props.auth.authenticated && !this.state.leave) {
      this.setState({ leave: true });
      setTimeout(() => {
        this.props.slideInRight();
        this.props.history.push("/");
        setTimeout(() => {
          this.props.resetSlideInRight();
        }, 1000);
      }, 700);
    }
  }

  goToSignUpPage = e => {
    e.preventDefault();
    this.setState({ leave: true });
    setTimeout(() => {
      this.props.history.push("/dang-ky");
    }, 700);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  toggleModal = () => {
    this.setState(({ openForgotModal }) => ({
      openForgotModal: !openForgotModal
    }));
  };

  renderAuthBox = () => {
    const { animate, leave, openForgotModal } = this.state;
    const {
      auth: { isProcessing },
      t,
      form: { getFieldDecorator }
    } = this.props;

    const className = `auth-box animated ${animate &&
      (leave ? "bounceOutLeft" : "bounceInRight")}`;

    return (
      <div className={className}>
        <Modal visible={openForgotModal} toggleModal={this.toggleModal} />
        <center style={{ marginBottom: "5px" }}>{t("titleSignIn")}</center>
        <div>
          <Form onSubmit={this.onSubmit}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Hãy nhập tên đăng nhập!"
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
            <button type="submit" id="sign_up" disabled={isProcessing}>
              {!isProcessing ? t("signIn") : t("processing")}
            </button>
          </Form>
        </div>
        <div className="login-footer">
          <div>
            {t("footerSignIn1")}
            <a href="/signup" onClick={this.goToSignUpPage}>
              {t("footerSignIn2")}
            </a>
          </div>
          <div>
            {t("forgotPassword")}
            <span onClick={this.toggleModal}>{t("forgotPassword2")}</span>
          </div>
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

export default Form.create()(LogInPage);
