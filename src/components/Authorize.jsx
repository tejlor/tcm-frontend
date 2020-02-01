import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as SessionActions from "actions/session";
import Path from "utils/Path";
import { ACCESS_TOKEN_KEY } from "utils/Utils";
import * as AccountApi from "logic/AccountApi";


class Authorize extends React.Component {
  
  static defaultProps = {
  }

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
    AccountApi.loadCurrentUser(this.props.doCurrentUserLoaded, this.handleError);
  }

  handleError(err) {
    if (err.status === 400 && err.response.data.error === "invalid_grant") {
      this.redirectToLoginPage();
    }
  }

  redirectToLoginPage() {
    this.props.history.push(Path.myAccount + Path.login);
  }

  render() {
    if (!this.props.currentUser)
      return "Please wait...";

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  }
}

const mapDispatchToProps = {
  doCurrentUserLoaded: SessionActions.currentUserLoaded,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Authorize));