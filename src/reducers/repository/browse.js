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

};

export default (state = initialState, action) => {
  switch (action.type) {

    case Action.FOLDER_REF_CHANGED:
      return {
        ...state,
        folderRef: action.folderRef,
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
        tableInfo: action.tableInfo
      };
    
    default:
      return state;
  }
};