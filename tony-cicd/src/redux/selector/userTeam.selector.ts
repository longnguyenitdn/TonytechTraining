import { IUserTeamState } from "@/types/user-team.type";
interface RootState {
  userTeam: IUserTeamState;
}
export const userTeamsSelector = (state: RootState) => state.userTeam.userTeams;
