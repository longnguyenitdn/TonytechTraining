import { createSlice } from "@reduxjs/toolkit";
import { ITeam, ITeamState } from "@/types/team.type";
import { fetchTeamByUser } from "../actions/team.action";
import { logOutUser } from "../actions/user.action";
import { fetchUserTeamByUserId } from "../actions/userTeam.action";

const initialState: ITeamState = {
  teams: [],
  team: {},
};
export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    newTeam: (state, action) => {
      state.teams?.push(action.payload);
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
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
          state.teams = action.payload.teams;
        }
      })
      .addCase(fetchUserTeamByUserId.pending, (state, action) => {
        state.teams = [];
      })
      .addCase(fetchUserTeamByUserId.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.teams = [];
        } else {
          action.payload.userTeams?.forEach((item) =>
            state.teams?.push(item.team as ITeam)
          );
        }
      })

      .addCase(logOutUser.fulfilled, (state, action) => {
        state.teams = [];
        state.team = {};
      });
  },
});
export const { newTeam, setTeam, setTeams } = teamSlice.actions;
export default teamSlice.reducer;
