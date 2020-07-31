import Filter from "./Filter";
import NewFolder from "./NewFolder";
import Options from "./Options";
import OrderBy from "./OrderBy";
import PasteOrCancel from "./PasteOrCancel";
import Upload from "./Upload";
import If from "components/common/utils/If"
import * as React from "react";
import { connect } from "react-redux";


class ContentBar extends React.Component {
  
  static defaultProps = {

  };

  constructor(props) {
    super(props);
    
    this.state = {

    };
  }
  
  render() {
    return (
      <div className="browseMenuBar-outer">
        <div className="w3-bar w3-light-grey browseMenuBar">
          <NewFolder parentRef={this.props.parentRef} />
          {!this.props.selectedAction ?
            <>
              <Upload parentRef={this.props.parentRef} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentBar);
