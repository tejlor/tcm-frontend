import { statement } from "@babel/template";
import * as RepositoryBrowseActions from "actions/repository/browse";
import * as TableActions from 'actions/repository/browse';
import * as ElementApi from "api/ElementApi";
import * as FileApi from "api/FileApi";
import * as FolderApi from "api/FolderApi";
import { Dialog, Row } from "components/common/Dialog";
import DialogMode from "enums/DialogMode";
import FileSaver from "file-saver";
import * as React from "react";
import { connect } from "react-redux";
import toastr from "react-redux-toastr";

class PasteOrCancel extends React.Component {
  
  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      
    };

    this.onPaste = this.onPaste.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onPaste() {
    let data = new FormData();
    data.append('newParentRef', this.props.currentFolderRef);
    data.append('refs', this.props.selectedRefs);
    switch (this.props.selectedAction) {
      case 'cut':
        ElementApi.move(data, () => {
          this.props.doActionSelected();
          this.props.doLoadTableRows();
        });
        break;
      case 'copy':
        ElementApi.copy(data, () => {
            this.props.doActionSelected();
            this.props.doLoadTableRows();
        })
        break;
      default:
    }
  }

  onCancel() {
    this.props.doActionSelected();
  }

  render() {
    return (
      <>
        <button className="w3-bar-item w3-button w3-border-right" onClick={this.onPaste}>
          <i className="fas fa-clipboard"></i> Paste
        </button>
        <button className="w3-bar-item w3-button w3-border-right" onClick={this.onCancel}>
          <i className="fas fa-times-circle"></i> Cancel
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentFolderRef: state.repository.browse.folderRef,
  selectedRefs: state.repository.browse.selectedRefs,
  selectedAction: state.repository.browse.selectedAction,
});

const mapDispatchToProps = (dispatch) => ({
  doLoadTableRows: () => dispatch(TableActions.loadTableRows()),
  doActionSelected: (selectedRefs, action) => dispatch(TableActions.actionSelected(selectedRefs, action))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasteOrCancel);
