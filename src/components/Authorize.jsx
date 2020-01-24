import * as SessionActions from "actions/session";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "utils/Axios";
import Path from "utils/Path";
import { ACCESS_TOKEN_KEY } from "utils/Utils";


class Authorize extends React.Component {
  static defaultProps = {
  }

  componentWillMount() {
    this.validateUser();  
  }

  validateUser(user = this.props.currentUser){
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      this.redirectToLoginPage();
    }
    else if(!user) {
      this.loadCurrentUser();
    }
  }

  loadCurrentUser() {
    axios
      .get(`Accounts/Current`)
      .then((res) => {
        this.props.doCurrentUserLoaded(res.data);
      })
      .catch(err => {
        this.handleError(err);
      });
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
      return null;

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