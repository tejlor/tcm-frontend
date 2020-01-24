import * as React from "react";
import { connect } from "react-redux";

import * as SessionActions from "actions/session";
import Path from "utils/Path";
import { ACCESS_TOKEN_KEY, TOKEN_INFO_KEY } from "utils/Utils";


class LogoutPage extends React.Component {
  static defaultProps = {

  };

  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_INFO_KEY);

    this.props.doCurrentUserLoaded(null);

    this.redirectToLoginPage();
  }

  redirectToLoginPage() {
    this.props.history.push(Path.myAccount + Path.login);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = {
  doCurrentUserLoaded: SessionActions.currentUserLoaded
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);