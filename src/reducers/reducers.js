import { reducer as toastr } from 'react-redux-toastr';
import { combineReducers } from 'redux';

import session from './session';
import table from './table';


export default combineReducers({
  session: session,
  table: table,
  toastr: toastr
});