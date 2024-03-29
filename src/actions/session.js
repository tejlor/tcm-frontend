import * as AccountApi from "api/adm/AccountApi";
import * as SettingApi from "api/adm/SettingApi";

export function loadCurrentUserAndSettings(onError) {
  return (dispatch) => {
    AccountApi.getCurrentUser((data) => { 
      dispatch(currentUserLoaded(data));
      SettingApi.getSafe((data) => {
        dispatch(settingsLoaded(data));
      });
    }, onError);
  }
}

export function clearSession() {
  return (dispatch) => {
    dispatch(currentUserLoaded(undefined));
    dispatch(settingsLoaded(undefined));
  }
}

export const CURRENT_USER_LOADED = "CURRENT_USER_LOADED";
export const SETTINGS_LOADED = "SETTINGS_LOADED";

const currentUserLoaded = (user) => ({
  type: CURRENT_USER_LOADED,
  user: user
});

const settingsLoaded = (settings) => ({
  type: SETTINGS_LOADED,
  settings: settings
});
