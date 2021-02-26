const paths = {
  main:             "/",
  login:            "/login",
  logout:           "/logout",
  myAccount:        "/my-account",
  
  adm:              "/adm",
  repo:             "/repo",

  users:            "/users",
  userGroups:       "/userGroups",
  settings:         "/settings",
  
  browse: (folderRef) =>      "/browse/:folderRef".bind(":folderRef", folderRef),
  details: (elementRef) =>    "/details/:elementRef".bind(":elementRef", elementRef),
};
export default paths;

// eslint-disable-next-line no-extend-native
String.prototype.bind = function(param, value) {
  if (value === undefined) {
    return this;
  }
  else {
    return this.replace(param, value);
  }
};
