import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ROOT_REF } from "utils/Constants";
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

    // Redirect to different page depending on user role
    this.redirectToRepositoryPage();
  }

  redirectToRepositoryPage() {
    this.props.history.push(Path.repository + Path.browse(ROOT_REF));
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));