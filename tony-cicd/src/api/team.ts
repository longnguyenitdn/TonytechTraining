import { ITeam } from "@/types/team.type";
import { myFetch } from "./myFetch";

const getTeam = () => {
  return myFetch("/teams", "GET");
};
const getTeamToUpdate = (id: number) => {
  return myFetch(`/teams/${id}`, "GET");
};

const getTeamByUser = (userId: number) => {
  return myFetch(`/teams?ownerId=${userId}`, "GET");
};

const addTeam = (team: ITeam) => {
  const link = "/teams";
  const option = "POST";
  return myFetch(link, option, team);
};
const editTeam = (team: ITeam, teamId: number) => {
  let link = `/teams/${teamId}`;
  let method = "PUT";
  return myFetch(link, method, team);
};
const deleteTeam = (id: number) => {
  const link = `/teams/${id}`;
  const option = "DELETE";
  return myFetch(link, option);
};
export {
  addTeam,
  editTeam,
  deleteTeam,
  getTeam,
  getTeamToUpdate,
  getTeamByUser,
};
