export const ROUTER = {
  home: "/",
  user: "/users/:userId",
  userLogin: "/login",
  userAdd: "/users/:userId/add",
};

export const getRouter = (path, params) => {
  path = path.replace(/userId/gi, function (matched) {
    return params[matched];
  });
  const newPath = path.replace(/:/gi, "");
  return newPath;
};
