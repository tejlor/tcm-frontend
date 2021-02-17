export const SELECTED_ALL = -1;

export function loadRows(method, tableParams) {
  let state = window.store.getState();
  if (tableParams === undefined) {
    tableParams = state.table.tableParams;
  }
  return (dispatch) => {
    dispatch(rowsLoading());
    method(tableParams, (data) => {
      dispatch(rowsLoaded(data));
    });
  };
}

export function reloadRows(tableParams) {
  let state = window.store.getState();
  if (tableParams == undefined) {
    tableParams = state.table.tableParams;
  }
  return (dispatch) => {
    dispatch(reloadEvent(tableParams));
  };
}

export function selectRow(id, selected) {
  return (dispatch) => {
    dispatch(rowSelected(id, selected));
  };
}

export function selectAction(action, actionRows) {
  return dispatch => {
    dispatch(actionSelected(action, actionRows));
  };
}

export function openDialog(row, mode) {
  return (dispatch) => {
    dispatch(dialogOpened(row, mode));
  };
}

export function closeDialog(row, mode) {
  return (dispatch) => {
    dispatch(dialogClosed(row, mode));
  };
}

export const ROWS_LOADING = "ROWS_LOADING";
export const ROWS_LOADED = "ROWS_LOADED";
export const RELOAD_EVENT = "RELOAD_EVENT";
export const ROW_SELECTED = "ROW_SELECTED";
export const ACTION_SELECTED = "ACTION_SELECTED";
export const DIALOG_OPENED = "DIALOG_OPENED";
export const DIALOG_CLOSED = "DIALOG_CLOSED";

const rowsLoading = () => ({
  type: ROWS_LOADING
});

const rowsLoaded = (data) => ({
  type: ROWS_LOADED,
  rows: data.rows,
  tableParams: data.tableParams,
  tableInfo: data.tableInfo
});

const reloadEvent = (tableParams) => ({
  type: RELOAD_EVENT,
  tableParams: tableParams
});

const rowSelected = (id, selected) => ({
  type: ROW_SELECTED,
  id: parseInt(id),
  selected: selected
});

const actionSelected = (actionType, actionRows) => ({
  type: ACTION_SELECTED,
  actionType: actionType,
  actionRows: actionRows
});

const dialogOpened = (row, mode) => ({
  type: DIALOG_OPENED,
  row: row,
  mode: mode
});

const dialogClosed = () => ({
  type: DIALOG_CLOSED
});
