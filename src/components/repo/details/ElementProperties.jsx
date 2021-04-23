import * as React from "react";

import Card from "components/commons/Card";
import { connect } from "react-redux";
import { formatTime } from "utils/Utils";
import { withRouter } from "react-router-dom";

class ElementProperties extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.element)
      return null;

    let element = this.props.element;

    return (
      <Card title="Properties" defaultOpen>
        <div className="w3-row">
          <div className="w3-col m6">
            <table className="w3-table">
              <tbody>
                <tr>
                  <td className="label">Name:</td>
                  <td className="value">{element.name}</td>
                </tr>
                <tr>
                  <td className="label">Created time:</td>
                  <td className="value">{formatTime(element.createdTime)}</td>
                </tr>
                <tr>
                  <td className="label">Created by:</td>
                  <td className="value">{element.createdByName}</td>
                </tr>              
              </tbody>
            </table>
          </div>
          <div className="w3-col m6">
            <table className="w3-table">
              <tbody>
              <tr>
                  <td className="label">Type:</td>
                  <td className="value">{element.typeName}</td>
                </tr>
                <tr>
                  <td className="label">Modified time:</td>
                  <td className="value">{formatTime(element.modifiedTime)}</td>
                </tr>
                <tr>
                  <td className="label">Modified by:</td>
                  <td className="value">{element.modifiedByName}</td>
                </tr>         
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  element: state.repo.element
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ElementProperties));