export const CURRENT_USER_LOADED = "CURRENT_USER_LOADED";
export const SETTINGS_LOADED = "SETTINGS_LOADED";


export const currentUserLoaded = (user) => {
  return {
    type: CURRENT_USER_LOADED,
    user: user
  };
};

export const settingsLoaded = (settings) => {
  return {
    type: SETTINGS_LOADED,
    settings: settings
  };
};

