import { IProject } from "@/types/project.type";
import {
  ADD_NEW_PROJECT,
  FETCH_PROJECT_BY_USER,
} from "../constants/project.constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../reducers/setting.slice";
import { addProject, getProjectByUser } from "@/api/project";
import { newProject } from "../reducers/project.slice";

export const addNewProject = createAsyncThunk(
  ADD_NEW_PROJECT,
  async (project: IProject, { dispatch }) => {
    let reponse: {
      error?: boolean | unknown;
    } = {};
    try {
      dispatch(setLoading(true));
      const res = await addProject(project);
      dispatch(newProject(res));
      reponse = {
        error: false,
      };
    } catch (err) {
      console.log(err);
      reponse = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return reponse;
  }
);

export const fetchProjectByUser = createAsyncThunk(
  FETCH_PROJECT_BY_USER,
  async (userId: number, { dispatch }) => {
    let res: {
      projects?: IProject[];
      error?: boolean | unknown;
    };
    try {
      dispatch(setLoading(true));
      const projects = await getProjectByUser(userId);
      res = {
        projects: projects,
        error: false,
      };
    } catch (err) {
      console.log(err);
      res = {
        error: err,
      };
    }
    dispatch(setLoading(false));
    return res;
  }
);
