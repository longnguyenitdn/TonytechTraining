import { ITeamState } from "@/types/team.type";
interface RootState {
  team: ITeamState;
}
export const teamsSelector = (state: RootState) => state.team.teams;
