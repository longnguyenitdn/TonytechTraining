export type IUser = {
  name: string;
  email: string;
  pass: string;
  id?: number;
};

export type IhandleLoginUserParams = {
  email: string;
  pass: string;
};
