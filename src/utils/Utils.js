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

  if(typeof a === "string" && typeof b === "string")
    return a.localeCompare(b);
 
  if (a === '' && b === 0)
    return -1;
  else if (a === 0 && b === '')
    return 1;
  
  if (a > b)
    return 1;
  else if (a < b)
    return -1;
  else
    return 0;
}

export function calcFileExtension(filename) {
  return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
}

// Date & Time

const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm";

export function dateToMoment(str) {
  return moment(str, "YYYY-MM-DD");
}

export function timeToMoment(str) {
  return moment(str, "YYYY-MM-DDTHH:mm:ss");
}

export function formatDate(date) {
  if (!date) 
    return "";

  if (typeof date === "object") 
    return date.format(DATE_FORMAT);

  return dateToMoment(date).format(DATE_FORMAT);
}

export function formatTime(time) {
  if (!time) 
    return "";

  if (typeof time === "object") 
    return time.format(TIME_FORMAT);

  var moment = timeToMoment(time);
  
  return moment.format(DATE_FORMAT) + "\u00A0" + moment.format(TIME_FORMAT);
}

export function formatPeriod(start, end) {
  return dateToMoment(start).format("DD-MM") + " to " + dateToMoment(end).format("DD-MM");
}

export function durationInDays(startDate, endDate){ 
  let endMoment = moment.utc(endDate, "YYYY-MM-DD");
  let startMoment = moment.utc(startDate, "YYYY-MM-DD");
  return moment.duration(endMoment.diff(startMoment)).asDays() + 1;
}
