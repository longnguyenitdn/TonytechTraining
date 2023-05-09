export type ITeam = {
  name?: string;
  ownerId?: number;
  id?: number;
};
export interface ITeamState {
  teams?: ITeam[];
  team?: ITeam;
}
