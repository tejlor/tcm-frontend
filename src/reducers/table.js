import * as Action from "../actions/table";
import DialogMode from "../enums/DialogMode";

const initialState = {
  originalDataSet: [],            // pełny data set
  filteredDataSet: [],            // wyfiltrowany data set
  filter: "",                     // treść filtrowania
  selectedRow: undefined,         // wybrany wiersz
  selection: {},                  // dodatkowe opcje dotyczące wybranego wiersza
  dialogMode: DialogMode.HIDDEN,  // tryb okna dialogowego

  dialogOriginalDataSet: [],      // pełny data set
  dialogFilteredDataSet: [],      // wyfiltrowany data set
  dialogFilter: "",               // treść filtrowania
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Action.DATASET_LOADED:
      return {
        ...state,
        filter: "",
        originalDataSet: action.dataSet,
        filteredDataSet: action.dataSet
      };
    
    case Action.DIALOG_DATASET_LOADED:
      return {
        ...state,
        dialogFilter: "",
        dialogOriginalDataSet: action.dataSet,
        dialogFilteredDataSet: action.dataSet
      };

    case Action.FILTER:
      return {
        ...state,
        filter: action.value,
        filteredDataSet: filterDataSet(state.originalDataSet, action.value, action.skipColumns)
      };
    
    case Action.DIALOG_FILTER:
      return {
        ...state,
        dialogFilter: action.value,
        dialogFilteredDataSet: filterDataSet(state.dialogOriginalDataSet, action.value)
      };

    case Action.OPEN_DIALOG:
      return {
        ...state,
        dialogMode: action.mode,
        selectedRow: action.row,
        selection: action.selection
      };

    case Action.CLOSE_DIALOG:
      return {
        ...state,
        dialogMode: DialogMode.HIDDEN,
        selectedRow: undefined
      };

    case Action.UPDATE_ROW:
      return {
        ...state,
        originalDataSet: updateDataSet(state.originalDataSet, action.before, action.after),
        filteredDataSet: updateDataSet(state.filteredDataSet, action.before, action.after),
        dialogMode: DialogMode.HIDDEN,
        selectedRow: undefined,
        selection: {}
      };
    
    default:
      return state;
  }
};

function updateDataSet(dataSet, before, after) {
  var newDataSet = [];
  var inserted = false;
  dataSet.forEach((row) => {
    if (row !== before) {
      newDataSet.push(row);
    }
    else if (after != null) { // podmieniamy rekord w tym samym miejscu, żeby nie było dziwnego sortowania
      newDataSet.push(after);
      inserted = true;
    }
  });
  if (after != null && inserted === false) {
    newDataSet.push(after);
  }
  return newDataSet;
}

function filterDataSet(dataSet, filter, skipColumns) {
  if (!filter) return dataSet;

  return dataSet.filter((row) => {
    return searchInObject(row, filter.toLowerCase(), skipColumns);
  });
}

function searchInObject(obj, filter, skipColumns) {
  for (var key in obj) {
    if (key === skipColumns)
      continue;

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
