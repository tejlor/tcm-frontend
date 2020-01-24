import moment from "moment";
import * as React from "react";



export function null2Str(value) {
  return value ? value : "";
}

export function bool2Str(value) {
  return value !== null
    ? (value === true ? "TAK" : "NIE")
    : "?";
}


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
  
  return <span>{moment.format(DATE_FORMAT)}&nbsp;&nbsp;&nbsp;{moment.format(TIME_FORMAT)}</span>;
}

export function formatPeriod(start, end) {
  return dateToMoment(start).format("DD-MM") + " do " + dateToMoment(end).format("DD-MM");
}

export function durationInDays(startDate, endDate){ 
  let endMoment = moment.utc(endDate, "YYYY-MM-DD");
  let startMoment = moment.utc(startDate, "YYYY-MM-DD");
  return moment.duration(endMoment.diff(startMoment)).asDays() + 1;
}

export const TOKEN_INFO_KEY = 'tokenInfo';
export const ACCESS_TOKEN_KEY = 'accessToken';

export function calcEmployeeUrl(row, controlling) {
  return controlling ? row.employeeId : "Current";
}


export const ENTRY_REGEX = /^[0-9]{1,2}([.,][0-9])?$/;
export const ENTRY_PATTERN = "[0-9]{1,2}([.,][0-9])?";
export const ENTRY_CHARS = /^[0-9.,]*$/;

export const HOURS_REGEX = /^[1-8]$/;
export const HOURS_PATTERN = "[1-8]";
export const HOURS_CHARS = /^[1-8]*$/;

export const AMOUNT_REGEX = /^[0-9]+([.,][0-9]{1,2})?$/;
export const AMOUNT_CHARS = /^[0-9.,]*$/;
export const AMOUNT_PATTERN = "[0-9]+([.,][0-9]{1,2})?";