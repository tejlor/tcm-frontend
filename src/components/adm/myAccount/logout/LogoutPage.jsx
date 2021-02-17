import * as React from "react";
import * as SessionActions from "actions/session";

import { ACCESS_TOKEN_KEY, TOKEN_INFO_KEY } from "utils/Constants";

import Path from "utils/Path";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LogoutPage extends React.Component {
  static defaultProps = {};

  constructor(props){
    super(props);
    
    this.state = {};
  }

  componentDidMount() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_INFO_KEY);
    this.props.doClearSession();
    this.redirectToLoginPage();
  }

  redirectToLoginPage() {
    this.props.history.push(Path.login);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  doClearSession: () => dispatch(SessionActions.clearSession)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutPage));