import React from "react";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { NotFound, NotFoundSong } from "./components";
import * as Containers from "./containers/App";

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/dang-ky",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <Router history={history}>
      <Containers.App>
        <Switch>
          <Route exact path="/" component={Containers.HomePage} />
          <Route path="/dang-nhap" component={Containers.LogInPage} />
          <Route path="/dang-ky" component={Containers.SignUpPage} />
          <Route path="/bai-hat/:name/:id" component={Containers.SongPage} />
          <Route exact path="/top100" component={Containers.Top100} />
          <Route path="/top100/:name/:id" component={Containers.Top100Detail} />
          <Route
            path="/album/:title/:id"
            component={Containers.AlbumPlaylist}
          />
          <Route
            path={["/albums/:genre/:id", "/albums"]}
            component={Containers.AlbumGenrePage}
          />
          <Route
            exact
            path={["/the-loai-nghe-si/:genre/:id", "/the-loai-nghe-si"]}
            component={Containers.ArtistGenrePage}
          />
          <Route path={["/nghe-si/:name/:id", "/nghe-si/:name"]} component={Containers.ArtistPage} />
          <Route path="/charts" component={Containers.ChartPage} />
          <RestrictedRoute
            path="/user/:id"
            component={Containers.UserPage}
            isLoggedIn={isLoggedIn}
          />
          <Route path="/notfound/bai-hat" component={NotFoundSong} />
          <Route component={NotFound} />
        </Switch>
      </Containers.App>
    </Router>
  );
};

export default connect(state => ({
  isLoggedIn: state.auth.authenticated
}))(PublicRoutes);
