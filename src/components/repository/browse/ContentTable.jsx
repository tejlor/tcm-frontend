import * as TableActions from "actions/repository/browse";
import Pagination from "components/common/Pagination";
import fileIconVectorCatalog from "file-icon-vectors/dist/icons/classic/catalog.json";
import * as React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import ReactTable from "react-table-6";
import Path from "utils/Path";
import { calcFileExtension, formatTime } from "utils/Utils";


class ContentTable extends React.Component {
  
  static defaultProps = {
  
  };

  columns = [
    {
      id: "main",
      accessor: row => this.renderRow(row)
    },
  ];

  constructor(props) {
    super(props);
    
    this.state = {

    };

    this.loadTableRows = this.loadTableRows.bind(this);
    this.onReloadTableRows = this.onReloadTableRows.bind(this);
    this.getPaginationProps = this.getPaginationProps.bind(this);
  }

  onReloadTableRows(state) {
    console.log(state.page);
    this.loadTableRows(state.page);
  }

  loadTableRows(page) {  
    // let parentRef = this.props.parentRef;
    // if (!parentRef)
    //   return;

    let _tableParams = {
      ...this.props.tableParams,
      pageNo: page,
      pageSize: 10,
    };
   
    this.props.doLoadTableRows(_tableParams);
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
      <div className="contentTable">
        <ReactTable
          columns={this.columns}
          className="-striped"
          manual
          onFetchData={this.onReloadTableRows}
          loading={this.props.loading}
          data={this.props.rows}
          pages={this.props.tableInfo.pageCount}
          pageSize={10}
          minRows={1}
          PaginationComponent={Pagination}
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
  doLoadTableRows: (tableParams) => dispatch(TableActions.loadTableRows(tableParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentTable);
