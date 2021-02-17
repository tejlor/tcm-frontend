import * as TableActions from "actions/repo";
import * as React from "react";
import { connect } from "react-redux";

class TableFilter extends React.Component {

  static defaultProps = {
    skipColumns: "",
    doFilter: (value, skipColumns) => {}
  };

  constructor(props){
    super(props);

    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    this.props.doFilter(event.target.value, this.props.skipColumns);
  }

  render() {
    let { value } = this.props;

    return (
      <div className="table-filter">
        <label className="inline">Find:</label>
        <input type="text" className="w3-input w3-round w3-border input-inline" style={{ marginRight: "0px" }} value={value} onChange={this.onChange} />
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