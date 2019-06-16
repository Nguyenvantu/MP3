import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SignUpPage from "../../components/Pages/Auth/signup";
import uiActions from "../../redux/ui/actions";
import authActions from "../../redux/auth/actions";
import { isEmpty } from "../../utils/func";
import { translate } from "react-i18next";
import { Helmet } from "react-helmet";

const { resetSlideInRight, slideInRight } = uiActions;
const { clearErrors, signup } = authActions;

class SignUpPageContainer extends React.Component {
  componentDidMount() {
    if (this.props.slideInRight) {
      this.props.resetSlideInRight();
    }

    // clear errors in the auth state from the previous authentication attempt
    if (!isEmpty(this.props.auth.errors)) {
      this.props.clearErrors();
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>MP3 | Đăng ký tài khoản</title>
        </Helmet>
        <SignUpPage {...this.props} />
      </>
    );
  }
}

function mapStateToProps({ auth, UIState }) {
  return { auth, slideInRight: UIState.slideInRight };
}

export default withRouter(
  translate("nav")(
    connect(
      mapStateToProps,
      {
        resetSlideInRight,
        slideInRight,
        clearErrors,
        signup
      }
    )(SignUpPageContainer)
  )
);
