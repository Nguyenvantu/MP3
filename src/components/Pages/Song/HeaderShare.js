import React from "react";
import onClickOutside from "react-onclickoutside";
import Share from "../../Share/share";
import { CSSTransition } from "react-transition-group";

class HeaderShare extends React.PureComponent {
  handleClickOutside = () => {
    if (this.props.showShare) this.props.toggleShare(false);
  };

  render() {
    const { t, name, shareUrl, showShare } = this.props;
    return (
      <div>
        <CSSTransition classNames="header-share" timeout={400} in={showShare}>
          <div className="header-share">
            <Share t={t} name={name} shareUrl={shareUrl} />
          </div>
        </CSSTransition>
      </div>
    );
  }
}
export default onClickOutside(HeaderShare);
