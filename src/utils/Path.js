export default {
  main: "/",

  myAccount: "/my-account",
  repository: "/repository",

  login: "/login",
  logOut: "/logout",
  settings: "/settings",
  browse: (folderRef) => "/browse/:folderRef".bind(":folderRef", folderRef),
  details: (elementRef) => "/details/:elementRef".bind(":elementRef", elementRef),
};

// eslint-disable-next-line no-extend-native
String.prototype.bind = function(param, value) {
  if (value === undefined) {
    return this.toString();
  }
  else {
    return this.replace(param, value);
  }
};
