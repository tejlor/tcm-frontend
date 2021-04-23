import "./RepositoryDetailsPage";

import * as React from "react";
import * as RepositoryDetailsActions from "actions/repo";

import ElementAccessRights from "./ElementAccessRights";
import ElementFeatures from "./ElementFeatures";
import ElementPreview from "./ElementPreview";
import ElementProperties from "./ElementProperties";
import FileProperties from "./FileProperties";
import RepositoryPath from "components/repo/browse/RepositoryPath";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class RepositoryDetailsPage extends React.Component {
  
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.doSetElement(this.props.match.params.elementRef);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.elementRef !== this.props.match.params.elementRef) {
      this.props.doSetElement(this.props.match.params.elementRef);
    }
  }

  render() {
    return (
      <div className="w3-row">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white w3-container card">
            <h2><i className="fas fa-desktop" />Element details</h2>      
            <RepositoryPath />
          </div>
          <div className="w3-row">
            <div className="w3-col m6 left">
              <ElementProperties />
              <FileProperties />
              <ElementAccessRights />
              <ElementFeatures />
            </div>
            <div className="w3-col m6 right">
              <ElementPreview />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  elementRef: state.repo.element?.ref,
  element: state.repo.element
});

const mapDispatchToProps = (dispatch) => ({
  doSetElement: (elementRef) => dispatch(RepositoryDetailsActions.setElement(elementRef))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RepositoryDetailsPage));