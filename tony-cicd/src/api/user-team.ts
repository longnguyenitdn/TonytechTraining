import { IUserTeam } from "@/types/user-team.type";
import { myFetch } from "./myFetch";

const addUserTeam = (userTeam: IUserTeam) => {
  const link = "/users-teams";
  const option = "POST";
  return myFetch(link, option, userTeam);
};
const getUserTeam = (userId: number, teamId: number) => {
  return myFetch(`/users-teams?teamId=${teamId}&userId=${userId}`, "GET");
};
const getUserTeamByUserId = (userId: number) => {
  return myFetch(`/users-teams?userId=${userId}&_expand=team`, "GET");
};
const getUserTeamByTeamId = (teamId: number) => {
  return myFetch(`/users-teams?teamId=${teamId}&_expand=user`, "GET");
};
export { addUserTeam, getUserTeam, getUserTeamByUserId, getUserTeamByTeamId };
