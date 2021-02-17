import "./Filter.scss";

import * as React from "react";
import * as TableActions from "actions/table";

import { connect } from "react-redux";

class Filter extends React.Component {
  static defaultProps = {};

  timeoutId = null;

  constructor(props) {
    super(props);

    this.state = {
      filter: ""
    };

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      filter: event.target.value
    });
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.search, 500);
  }
  
  search() {
    let _tableParams = {
      ...this.props.tableParams,
      filter: this.state.filter
    };

    this.props.doReloadTableRows(_tableParams);
  }

  render() {
    return (
      <div className="w3-right w3-border-left filter">
        <i className="fas fa-search" />
        <input type="text" className="filter" onChange={this.onChange} value={this.state.filter}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tableParams: state.table.tableParams
});

const mapDispatchToProps = (dispatch) => ({
  doReloadTableRows: (tableParams) => dispatch(TableActions.reloadRows(tableParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);