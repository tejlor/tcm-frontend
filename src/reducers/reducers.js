import { reducer as toastr } from 'react-redux-toastr';
import { combineReducers } from 'redux';

import session from './session';


export default combineReducers({
  session: session,
  toastr: toastr
});