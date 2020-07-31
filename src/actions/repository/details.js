import { currentPathChanged } from "./browse";
import * as ElementApi from "api/ElementApi";
import * as FileApi from "api/FileApi";

export const ELEMENT_REF_CHANGED = "ELEMENT_REF_CHANGED";


export const setElementRef = (elementRef) => {
  return (dispatch) => {
    ElementApi.path(elementRef, (data) => {
      dispatch(currentPathChanged(data))
    });
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
