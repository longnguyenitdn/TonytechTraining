export const ROUTER = {
  home: "/",
  login: "/login",
  newTeam: "/new-team",
  register: "/register",
  userAdd: "/my/add",
  userUpdatePost: "/my/posts/:postId/update",
  userVisited: "/visit/:visitedUserId",
};

// export const getRouter = (
//   path: string,
//   params: {
//     visitedUserId: number;
//     postId: number;
//   }
// ) => {
//   path = path.replace(/visitedUserId|postId/gi, function (matched) {
//     return params[matched];
//   });
//   const newPath = path.replace(/:/gi, "");
//   return newPath;
// };
