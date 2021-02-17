import "./MenuBar.scss";

import * as React from "react";

import Filter from "./Filter";
import NewFolder from "./NewFolder";
import Options from "./Options";
import OrderBy from "./OrderBy";
import PasteOrCancel from "./PasteOrCancel";
import Upload from "./Upload";
import { connect } from "react-redux";

class MenuBar extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    console.log(this.props.selectedAction);
    return (
      <div className="menu-bar-outer">
        <div className="w3-bar w3-light-grey menu-bar">
          <NewFolder parentRef={this.props.folderRef} />
          {!this.props.selectedAction
            ?
            <>
              <Upload parentRef={this.props.folderRef} />
              <Options />
            </>
            : 
            <PasteOrCancel />
          }
          <OrderBy />
          <Filter />
        </div> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  folderRef: state.repo.folder?.ref,
  selectedAction: state.table.selectedAction
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);