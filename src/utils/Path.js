const paths = {
  main: "/",

  myAccount: "/adm/my-account",
  repository: "/repo",

  login: "/login",
  logout: "/logout",
  settings: "/settings",
  browse: (folderRef) => "/browse/:folderRef".bind(":folderRef", folderRef),
  details: (elementRef) => "/details/:elementRef".bind(":elementRef", elementRef),
};
export default paths;

// eslint-disable-next-line no-extend-native
String.prototype.bind = function(param, value) {
  if (value === undefined) {
    return this.toString();
  }
  else {
    return this.replace(param, value);
  }
};
