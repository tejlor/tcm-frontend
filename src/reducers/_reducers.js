import repo from './repo';
import session from './session';
import table from './table';
import { reducer as toastr } from 'react-redux-toastr';
import { combineReducers } from 'redux';

export default combineReducers({
  session: session,
  table: table,
  repo: repo,
  toastr: toastr
});