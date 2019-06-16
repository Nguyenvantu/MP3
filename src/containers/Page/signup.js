import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Input, Checkbox, Button } from "antd";
import authAction from "../../redux/auth/actions";
import SignUpStyleWrapper from "./signup.style";

const { login } = authAction;

class SignUp extends Component {
  state = {
    redirectToReferrer: false
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login } = this.props;
    login();
    this.props.history.push("/overview");
  };
  render() {
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/">
                Đăng ký
              </Link>
            </div>
            <div className="isoSignUpForm">
              <div className="isoInputWrapper isoLeftRightComponent">
                <Input size="large" placeholder="First name" />
                <Input size="large" placeholder="Last name" />
              </div>
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Username" />
              </div>
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Email" />
              </div>
              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Password" />
              </div>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="isoInputWrapper" style={{ marginBottom: "50px" }}>
                <Checkbox>
                  <IntlMessages id="page.signUpTermsConditions" />
                </Checkbox>
              </div>
              <div className="isoInputWrapper">
                <Button type="primary">
                  Đăng ký
                </Button>
              </div>
              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  Đăng ký với Facebook
                </Button>
              </div>
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login }
)(SignUp);
