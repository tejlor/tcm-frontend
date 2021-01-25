import * as SessionActions from "actions/session";
import * as AccountApi from "api/AccountApi";
import * as SettingApi from "api/SettingApi";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "utils/Constants";
import Path from "utils/Path";

class Authorize extends React.Component { 
  
  static defaultProps = {}

  constructor(props){
    super(props);
    this.validateUser(); 
  }

  validateUser(){
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      this.redirectToLoginPage();
    }
    else if(!this.props.currentUser) {
      this.loadCurrentUser();
    }
  }

  loadCurrentUser() {
    AccountApi.getCurrentUser(this.props.doCurrentUserLoaded, this.handleError);
    this.loadSettings();
  }

  loadSettings() {
    SettingApi.getSafe(this.props.doSettingsLoaded, this.handleError);
  }

  handleError(error) {
    if (error.status === 400 && error.response.data.error === "invalid_grant") {
      this.redirectToLoginPage();
    }
  }

  redirectToLoginPage() {
    this.props.history.push(Path.myAccount + Path.login);
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

const mapDispatchToProps = ({
  doCurrentUserLoaded: SessionActions.currentUserLoaded,
  doSettingsLoaded: SessionActions.settingsLoaded
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authorize));