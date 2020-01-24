export const CURRENT_USER_LOADED = "CURRENT_USER_LOADED";


export const currentUserLoaded = (user) => {
  return {
    type: CURRENT_USER_LOADED,
    user: user
  };
};

