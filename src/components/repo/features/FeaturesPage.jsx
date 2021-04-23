import * as FeatureApi from "api/repo/FeatureApi";
import * as React from "react";
import * as TableActions from "actions/table";

import FeatureDialog from "./FeatureDialog";
import PageWithTable from "components/commons/layout/PageWithTable";
import TableManual from "components/commons/table/TableManual";
import { connect } from "react-redux";

class FeaturesPage extends React.Component {
  static defaultProps = {};

  columns = [
    {
      Header: <span className="w3-left">Name</span>,
      accessor: "name"
    },
    {
      Header: <span className="w3-left">Code</span>,
      accessor: "code"
    },
  ];
  order = [{ id: "name", desc: false }];

  constructor(props) {
    super(props);
    this.state = {}; 

    this.onReloadTableRows = this.onReloadTableRows.bind(this);
  }

  onReloadTableRows(tableState) {
    this.props.doLoadRows(FeatureApi.table, {
      pageNo: tableState.page,
      pageSize: tableState.pageSize,
      sortBy: tableState.sorted[0].id, 
      sortAsc: !tableState.sorted[0].desc,
      filter: this.props.tableParams.filter
    });
  }

  render() {
    return (
      <PageWithTable title="Features" icon="far fa-file-code" onExportToXlsx={FeatureApi.exportToXlsx} >
        <TableManual
          columns={this.columns}
          order={this.order}
          onReloadTableRows={this.onReloadTableRows}
        />
        <FeatureDialog />
      </PageWithTable>
    );
  }
}

const mapStateToProps = (state) => ({
  tableParams: state.table.tableParams,
});

const mapDispatchToProps = (dispatch) => ({
  doOpenDialog: (row, mode) => dispatch(TableActions.openDialog(row, mode)),
  doLoadRows: (method, tableParams) => dispatch(TableActions.loadRows(method, tableParams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesPage);
