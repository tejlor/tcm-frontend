import * as React from "react";
import * as UserGroupApi from "api/adm/UserGroupApi";

import Select from "react-select-v1";

export default class UserGroupSelect extends React.Component {
  static defaultProps = {
    value: undefined,
    multi: true,
    disabled: false,
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      userGroups: []
    };

    this.loadUserGroups();
  }

  loadUserGroups() {
    UserGroupApi.getAll(data => {
      let _userGroups = data.map(g => ({
        label: g.name,
        value: g.id
      }));
      this.setState({
        ...this.state,
        userGroups: _userGroups
      });
    });
  }

  render() {    
    return (
      <Select value={this.props.value} options={this.state.userGroups} multi={this.props.multi} disabled={this.props.disabled} className="select-inline w200"
        onChange={this.props.onChange} placeholder="Select" clearable={true} />
    );
  }
}