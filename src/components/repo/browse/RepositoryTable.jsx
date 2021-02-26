import "./RepositoryTable.scss";

import * as ElementApi from "api/repo/ElementApi";
import * as React from "react";
import * as TableActions from "actions/table";

import { calcFileExtension, formatTime } from "utils/Utils";

import { Checkbox } from "react-icheck";
import { Link } from "react-router-dom";
import Path from "utils/Path";
import TableManual from "components/commons/table/TableManual";
import { connect } from "react-redux";
import fileIconVectorCatalog from "file-icon-vectors/dist/icons/classic/catalog.json";

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
  order = [{ id: "name", desc: false }];

  constructor(props) {
    super(props);
    
    this.state = {};

    this.onReloadTableRows = this.onReloadTableRows.bind(this);
    this.onCheckedChange = this.onCheckedChange.bind(this);
  }

  onReloadTableRows(tableState) {
    if (!this.props.folderRef) 
      return;
  
    this.props.doLoadRows(ElementApi.childrenTable.bind(this, this.props.folderRef), {
      ...this.props.tableParams,
      pageNo: tableState.page,
      pageSize: tableState.pageSize,
    });
  }

  onCheckedChange(event, checked) {
    this.props.doSelectRow(event.target.dataset.id, checked);
  }

  renderCheck(row) {
    return <Checkbox checkboxClass="icheckbox_flat-blue" label="&nbsp;" checked={row.selected === true} onChange={this.onCheckedChange} data-id={row.id} />;
  }

  renderRow(row) {
    let fileExtension, link;
    if (row.typeName === "Folder") {
      fileExtension = "folder";
      link = <Link to={Path.repo + Path.browse(row.ref)}>{row.name}</Link>;
    }
    else {
      fileExtension = calcFileExtension(row.name);
      if (!fileIconVectorCatalog.includes(fileExtension)) {
        fileExtension = "blank";
      }
      link = <Link to={Path.repo + Path.details(row.ref)}>{row.name}</Link>;
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

  render() {
    return (
      <div className="repository-table">
        <TableManual
          columns={this.columns}
          order={this.order}
          onReloadTableRows={this.onReloadTableRows}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  folderRef: state.repo.folder?.ref,
  tableParams: state.table.tableParams,
  tableInfo: state.table.tableInfo
});

const mapDispatchToProps = (dispatch) => ({
  doLoadRows: (method, tableParams) => dispatch(TableActions.loadRows(method, tableParams)),
  doSelectRow: (id, selected) => dispatch(TableActions.selectRow(id, selected))
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryTable);
