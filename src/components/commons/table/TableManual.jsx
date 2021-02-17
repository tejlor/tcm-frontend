import "./TableManual.scss";

import * as React from "react";
import * as TableActions from "actions/table";

import DialogMode from "enums/DialogMode";
import Pagination from "./Pagination";
import ReactTable from "react-table-6";
import { connect } from "react-redux";

class TableManual extends React.Component {
  
  static defaultProps = {
    columns: [],
    order: undefined,
    pageSize: undefined,
    onReloadTableRows: undefined,
    showDialog: true,

    getTrProps: undefined,
    subComponent: undefined
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.tableRef = React.createRef();

    this.getPaginationProps = this.getPaginationProps.bind(this);
    this.onShowDialog = this.onShowDialog.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reloadEvent !== this.props.reloadEvent) {
      this.tableRef.current.fireFetchData();
    }
  }

  getPaginationProps() {
    return {
      rowCount: this.props.tableInfo.rowCount,
      rowStart: this.props.tableInfo.rowStart,
      rowEnd: this.props.tableInfo.rowEnd
    };
  }

  onShowDialog(row) {
    this.props.doOpenDialog(row, DialogMode.EDIT);
  }

  render() {
    return (
      <ReactTable
        manual
        ref={this.tableRef} 
        columns={this.props.columns}
        defaultSorted={this.props.order}
        pageSize={this.props.pageSize ?? 10}
        onFetchData={this.props.onReloadTableRows}

        data={this.props.rows}
        loading={this.props.loading}
        minRows={1}
        pages={this.props.tableInfo.pageCount}
        previousText="<<"
        nextText=">>"
        loadingText="Loading..."
        noDataText="No results"
        pageText="Page"
        ofText="of"
        rowsText="rows"
        pageJumpText="jump"
        rowsSelectorText="rows per page"
        className={"-striped" + (this.props.showDialog ? " -highlight" : "")}
        SubComponent={this.props.subComponent}
        getTrProps={this.props.getTrProps}
        getTdProps={(state, rowInfo, column) => {
          if (rowInfo && this.props.showDialog === true && column.id !== "options")
            return {
              onClick: (e) => {
                this.onShowDialog(rowInfo.original);
              },
              style: { cursor: "pointer" }
            };
          else return {};
        }}
        PaginationComponent={Pagination}
        getPaginationProps={this.getPaginationProps}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.table.loading,
  rows: state.table.rows,
  tableInfo: state.table.tableInfo,
  reloadEvent: state.table.reloadEvent
});

const mapDispatchToProps = (dispatch) => ({
  doOpenDialog: (row, mode) => dispatch(TableActions.openDialog(row, mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableManual);