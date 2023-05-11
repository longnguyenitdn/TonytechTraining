import { createSlice } from "@reduxjs/toolkit";
import { IUserTeamState } from "@/types/user-team.type";
import { fetchUserTeamByTeamId } from "../actions/userTeam.action";
const initialState: IUserTeamState = {
  userTeams: [],
};
export const userTeamSlice = createSlice({
  name: "user-team",
  initialState,
  reducers: {
    setUserTeam: (state, action) => {
      state.userTeams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTeamByTeamId.pending, (state, action) => {
        state.userTeams = [];
      })
      .addCase(fetchUserTeamByTeamId.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.userTeams = [];
        } else {
          state.userTeams = action.payload.userTeams;
        }
      });
  },
});
export const { setUserTeam } = userTeamSlice.actions;
export default userTeamSlice.reducer;
