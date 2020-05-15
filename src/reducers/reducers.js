import repositoryBrowse from './repository/browse';
import repositoryDetails from './repository/details';
import session from './session';
import { reducer as toastr } from 'react-redux-toastr';
import { combineReducers } from 'redux';


export default combineReducers({
  session: session,
  repository: combineReducers({
    browse: repositoryBrowse,
    details: repositoryDetails
  }),
  toastr: toastr
});