import { ITeam } from "./team.type";
import { IUser } from "./user.type";

export type IUserTeam = {
  id?: number;
  userId?: number;
  teamId?: number;
  role: string;
  team?: ITeam;
  user?: IUser;
};
export interface IUserTeamState {
  userTeams?: IUserTeam[];
}
