import "./PageWithTable.scss";

import * as React from "react";
import * as TableActions from "actions/table";

import DialogMode from "enums/DialogMode";
import FileSaver from "file-saver";
import { connect } from "react-redux";

class PageWithTable extends React.Component {
  static defaultProps = {
    title: "",
    onExportToXlsx: (blob) => { }
  };
  
  timeoutId = null;

  constructor(props) {
    super(props);

    this.state = {
      filterText: ""
    }; 

    this.onFilterChange = this.onFilterChange.bind(this);
    this.search = this.search.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onExportToXlsxClick = this.onExportToXlsxClick.bind(this);
  }

  onFilterChange(event) {
    this.setState({
      ...this.state,
      filterText: event.target.value
    });
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.search, 500);
  }

  search() {
    let _tableParams = {
      ...this.props.tableParams,
      filter: this.state.filterText
    };

    this.props.doReloadTableRows(_tableParams);
  }

  onAddClick() {
    this.props.doOpenDialog({}, DialogMode.ADD);
  }

  onExportToXlsxClick() {
    this.props.onExportToXlsx((blob) => {
      FileSaver.saveAs(blob, `${this.props.title}.xlsx`);
    });
  }

  render() {
    return (
      <section className="w3-card w3-round w3-white w3-container page-with-table">
        <header>
          <h2><i className="fas fa-user-friends" />{this.props.title}</h2>    
          <div className="buttons">
            <div className="filter">
              <i className="fas fa-search" />
              <input type="text" className="filter" onChange={this.onFilterChange} value={this.state.filterText}/>
            </div>
            <button className="w3-button" title="Add" onClick={this.onAddClick}><i className="fas fa-plus" /></button>
            <button className="w3-button" title="Export to xlsx" onClick={this.onExportToXlsxClick}><i className="fas fa-download"/></button>
          </div> 
        </header>
        {this.props.children}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  tableParams: state.table.tableParams,
});

const mapDispatchToProps = (dispatch) => ({
  doReloadTableRows: (tableParams) => dispatch(TableActions.reloadRows(tableParams)),
  doOpenDialog: (row, mode) => dispatch(TableActions.openDialog(row, mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageWithTable);
