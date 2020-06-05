import Filter from "./Filter";
import NewFolder from "./NewFolder";
import Options from "./Options";
import OrderBy from "./OrderBy";
import Upload from "./Upload";
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
          <Upload parentRef={this.props.parentRef} />
          <Options />
          <OrderBy />
          <Filter />
        </div> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  folderRef: state.repository.browse.folderRef,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ContentBar);
