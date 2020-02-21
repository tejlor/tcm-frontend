import Pagination from "./Pagination";
import * as React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-6";
import * as Utils from "utils/Utils";


class Table extends React.Component {
  static defaultProps = {
    columns: [],
    order: [],
    getTrProps: undefined,
    showPageSizeOptions: true,
    SubComponent: undefined,
    onShowDialog: undefined
  };

  render() {
    var className = "-striped" + (this.props.onShowDialog ? " -highlight" : "");

    return (
      <ReactTable
        data={this.props.dataSet}
        columns={this.props.columns}
        defaultSorted={this.props.order}
        defaultSortMethod={Utils.sort}
        pageSizeOptions={[10, 20, 50, 1000]}
        defaultPageSize={1000}
        minRows={1}
        previousText="<<"
        nextText=">>"
        loadingText="Wczytywanie..."
        noDataText="Brak wyników"
        pageText="Strona"
        ofText="z"
        rowsText="wierszy"
        pageJumpText="skocz"
        rowsSelectorText="wierszy na stronę"
        className={className}
        showPageSizeOptions={this.props.showPageSizeOptions}
        SubComponent={this.props.SubComponent}
        getTrProps={this.props.getTrProps}
        getTdProps={(state, rowInfo, column) => {
          if (rowInfo && this.props.onShowDialog && column.id !== "options")
            return {
              onClick: (e) => {
                this.props.onShowDialog(rowInfo.original);
              },
              style: { cursor: "pointer" }
            };
          else return {};
        }}
        PaginationComponent={Pagination}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataSet: state.table.filteredDataSet
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Table);