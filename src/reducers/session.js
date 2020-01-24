import * as Action from "../actions/session";

const initialState = {
  currentUser: undefined,         // zalogowany użytkownik 
};

export default (state = initialState, action) => {
  switch (action.type) {
          
    case Action.CURRENT_USER_LOADED: 
      return {
        ...state,
        currentUser: action.user
      };
    

    default:
      return state;
  }
};
