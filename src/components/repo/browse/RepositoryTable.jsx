import "./RepositoryTable.scss";
import * as TableActions from "actions/repository/browse";
import TableManual from "components/commons/table/TableManual";
import fileIconVectorCatalog from "file-icon-vectors/dist/icons/classic/catalog.json";
import * as React from "react";
import { Checkbox } from "react-icheck";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import Path from "utils/Path";
import { calcFileExtension, formatTime } from "utils/Utils";

class RepositoryTable extends React.Component {
  
  static defaultProps = {};

  columns = [
    {
      id: "check",
      width: 30,
      className: "flex",
      accessor: row => this.renderCheck(row)       
    },
    {
      id: "main",
      accessor: row => this.renderRow(row)
    },
  ];

  constructor(props) {
    super(props);
    
    this.state = {};

    this.loadTableRows = this.loadTableRows.bind(this);
    this.onReloadTableRows = this.onReloadTableRows.bind(this);
    this.getPaginationProps = this.getPaginationProps.bind(this);
    this.onCheckedChange = this.onCheckedChange.bind(this);
  }

  onReloadTableRows(state) {
    this.loadTableRows(state.page);
  }

  loadTableRows(page) {  
    let parentRef = this.props.parentRef;
    if (!parentRef)
      return;
   
    this.props.doLoadTableRows({
      ...this.props.tableParams,
      pageNo: page
    });
  }

  onCheckedChange(event, checked) {
    this.props.doTableRowSelected(event.target.dataset.ref, checked);
  }

  renderCheck(row) {
    return <Checkbox checkboxClass="icheckbox_flat-blue" label="&nbsp;" checked={row.selected === true}
      onChange={this.onCheckedChange} data-ref={row.ref} />;
  }

  renderRow(row) {
    let fileExtension, link;
    if (row.typeName === "Folder") {
      fileExtension = "folder";
      link = <Link to={Path.repository + Path.browse(row.ref)}>{row.name}</Link>;
    }
    else {
      fileExtension = calcFileExtension(row.name);
      if (!fileIconVectorCatalog.includes(fileExtension)) {
        fileExtension = "blank";
      }
      link = <Link to={Path.repository + Path.details(row.ref)}>{row.name}</Link>;
    }

    return (
      <div className="w3-row">
        <div className="w3-col w3-center icon">
          <span className={"fiv-cla fiv-icon-" + fileExtension + " icon"} ></span>
        </div>
        <div className="w3-rest">
          <h4 className="margin-0">{link}</h4>
          <p className="w3-small w3-text-dark-grey margin-0">{row.ref}</p>
          <p className="margin-top">Created on <span className="highlight">{formatTime(row.createdTime)}</span> by <span className="highlight">{row.createdByName}</span></p>
          {row.modifiedTime && <p className="margin-0">Modified on <span className="highlight">{formatTime(row.modifiedTime)}</span> by <span className="highlight">{row.modifiedTByName}</span></p>}
        </div>
      </div>
    );
  }

  getPaginationProps() {
    return {
      rowCount: this.props.tableInfo.rowCount,
      rowStart: this.props.tableInfo.rowStart,
      rowEnd: this.props.tableInfo.rowEnd
    };
  }

  render() {
    return (
      <div className="repository-table">
        <TableManual
          columns={this.columns}
          dataSet={this.props.rows}
          pages={this.props.tableInfo.pageCount}
          pageSize={10}
          onReloadTableRows={this.onReloadTableRows}
          loading={this.props.loading}
          getPaginationProps={this.getPaginationProps}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  folderRef: state.repository.browse.folderRef,
  loading: state.repository.browse.tableLoading,
  rows: state.repository.browse.tableRows,
  tableParams: state.repository.browse.tableParams,
  tableInfo: state.repository.browse.tableInfo
});

const mapDispatchToProps = (dispatch) => ({
  doLoadTableRows: (tableParams) => dispatch(TableActions.loadTableRows(tableParams)),
  doTableRowSelected: (ref, checked) => dispatch(TableActions.tableRowSelected(ref, checked))
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryTable);
