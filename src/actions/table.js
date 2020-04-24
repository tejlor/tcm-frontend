export const DATASET_LOADED = "DATASET_LOADED";
export const FILTER = "FILTER";
export const TREE_SELECTED = "TREE_SELECTED";
// export const OPEN_DIALOG = "OPEN_DIALOG";
// export const CLOSE_DIALOG = "CLOSE_DIALOG";
// export const UPDATE_ROW = "UPDATE_ROW";


export const dataSetLoaded = (dataSet) => {
  return {
    type: DATASET_LOADED,
    dataSet: dataSet
  };
};

export const filter = (filter) => {
  return {
    type: FILTER,
    filter: filter
  };
};

export const treeSelected = (selectedRef) => {
  return {
    type: TREE_SELECTED,
    selectedRef: selectedRef
  };
}

// export const openDialog = (row, mode, selection = {}) => {
//   return {
//     type: OPEN_DIALOG,
//     row: row,
//     mode: mode,
//     selection: selection
//   };
// };

// export const closeDialog = () => {
//   return {
//     type: CLOSE_DIALOG,
//     row: null
//   };
// };

// export const updateRow = (before, after) => {
//   return {
//     type: UPDATE_ROW,
//     before: before,
//     after: after
//   };
// };
