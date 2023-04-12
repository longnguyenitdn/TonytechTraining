export const ROUTER = {
  home: "/",
  userLogin: "/auth/login",
  userHome: "/my",
  userRegister: "/auth/register",
  userAdd: "/my/add",
  userUpdatePost: "/my/posts/:postId/update",
  userVisited: "/visit/:visitedUserId",
};

export const getRouter = (path, params) => {
  path = path.replace(/visitedUserId|postId/gi, function (matched) {
    return params[matched];
  });
  const newPath = path.replace(/:/gi, "");
  return newPath;
};
