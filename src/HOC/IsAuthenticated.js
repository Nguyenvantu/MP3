import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export default function(ComposedComponent) {
  class IsAuthenticated extends React.Component {
    redirectTo = route => {
      this.props.history.push(route);
    };

    render() {
      return <ComposedComponent redirectTo={this.redirectTo} {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    const { authenticated, user } = auth;

    return { authenticated, user };
  }

  IsAuthenticated.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  return withRouter(connect(mapStateToProps)(IsAuthenticated));
}
