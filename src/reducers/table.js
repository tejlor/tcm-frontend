import * as Action from "actions/table";
// import DialogMode from "enums/DialogMode";

const initialState = {
  originalDataSet: [],                  // original (full) data set
  filteredDataSet: [],                  // filtered data set data set
  filter: "",                           // filter text
  treeSelectedRef: undefined,               // selected element in tree
  // selectedRow: undefined,               // selected row
  // dialogMode: DialogMode.HIDDEN,        // dialog mode
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Action.DATASET_LOADED:
      return {
        ...state,
        filter: initialState.filter,
        originalDataSet: action.dataSet,
        filteredDataSet: action.dataSet
      };

    case Action.FILTER:
      return {
        ...state,
        filter: action.filter,
        filteredDataSet: filterDataSet(state.originalDataSet, action.filter)
      };
    
    case Action.TREE_SELECTED:
      return {
        ...state,
        treeSelectedRef: action.selectedRef
      };

    // case Action.OPEN_DIALOG:
    //   return {
    //     ...state,
    //     dialogMode: action.mode,
    //     selectedRow: action.row,
    //     selection: action.selection
    //   };

    // case Action.CLOSE_DIALOG:
    //   return {
    //     ...state,
    //     dialogMode: DialogMode.HIDDEN,
    //     selectedRow: undefined
    //   };

    // case Action.UPDATE_ROW:
    //   return {
    //     ...state,
    //     originalDataSet: updateDataSet(state.originalDataSet, action.before, action.after),
    //     filteredDataSet: updateDataSet(state.filteredDataSet, action.before, action.after),
    //     dialogMode: DialogMode.HIDDEN,
    //     selectedRow: undefined,
    //     selection: {}
    //   };
    
    default:
      return state;
  }
};

// function updateDataSet(dataSet, before, after) {
//   var newDataSet = [];
//   var inserted = false;
//   dataSet.forEach((row) => {
//     if (row !== before) {
//       newDataSet.push(row);
//     }
//     else if (after != null) { // podmieniamy rekord w tym samym miejscu, żeby nie było dziwnego sortowania
//       newDataSet.push(after);
//       inserted = true;
//     }
//   });
//   if (after != null && inserted === false) {
//     newDataSet.push(after);
//   }
//   return newDataSet;
// }

function filterDataSet(dataSet, filter) {
  if (!filter) return dataSet;

  return dataSet.filter((row) => {
    return searchInObject(row, filter.toLowerCase());
  });
}

function searchInObject(obj, filter) {
  for (var key in obj) {
    if (!obj[key]) continue;

    if (typeof obj[key] === "object") {
      if (searchInObject(obj[key], filter) === true)
        return true;
    }
    else if (obj[key].toString().toLowerCase().includes(filter)) {
      return true;
    }
  }
  return false;
}
