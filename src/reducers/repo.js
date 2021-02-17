import * as Action from "actions/repo";

const initialState = {
  folder: undefined,            // current folder
  element: undefined,           // current element
  path: {                       // absolute path of current element or folder
    refs: undefined,              // path with refs
    names: undefined              // path with names
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case Action.FOLDER_CHANGED:
      return {
        ...state,
        folder: action.folder,
      };
    
    case Action.ELEMENT_CHANGED:
      return {
        ...state,
        element: action.element
      };
    
    case Action.PATH_CHANGED:
      return {
        ...state,
        path: action.path
      };
    
    default:
      return state;
  }
};
export default reducer;
