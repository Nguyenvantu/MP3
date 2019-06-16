import React, { PureComponent } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Input, Checkbox, Form, Button, Icon } from "antd";
// import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";

const { login, clearError } = authAction;

class SignIn extends PureComponent {
  handleLogin = e => {
    e.preventDefault();
    const { login, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        login({ ...values, username: values.username.toLowerCase().trim() });
      }
    });
  };

  render() {
    const from = { pathname: "/" };
    const { Auth, form } = this.props;
    const { getFieldDecorator } = form;

    if (Auth.idToken) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage" signing={Auth.signing}>
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/overview">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              <Form onSubmit={this.handleLogin}>
                <div className="isoInputWrapper">
                  <Form.Item hasFeedback>
                    {getFieldDecorator("username", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your username!"
                        }
                      ]
                    })(
                      <Input
                        size="large"
                        placeholder="Username"
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                      />
                    )}
                  </Form.Item>
                </div>

                <div className="isoInputWrapper">
                  <Form.Item hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password!"
                        }
                      ]
                    })(
                      <Input
                        size="large"
                        type="password"
                        placeholder="Password"
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                      />
                    )}
                  </Form.Item>
                </div>

                <div className="isoInputWrapper isoLeftRightComponent">
                  <Checkbox defaultChecked>
                    <IntlMessages id="page.signInRememberMe" />
                  </Checkbox>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={Auth.signing}
                    icon="login"
                  >
                    <IntlMessages id="page.signInButton" />
                  </Button>
                </div>
              </Form>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" /> ?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    Auth: state.Auth
  }),
  { login, clearError }
)(Form.create()(SignIn));
