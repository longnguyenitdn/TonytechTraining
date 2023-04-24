import { createSlice } from "@reduxjs/toolkit";
import { ITeamState } from "@/types/team.type";
const initialState: ITeamState = {
  teams: [],
};
export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    newTeam: (state, action) => {
      state.teams.push(action.payload);
    },
  },
});
export const { newTeam } = teamSlice.actions;
export default teamSlice.reducer;
