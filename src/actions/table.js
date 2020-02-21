export const DATASET_LOADED = "DATASET_LOADED";
export const DIALOG_DATASET_LOADED = "DIALOG_DATASET_LOADED";
export const FILTER = "FILTER";
export const DIALOG_FILTER = "DIALOG_FILTER";
export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const UPDATE_ROW = "UPDATE_ROW";


export const dataSetLoaded = (dataSet) => {
  return {
    type: DATASET_LOADED,
    dataSet: dataSet
  };
};

export const dialogDataSetLoaded = (dataSet) => {
  return {
    type: DIALOG_DATASET_LOADED,
    dataSet: dataSet
  };
};

export const filter = (value, skipColumns) => {
  return {
    type: FILTER,
    value: value,
    skipColumns: skipColumns
  };
};

export const dialogFilter = (value) => {
  return {
    type: DIALOG_FILTER,
    value: value
  };
};

export const openDialog = (row, mode, selection = {}) => {
  return {
    type: OPEN_DIALOG,
    row: row,
    mode: mode,
    selection: selection
  };
};

export const closeDialog = () => {
  return {
    type: CLOSE_DIALOG,
    row: null
  };
};

export const updateRow = (before, after) => {
  return {
    type: UPDATE_ROW,
    before: before,
    after: after
  };
};
