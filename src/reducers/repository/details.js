import * as Action from "actions/repository/details";

const initialState = {
  elementRef: undefined,        // ref of current element
  element: undefined            // current element
};

export default (state = initialState, action) => {
  switch (action.type) {

    case Action.ELEMENT_REF_CHANGED:
      return {
        ...state,
        elementRef: action.elementRef,
        element: action.element
      };
    
    default:
      return state;
  }
};