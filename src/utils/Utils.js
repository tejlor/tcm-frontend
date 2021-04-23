import moment from "moment";

// Common

export function null2Str(value) {
  return value ? value : "";
}

export function bool2Str(value) {
  return value !== null
    ? (value === true ? "Yes" : "No")
    : "?";
}


// Strings

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sort(a, b) {
  a = (a === null || a === undefined ? '' : a);
  b = (b === null || b === undefined ? '' : b);

  a = (typeof a === "string" ? a.toLowerCase() : a);
  b = (typeof b === "string" ? b.toLowerCase() : b);

  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }
 
  if (a === '' && b === 0) {
    return -1;
  }
  else if (a === 0 && b === '') {
    return 1;
  }
  
  if (a > b) {
    return 1;
  }
  else if (a < b) {
    return -1;
  }
  else {
    return 0;
  }
}

export function calcFileExtension(filename) {
  return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
}

// Decimal

export function formatSize(value) {
  if (value < 1024) {
    return value + " B";
  }

  value /= 1024;
  if (value < 1024) {
    return value.toFixed(2) + " KB";
  }

  value /= 1024;
  if (value < 1024) {
    return value.toFixed(2) + " MB";
  }

  value /= 1024;
  if (value < 1024) {
    return value.toFixed(2) + " GB";
  }
}

// Date & Time

const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm";

export function strToDate(str) {
  return new Date(str);
}

export function strToTime(str) {
  return new Date(str);
}

export function formatDate(date) {
  if (!date) {
    return "";
  }

  if (typeof date === "object") {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    if (month.length == 1) {
      month = '0' + month;
    }
    return `${year}-${month}-${day}`;
  }

  return "?";
}

export function formatTime(time) {
  if (!time) {
    return "";
  }

  if (typeof time === "object") {
    return time.format(TIME_FORMAT);
  }
  
  return "?";
}

