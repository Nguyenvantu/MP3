import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Menu, Switch } from "antd";
import PropTypes from "prop-types";
import authActions from "../../redux/auth/actions";
import user_playlistActions from "../../redux/user_playlist/actions";
import { translate } from "react-i18next";
import options from "./option";
import userpic from "../../images/default-avatar.svg";
import Search from "./search";
import "./nav.sass";

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const { logout } = authActions;
const { clearUserPlaylist } = user_playlistActions;

class Nav extends React.Component {
  handleChangeLanguage = checked => {
    this.props.i18n.changeLanguage(checked ? "vi" : "en");
  };

  logOut = e => {
    e.preventDefault();
    this.props.dispatch(clearUserPlaylist());
    this.props.dispatch(logout());
    this.props.history.push("/");
  };

  getMenuItem = pathname => ({ key, title, children }) => {
    const { t } = this.props;
    return children ? (
      <SubMenu key={key} title={title} className="topbarMenu">
        {children.map(child => {
          return (
            <MenuItem key={child.key}>
              <Link
                to={child.key}
                onClick={e => {
                  pathname === child.key && e.preventDefault();
                }}
                className="topbarMenu"
              >
                {t(child.title)}
              </Link>
            </MenuItem>
          );
        })}
      </SubMenu>
    ) : (
      <MenuItem key={key}>
        <Link
          to={key}
          onClick={e => {
            pathname === key && e.preventDefault();
          }}
          className="topbarMenu"
        >
          {t(title)}
        </Link>
      </MenuItem>
    );
  };

  render() {
    const {
      t,
      lng,
      auth: { authenticated, user },
      location: { pathname }
    } = this.props;
    const [, path1, path2] = pathname.split("/");
    let pathTemp1 = `/${path1}`;
    return (
      <nav>
        <div className="nav-container">
          <div className="logo">
            <NavLink to="/">MP3</NavLink>
          </div>
          <Search t={t} />
          <Menu
            mode="horizontal"
            selectedKeys={[pathTemp1, `${pathTemp1}/${path2}`]}
          >
            {options.map(this.getMenuItem(pathname))}
            <SubMenu
              key={"user"}
              title={
                <div className="userWrapper">
                  <img alt="user" src={user.avatar || userpic} />
                  {authenticated && <span>{user.fullName}</span>}
                </div>
              }
              className="topbarMenu"
            >
              {authenticated
                ? [
                    <MenuItem key={"dang-nhap"}>
                      <Link
                        to={`/user/${user.username}`}
                        className="topbarMenu"
                      >
                        {t("playlist")}
                      </Link>
                    </MenuItem>,
                    <MenuItem key={"dang-xuat"}>
                      <a
                        href="/"
                        className="topbarMenu"
                        title={t("signOut")}
                        onClick={this.logOut}
                      >
                        {t("signOut")}
                      </a>
                    </MenuItem>
                  ]
                : [
                    <MenuItem key={"dang-nhap"}>
                      <Link to={"/dang-nhap"} className="topbarMenu">
                        {t("signIn")}
                      </Link>
                    </MenuItem>,
                    <MenuItem key={"dang-ky"}>
                      <Link to={"/dang-ky"} className="topbarMenu">
                        {t("register")}
                      </Link>
                    </MenuItem>
                  ]}
              <MenuItem key={"lang"}>
                <Switch
                  checkedChildren="Vi"
                  unCheckedChildren="En"
                  checked={lng === "vi" || !lng}
                  onChange={this.handleChangeLanguage}
                />
              </MenuItem>
            </SubMenu>
          </Menu>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired
  }),
  dispatch: PropTypes.func.isRequired
};

export default translate("nav")(withRouter(Nav));
