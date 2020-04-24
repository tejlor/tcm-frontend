import RepoTree from "./RepoTree";
import ContentTable from "components/repo/ContentTable";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch} from "react-router-dom";
import Path from "utils/Path";

import 'rc-tree/assets/index.css';



class MainPage extends React.Component {
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="w3-row">
        <div className="w3-col m3">
          <div className="w3-card w3-round w3-white w3-container">
            <h3>Tree</h3>
            <RepoTree />
          </div>
        </div>
        <div className="w3-col m9">
          <div className="w3-card w3-round w3-white w3-container w3-margin-left w3-margin-right w3-margin-bottom">
            <h3>Content</h3>
            <ContentTable parentRef={this.props.match.params.parentRef}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);