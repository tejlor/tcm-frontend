import * as Action from "actions/session";

const initialState = {
  currentUser: undefined,         // logged user 
  settings: undefined             // server settings
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
          
    case Action.CURRENT_USER_LOADED: 
      return {
        ...state,
        currentUser: action.user
      };
    
    case Action.SETTINGS_LOADED: 
      return {
        ...state,
        settings: buildSettingsMap(action.settings)
      };

    default:
      return state;
  }
};

export default reducer;

function buildSettingsMap(settings) {
  if (settings === undefined) {
    return undefined;
  }
  
  return settings.reduce((map, obj) => {
    map[obj.name] = obj.value;
    return map;
  }, {});
}