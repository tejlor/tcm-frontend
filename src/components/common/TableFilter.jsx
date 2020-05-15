import * as React from "react";
import { connect } from "react-redux";

import * as TableActions from "actions/repository/browse";

class TableFilter extends React.Component {
  static defaultProps = {
    value: "",
    skipColumns: "",
    doFilter: (value, skipColumns) => {}
  };

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    this.props.doFilter(event.target.value, this.props.skipColumns);
  }

  render() {
    return (
      <div className="table-filter">
        <label className="inline">Szukaj:</label>
        <input type="text" className="w3-input w3-round w3-border input-inline" style={{ marginRight: "0px" }} value={this.props.value} onChange={this.onChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    value: state.table.filter
  };
};

const mapDispatchToProps = {
  doFilter: TableActions.filter
};

export default connect(mapStateToProps, mapDispatchToProps)(TableFilter);