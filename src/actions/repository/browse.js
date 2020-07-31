import * as ElementApi from "api/ElementApi";

export const FOLDER_REF_CHANGED = "FOLDER_REF_CHANGED";
export const CURRENT_PATH_CHANGED = "CURRENT_PATH_CHANGED";
export const TABLE_ROWS_LOADING = "TABLE_ROWS_LOADING";
export const TABLE_ROWS_LOADED = "TABLE_ROWS_LOADED";
export const TABLE_ROW_SELECTED = "TABLE_ROW_SELECTED";
export const ACTION_SELECTED = "ACTION_SELECTED";

export const setFolderRef = (folderRef) => {
  return (dispatch) => {
    ElementApi.path(folderRef, (data) => {
      dispatch(currentPathChanged(data))
    });
    dispatch(folderRefChanged(folderRef));
    dispatch(loadTableRows(undefined, folderRef));
  };
};

export const loadTableRows = (tableParams, folderRef) => {
  let store = window.store;
  if (tableParams === undefined) {
    tableParams = store.getState().repository.browse.tableParams;
  }
  if (folderRef === undefined) {
    folderRef = store.getState().repository.browse.folderRef;
  }

  return (dispatch) => {
    dispatch(tableRowsLoading());
    ElementApi.childrenTable(folderRef, tableParams, (data) => {
      dispatch(tableRowsLoaded(data));
    });
  };
}

export const tableRowSelected = (ref, selected) => ({
  type: TABLE_ROW_SELECTED,
  ref: ref,
  selected: selected
});

export const actionSelected = (selectedRefs, action) => ({
  type: ACTION_SELECTED,
  selectedRefs: selectedRefs,
  action: action
});

const folderRefChanged = (parentRef) => ({
  type: FOLDER_REF_CHANGED,
  folderRef: parentRef,
});

export const currentPathChanged = (currentPath) => ({
  type: CURRENT_PATH_CHANGED,
  currentPath: currentPath,
});

const tableRowsLoading = () => ({
  type: TABLE_ROWS_LOADING
});

const tableRowsLoaded = (data) => ({
  type: TABLE_ROWS_LOADED,
  tableParams: data.tableParams,
  tableRows: data.rows,
  tableInfo: data.tableInfo
});


