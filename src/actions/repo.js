import * as TableActions from "actions/table";
import * as ElementApi from "api/ElementApi";
import * as FileApi from "api/FileApi";
import * as FolderApi from "api/FolderApi";

export function setFolder(folderRef) {
  return (dispatch) => {
    FolderApi.get(folderRef, (data) => {
      dispatch(folderChanged(data));
    });
    ElementApi.path(folderRef, (data) => {
      dispatch(pathChanged(data))
    });
    dispatch(TableActions.loadRows(ElementApi.childrenTable.bind(this, folderRef), undefined));
  };
}

export function setElement(elementRef) {
  return (dispatch) => {
    ElementApi.path(elementRef, (data) => {
      dispatch(pathChanged(data))
    });
    FileApi.get(elementRef, (data) => {
      dispatch(elementChanged(data));
    });
  };
}

export const FOLDER_CHANGED = "FOLDER_CHANGED";
export const ELEMENT_CHANGED = "ELEMENT_CHANGED";
export const PATH_CHANGED = "PATH_CHANGED";

const folderChanged = (folder) => ({
  type: FOLDER_CHANGED,
  folder: folder,
});

const elementChanged = (data) => ({
  type: ELEMENT_CHANGED,
  element: data
});

const pathChanged = (path) => ({
  type: PATH_CHANGED,
  path: path,
});