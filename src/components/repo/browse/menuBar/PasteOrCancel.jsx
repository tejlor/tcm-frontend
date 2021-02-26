import * as ElementApi from "api/repo/ElementApi";
import * as React from "react";
import * as TableActions from 'actions/table';

import { connect } from "react-redux";

class PasteOrCancel extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};

    this.onPaste = this.onPaste.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onPaste() {
    let data = new FormData();
    data.append('newParentRef', this.props.folderRef);
    data.append('refs', this.props.actionRows);
    switch (this.props.selectedAction) {
      case 'move':
        ElementApi.move(data, () => {
          this.props.doSelectAction();
          this.props.doReloadTableRows();
        });
        break;
      case 'copy':
        ElementApi.copy(data, () => {
            this.props.doSelectAction();
            this.props.doReloadTableRows();
        })
        break;
      default:
        break;
    }
  }

  onCancel() {
    this.props.doSelectAction();
  }

  render() {
    return (
      <>
        <button className="w3-bar-item w3-button w3-border-right" key="1" onClick={this.onPaste}>
          <i className="fas fa-clipboard"></i> Paste
        </button>
        <button className="w3-bar-item w3-button w3-border-right" key="2" onClick={this.onCancel}>
          <i className="fas fa-times-circle"></i> Cancel
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  folderRef: state.repo.folder?.ref,
  actionRows: state.table.actionRows,
  selectedAction: state.table.selectedAction,
});

const mapDispatchToProps = (dispatch) => ({
  doReloadTableRows: () => dispatch(TableActions.reloadRows()),
  doSelectAction: () => dispatch(TableActions.selectAction(undefined, TableActions.SELECTED_ALL))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasteOrCancel);