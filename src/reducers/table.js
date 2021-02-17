import * as Action from "actions/table";

import DialogMode from "enums/DialogMode";

const initialState = { 
  tableParams: {                  // table config sended in request to api
    pageNo: 0,                      // number of page
    pageSize: 10,                   // count of rows at current page
    sortBy: "id",                   // property used to sorting
    sortAsc: true,                  // ascending sorting
    filter: ""                      // text to search
  },

  loading: false,                 // table is during loading
  reloadEvent: 0,                 // reload event id
  rows: [],                       // table rows
 
  tableInfo: {                    // info about table rows received as response from api
    pageCount: 0,                   // count of pages
    rowCount: 0,                    // count of all rows
    rowStart: 0,                    // number of first row at current page
    rowEnd: 0                       // number of last row at current page
  },

  selectedAction: undefined,      // selected action to be performed on selected elements
  actionRows: [],                 // list of elements associated with selectedAction

  dialogMode: DialogMode.HIDDEN,  // row dialog mode
  dialogRow: undefined            // object currently previewed or edited in dialog
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case Action.ROWS_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case Action.ROWS_LOADED:
      return {
        ...state,
        loading: false,
        rows: action.rows,
        tableParams: action.tableParams,
        tableInfo: action.tableInfo
      };
    
    case Action.RELOAD_EVENT:
      return {
        ...state,
        tableParams: action.tableParams,
        reloadEvent: state.reloadEvent + 1
      };
    
    case Action.ROW_SELECTED:
      return {
        ...state,
        rows: updateSelectedRows(state.rows, action.id, action.selected)
      };
    
    case Action.ACTION_SELECTED:
      let x = {
        ...state,
        rows: updateSelectedRows(state.rows, Action.SELECTED_ALL, false), // unselect all rows
        selectedAction: action.actionType,
        actionRows: action.actionRows
      };
      console.log(x);
      return x;
    
    case Action.DIALOG_OPENED:
      return {
        ...state,
        dialogMode: action.mode,
        dialogRow: action.row
      };
  
    case Action.DIALOG_CLOSED:
      return {
        ...state,
        dialogMode: DialogMode.HIDDEN,
        dialogRow: undefined
      };
    
    default:
      return state;
  }
};
export default reducer;

function updateSelectedRows(rows, id, selected){
  let _rows = rows.slice();
  _rows.forEach(e => {
    if (e.id === id || id === Action.SELECTED_ALL) {
      e.selected = selected;
    }
  });
  return _rows;
}

