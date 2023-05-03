import { createSlice } from "@reduxjs/toolkit";

import { IProjectState } from "@/types/project.type";
import { fetchProjectByUser } from "../actions/project.action";
const initialState: IProjectState = {
  projects: [],
};
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    newProject: (state, action) => {
      state.projects?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectByUser.pending, (state, action) => {
        state.projects = [];
      })
      .addCase(fetchProjectByUser.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.projects = [];
        } else {
          state.projects = action.payload.projects?.reverse();
        }
      });
  },
});
export const { newProject } = projectSlice.actions;
export default projectSlice.reducer;
