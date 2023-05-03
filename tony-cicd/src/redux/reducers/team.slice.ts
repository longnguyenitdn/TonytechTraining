import { createSlice } from "@reduxjs/toolkit";
import { ITeamState } from "@/types/team.type";
import { fetchTeamByUser } from "../actions/team.action";
const initialState: ITeamState = {
  teams: [],
};
export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    newTeam: (state, action) => {
      state.teams?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamByUser.pending, (state, action) => {
        state.teams = [];
      })
      .addCase(fetchTeamByUser.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.teams = [];
        } else {
          state.teams = action.payload.teams?.reverse();
        }
      });
  },
});
export const { newTeam } = teamSlice.actions;
export default teamSlice.reducer;
