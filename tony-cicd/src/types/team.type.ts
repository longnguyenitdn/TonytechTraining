import { IUser } from "./user.type";

export type ITeam = {
  name?: string;
  id?: number;
};
export interface ITeamState {
  teams?: ITeam[];
  team?: ITeam;
}
