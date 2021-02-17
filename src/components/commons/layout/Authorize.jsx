import * as React from "react";
import * as SessionActions from "actions/session";

import { ACCESS_TOKEN_KEY } from "utils/Constants";
import Path from "utils/Path";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Authorize extends React.Component { 
  static defaultProps = {}

  constructor(props){
    super(props);
    
    this.state = {};
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.validateUser();
  }

  validateUser(){
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      this.redirectToLoginPage();
    }
    else if (!this.props.currentUser || !this.props.settings) {
      this.props.doLoadCurrentUserAndSettings(this.handleError);
    }
  }

  handleError(error) {
    if (error.status === 400 && error.response.data.error === "invalid_grant") {
      this.redirectToLoginPage();
    }
  }

  redirectToLoginPage() {
    this.props.history.push(Path.login);
  }

  render() {
    if (!this.props.currentUser || !this.props.settings)
      return "Please wait...";

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  settings: state.session.settings
});

const mapDispatchToProps = (dispatch) => ({
  doLoadCurrentUserAndSettings: (onError) => dispatch(SessionActions.loadCurrentUserAndSettings(onError))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authorize));