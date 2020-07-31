import * as Action from "actions/repository/browse";

const initialState = {
  folderRef: undefined,         // ref of current folder

  currentPath: {                // absolute path of current element
    refs: undefined,              // path with refs
    names: undefined              // path with names
  },
  
  tableParams: {                // table config sended in request to api
    pageNo: 0,                    // number of page
    pageSize: 10,                 // count of rows at current page
    sortBy: "name",               // property used to sorting
    sortAsc: true,                // ascending sorting
    filter: ""                    // text to search
  },

  tableLoading: false,          // table is during loading
  tableRows: [],                // table rows
 
  tableInfo: {                  // info about table rows received as response from api
    pageCount: 0,                 // count of pages
    rowCount: 0,                  // count of all rows
    rowStart: 0,                  // number of first row at current page
    rowEnd: 0,                    // number of last row at current page
  },

  selectedRefs: [],             // selected elements refs
  selectedAction: undefined,    // selected action to be performed on selected elements


};

export default (state = initialState, action) => {
  switch (action.type) {

    case Action.FOLDER_REF_CHANGED:
      return {
        ...state,
        folderRef: action.folderRef,
      };
    
    case Action.CURRENT_PATH_CHANGED:
      return {
        ...state,
        currentPath: action.currentPath
      };

    case Action.TABLE_ROWS_LOADING:
      return {
        ...state,
        tableLoading: true
      };
    
    case Action.TABLE_ROWS_LOADED:
      return {
        ...state,
        tableLoading: false,
        tableParams: action.tableParams,
        tableRows: action.tableRows,
        tableInfo: action.tableInfo,
        checkedTableRows: []
      };
    
    case Action.TABLE_ROW_SELECTED:
      return {
        ...state,
        tableRows: updateSelectedTableRows(state.tableRows, action.ref, action.selected)
      };
    
    case Action.ACTION_SELECTED:
      return {
        ...state,
        selectedRefs: action.selectedRefs,
        selectedAction: action.action,
      };
    
    default:
      return state;
  }
};

function updateSelectedTableRows(tableRows, ref, selected){
  let _tableRows = tableRows.slice();
  _tableRows.forEach(e => {
    if (e.ref === ref || ref === []) {
      e.selected = selected;
    }
  });
  return _tableRows;
}