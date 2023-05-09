export const ROUTER = {
  home: "/",
  login: "/login",
  newTeam: "/new-team",
  newProject: "/new-project",
  register: "/register",
  teamDetail: "/team/:teamId",
};
type Iparams = {
  teamId: string;
};
export const getRouter = (path: string, params: Iparams) => {
  const paramKeys = Object.keys(params);
  paramKeys.forEach((key) => {
    path = path.replaceAll(`:${key}`, params[key as keyof Iparams]);
  });
  return path;
};
