import Card from "components/commons/Card";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { formatSize } from "utils/Utils";

class FileProperties extends React.Component {
  
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.element)
      return null;

    let file = this.props.element;

    return (
      <Card title="File" defaultOpen>
        <div className="w3-row">
          <div className="w3-col m6">
            <table className="w3-table">
              <tbody>
                <tr>
                  <td className="label">Mime type:</td>
                  <td className="value">{file.mimeType}</td>
                </tr>              
              </tbody>
            </table>
          </div>
          <div className="w3-col m6">
            <table className="w3-table">
              <tbody>
              <tr>
                  <td className="label">Size:</td>
                  <td className="value">{formatSize(file.size)}</td>
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
  
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FileProperties));