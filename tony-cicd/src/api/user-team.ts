import { IUserTeam } from "@/types/user-team.type";
import { myFetch } from "./myFetch";

const addUserTeam = (userTeam: IUserTeam) => {
  const link = "/users-teams";
  const option = "POST";
  return myFetch(link, option, userTeam);
};
export { addUserTeam };
