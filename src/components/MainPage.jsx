import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Path from "utils/Path";


class MainPage extends React.Component {
  static defaultProps = {

  };

  componentDidMount() {
    this.redirect();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.currentUser !== newProps.currentUser)
      this.redirect(newProps.currentUser);
  } 

  redirect(user = this.props.currentUser) {
    if (!user) {
      this.redirectToLoginPage();
      return;
    }
    if (user.roleTimeEntry === true)
      this.redirectToTimeEntryPage();
    else if (user.roleManager === true)
      this.redirectToAcceptancePage();
    else if (user.roleControlling === true)
      this.redirectToControllingPage();
    else {
      this.redirectToLoginPage();
    }
  }

  redirectToLoginPage() {
    this.props.history.push(Path.myAccount + Path.login);
  }

  redirectToTimeEntryPage() {
    this.props.history.push(Path.basic + Path.timeEntries);
  }

  redirectToAcceptancePage() {
    this.props.history.push(Path.acceptance + Path.byEmployee);
  }

  redirectToControllingPage() {
    this.props.history.push(Path.controlling + Path.timeEntries);
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

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));