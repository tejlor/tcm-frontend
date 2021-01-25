import Filter from "./Filter";
import "./MenuBar.scss";
import NewFolder from "./NewFolder";
import Options from "./Options";
import OrderBy from "./OrderBy";
import PasteOrCancel from "./PasteOrCancel";
import Upload from "./Upload";
import * as React from "react";
import { connect } from "react-redux";

class MenuBar extends React.Component {
  
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div className="menu-bar-outer">
        <div className="w3-bar w3-light-grey menu-bar">
          <NewFolder parentRef={this.props.folderRef} />
          {!this.props.selectedAction ?
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
  folderRef: state.repository.browse.folderRef,
  selectedAction: state.repository.browse.selectedAction
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
