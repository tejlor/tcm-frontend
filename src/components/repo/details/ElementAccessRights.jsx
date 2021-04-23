import "./ElementAccessRights.scss";

import * as ElementApi from "api/repo/ElementApi";
import * as React from "react";

import Card from "components/commons/Card";
import CardMode from "enums/CardMode";
import { Checkbox } from "react-icheck";
import If from "components/commons/utils/If";
import UserGroupSelect from "components/commons/UserGroupSelect";
import UserSelect from "components/commons/UserSelect";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

class ElementAccessRights extends React.Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      originalAccessRights: [],
      accessRights: [],
      editable: false
    };

    this.loadData = this.loadData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCardEditModeChange = this.onCardEditModeChange.bind(this);
    this.onAddLevelClick = this.onAddLevelClick.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.element !== this.props.element) {
      this.loadData();
    }
  }

  loadData() {
    if (!this.props.element)
      return;
    
    ElementApi.getAccessRights(this.props.element.ref, (data) => {
      this.setState({
        ...this.state,
        accessRights: data,
        originalAccessRights: data
      });
    });
  }

  saveData() {
    ElementApi.saveAccessRights(this.props.element.ref, this.state.accessRights, (data) => {
      this.setState({
        ...this.state,
        accessRights: data,
        originalAccessRights: data
      });
      toastr.success("Access rights were saved.");
    });
  }

  onChange(accessRight, move) {
    let _accessRights = [...this.state.accessRights];
    if (move) {
      _accessRights = _accessRights.filter(ar => ar.orderNo !== accessRight.orderNo);
      _accessRights.splice(accessRight.orderNo + move, 0, accessRight);
    }
    else {
      for (let i = 0; i < _accessRights.length; i++){
        if (_accessRights[i].orderNo === accessRight.orderNo) {
          _accessRights[i] = accessRight;
          break;
        }
      }
    }
    _accessRights.forEach((ar, idx) => {
      ar.orderNo = idx;
    });
    this.setState({
      ...this.state,
      accessRights: _accessRights
    });
  }

  onAddLevelClick() {
    let _accessRights = [...this.state.accessRights];
    _accessRights.splice(_accessRights.length-1, 0, { // just before last position
      orderNo: 0,
      userIds: [],
      userGroupIds: [],
      canCreate: false,
      canRead: false,
      canUpdate: false, 
      canDelete: false
    });
    _accessRights.forEach((ar, idx) => {
      ar.orderNo = idx;
    });

    this.setState({
      ...this.state,
      accessRights: _accessRights
    });
  }

  onCardEditModeChange(editMode) {
    switch (editMode) {
      case CardMode.EDIT:
        this.setState({
          ...this.state,
          editable: true
        });
        break;
      
      case CardMode.CANCEL:
        this.setState({
          ...this.state,
          editable: false,
          accessRights: this.state.originalAccessRights
        });
        break;
      
      case CardMode.SAVE:
        this.setState({
          ...this.state,
          editable: false
        });
        this.saveData();
        break;
    }
  }

  render() {
    let rows = [];
    if (this.props.element && this.state.accessRights) {
      let count = this.state.accessRights.length;
      rows = this.state.accessRights.map((ar, idx) => (
        <AccessRightsRow key={idx} accessRight={ar} onChange={this.onChange} single={count === 1} first={idx == 0} last={idx === count - 2} editable={this.state.editable} />
      )
      );
    }
    return (
      <Card title="Access rights" defaultOpen editable onEditModeChange={this.onCardEditModeChange}>
        {rows}
        <If cond={this.state.editable}>
          <button className="w3-button w3-round w3-theme" onClick={this.onAddLevelClick}>Add level</button>
        </If>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  element: state.repo.element
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ElementAccessRights);


class AccessRightsRow extends React.Component {
  static defaultProps = {
    accessRight: undefined,
    single: true,
    first: false,
    last: false,
    editable: false,
    onChange: (accessRight) => { }
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.onUpClick = this.onUpClick.bind(this);
    this.onDownClick = this.onDownClick.bind(this);
  }

  onCheckChange(name, event, checked) {
    this.updateRowValue(name, checked);
  }

  onMultiSelectChange(name, options) {
    var values = options !== null ? options.map(o => o.value) : []; 
    this.updateRowValue(name, values);
  }

  updateRowValue(name, value) {
    var _accessRight = { ...this.props.accessRight };
    _accessRight[name] = value;
    this.props.onChange(_accessRight);
  }

  onUpClick() {
    var _accessRight = { ...this.props.accessRight };
    this.props.onChange(_accessRight, -1);
  }

  onDownClick() {
    var _accessRight = { ...this.props.accessRight };
    this.props.onChange(_accessRight, 1);
  }

  render() {    
    if (!this.props.accessRight) 
      return null;
    
    let editable = this.props.editable;
    let { forAll, userIds, userGroupIds, canCreate, canRead, canUpdate, canDelete } = this.props.accessRight;

    return (
      <div className="w3-row access-rights-row">
        <div className="w3-col m11">
          {!forAll
            ? <div className="condition">
              If user is <UserSelect value={userIds} onChange={this.onMultiSelectChange.bind(this, 'userIds')} disabled={!editable} />
              or belongs to <UserGroupSelect value={userGroupIds} onChange={this.onMultiSelectChange.bind(this, 'userGroupIds')} disabled={!editable} /> then:</div>
            : <If cond={!this.props.single} ><div className="condition">Everyone else:</div></If>
          }
          <div className="w3-row">
            <div className="w3-col m3">
              <Checkbox checkboxClass="icheckbox_flat-blue" label="Create" checked={canCreate === true}
                onChange={this.onCheckChange.bind(this, 'canCreate')} disabled={!editable} />
            </div>
            <div className="w3-col m3">
              <Checkbox checkboxClass="icheckbox_flat-blue" label="Read" checked={canRead === true}
                onChange={this.onCheckChange.bind(this, 'canRead')} disabled={!editable} />
            </div>
            <div className="w3-col m3">
              <Checkbox checkboxClass="icheckbox_flat-blue" label="Update" checked={canUpdate === true}
                onChange={this.onCheckChange.bind(this, 'canUpdate')} disabled={!editable} />
            </div>
            <div className="w3-col m3">
              <Checkbox checkboxClass="icheckbox_flat-blue" label="Delete" checked={canDelete === true}
                onChange={this.onCheckChange.bind(this, 'canDelete')} disabled={!editable} />
            </div>
          </div>
        </div>
        <div className="w3-col m1 carets">
          <If cond={!forAll && editable}>
            {this.props.first
              ? <i class="fas fa-caret-up disabled" />
              : <i class="fas fa-caret-up" title="Move up" onClick={this.onUpClick}/>
            }
            <br />
            {this.props.last
              ? <i class="fas fa-caret-down disabled" />
              : <i class="fas fa-caret-down" title="Move down" onClick={this.onDownClick}/>
            }
          </If>
        </div>
      </div>
    );
  }
}
