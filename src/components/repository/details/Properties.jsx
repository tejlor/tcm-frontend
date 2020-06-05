import * as RepositoryDetailsActions from "actions/repository/details";
import * as FileApi from "api/FileApi";
import Card from "components/common/Card";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { formatTime } from "utils/Utils";

class Properties extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  prepare() {
    if (!this.props.element) return;

    let element = this.props.element;

    if (element.typeName === "File") {
      if (element.size > this.MAX_SIZE) {
        this.setState({
          sizeExceeded: true
        });
      } else {
        this.downloadPreview(element.ref);
      }
    }
  }

  render() {
    if (!this.props.element) return null;

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
  element: state.repository.details.element
});

const mapDispatchToProps = (dispatch) => ({
  doSetElementRef: (elementRef) => dispatch(RepositoryDetailsActions.setElementRef(elementRef))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Properties)
);
