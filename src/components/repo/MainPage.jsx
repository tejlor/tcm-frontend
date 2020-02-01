import * as React from "react";
import { connect } from "react-redux";


class MainPage extends React.Component {
  static defaultProps = {

  };

  render() {
    return (
      <div className="w3-row">
        <div className="w3-col m3">
          <div className="w3-card w3-round w3-white w3-container">
            <h3>Files</h3>
          </div>
        </div>
        <div className="w3-col m9">
          <div className="w3-card w3-round w3-white w3-container w3-margin-left w3-margin-right w3-margin-bottom">
            <h3>Files</h3>
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