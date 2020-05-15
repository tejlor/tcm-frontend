import * as FileApi from "api/FileApi";

export const ELEMENT_REF_CHANGED = "ELEMENT_REF_CHANGED";


export const setElementRef = (elementRef) => {
  return (dispatch) => {
    FileApi.get(elementRef, (data) => {
      dispatch(elementRefChanged(elementRef, data));
    });
  };
};

const elementRefChanged = (elementRef, data) => ({
  type: ELEMENT_REF_CHANGED,
  elementRef: elementRef,
  element: data
});
