import * as React from "react";

import Path from "utils/Path";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class MainPage extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.redirect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.redirect(this.props.currentUser);
    }
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
    this.props.history.push(Path.repo + Path.browse(this.props.rootRef));
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  rootRef: state.session.settings.root_ref
});

const mapDispatchToProps = ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));